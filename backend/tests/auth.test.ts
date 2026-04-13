import { describe, it, expect, beforeEach } from 'vitest';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { authService } from '../services/auth.service';

describe('Auth Service', () => {
  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  it('should register a new user', async () => {
    const result = await authService.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });

    expect(result.user).toHaveProperty('id');
    expect(result.user.username).toBe('testuser');
    expect(result.user.email).toBe('test@example.com');
    expect(result.token).toBeDefined();
  });

  it('should login with valid credentials', async () => {
    await authService.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });

    const result = await authService.login({
      username: 'testuser',
      password: 'password123',
    });

    expect(result.user.username).toBe('testuser');
    expect(result.token).toBeDefined();
  });

  it('should handle forgot-password request', async () => {
    await authService.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });

    await expect(authService.forgotPassword('test@example.com')).resolves.not.toThrow();

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email: 'test@example.com' },
    });
    expect(user?.resetToken).toBeDefined();
  });

  it('should reset password with valid token', async () => {
    await authService.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
    });

    await authService.forgotPassword('test@example.com');

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email: 'test@example.com' },
    });

    await authService.resetPassword(user!.resetToken!, 'newpassword123');

    const updatedUser = await AppDataSource.getRepository(User).findOne({
      where: { email: 'test@example.com' },
    });
    expect(updatedUser?.resetToken).toBeNull();
  });
});
