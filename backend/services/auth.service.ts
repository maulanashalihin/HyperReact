import 'dotenv/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User, type UserInterface } from '../entities/user.entity';
import { env } from '../config/env';
import { emailService } from './email.service';
import { randomBytes, randomUUID } from 'crypto';

const SALT_ROUNDS = 10;

// Rate limiting map: email -> { count: number, resetTime: number }
const verificationRateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

interface VerifyEmailResult {
  success: boolean;
  message: string;
}

interface ResendVerificationResult {
  success: boolean;
  message: string;
  rateLimitRemaining?: number;
}

export class AuthService {
  private userRepository: Repository<UserInterface>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async login(loginDto: LoginRequest): Promise<{ user: UserInterface; token: string }> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user);

    return { user, token };
  }

  async register(registerDto: RegisterRequest): Promise<{ user: UserInterface; token: string }> {
    const { username, email, password, fullName } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      fullName,
    });

    await this.userRepository.save(user);

    const token = this.generateToken(user);
    const verificationToken = randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save verification token to database
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await this.userRepository.save(user);

    // Send verification email (non-blocking, don't await to avoid slowing down response)
    emailService.sendVerification(email, verificationToken).catch((err) => {
      console.error('Failed to send verification email:', err);
    });

    // Send welcome email
    emailService.sendWelcome(email).catch((err) => {
      console.error('Failed to send welcome email:', err);
    });

    return { user, token };
  }

  async validateToken(token: string): Promise<UserInterface | null> {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
      return await this.userRepository.findOne({ where: { id: payload.userId } });
    } catch (error) {
      return null;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    // Don't reveal if email exists - always return successfully
    if (!user) {
      return;
    }

    const resetToken = randomUUID();
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;

    await this.userRepository.save(user);

    await emailService.sendPasswordReset(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new Error('Reset token has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await this.userRepository.save(user);
  }

  async verifyEmail(token: string): Promise<VerifyEmailResult> {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return { success: false, message: 'Invalid verification token' };
    }

    if (!user.emailVerificationExpires || user.emailVerificationExpires < new Date()) {
      // Clear expired token
      user.emailVerificationToken = null;
      user.emailVerificationExpires = null;
      await this.userRepository.save(user);
      return { success: false, message: 'Verification token has expired' };
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await this.userRepository.save(user);

    return { success: true, message: 'Email verified successfully' };
  }

  async resendVerification(email: string): Promise<ResendVerificationResult> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists
      return { success: true, message: 'If an account exists with that email, a verification email has been sent.' };
    }

    if (user.emailVerified) {
      return { success: false, message: 'Email is already verified' };
    }

    // Rate limiting: max 3 emails per hour
    const now = Date.now();
    const rateLimitEntry = verificationRateLimitMap.get(email);

    if (rateLimitEntry) {
      // Check if we need to reset the counter (after 1 hour)
      if (now > rateLimitEntry.resetTime) {
        rateLimitEntry.count = 1;
        rateLimitEntry.resetTime = now + 60 * 60 * 1000; // 1 hour from now
      } else {
        if (rateLimitEntry.count >= 3) {
          const remainingTime = Math.ceil((rateLimitEntry.resetTime - now) / 60000);
          return {
            success: false,
            message: `Too many verification emails. Please try again in ${remainingTime} minute(s).`,
          };
        }
        rateLimitEntry.count++;
      }
    } else {
      verificationRateLimitMap.set(email, {
        count: 1,
        resetTime: now + 60 * 60 * 1000, // 1 hour from now
      });
    }

    // Generate new verification token
    const verificationToken = randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;

    await this.userRepository.save(user);

    // Send verification email (non-blocking)
    emailService.sendVerification(email, verificationToken).catch((err) => {
      console.error('Failed to send verification email:', err);
    });

    return { success: true, message: 'Verification email sent successfully' };
  }

  private generateToken(user: UserInterface): string {
    return jwt.sign(
      { userId: user.id, username: user.username, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }
}

export const authService = new AuthService();
