import 'dotenv/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User, type UserInterface } from '../entities/user.entity';
import { env } from '../config/env';

const SALT_ROUNDS = 10;

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

  private generateToken(user: UserInterface): string {
    return jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN as string } as any
    );
  }
}

export const authService = new AuthService();
