import { describe, it, expect, beforeEach } from 'vitest';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { authService } from '../services/auth.service';
import { usersService } from '../services/users.service';

describe('Users Service', () => {
  let userId: string;

  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  it('should get all users', async () => {
    const result = await authService.register({
      username: 'testuser1',
      email: 'test1@example.com',
      password: 'password123',
      fullName: 'Test User',
    });
    
    userId = result.user.id;
    
    const users = await usersService.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('testuser1');
  });

  it('should update user', async () => {
    const result = await authService.register({
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'password123',
      fullName: 'Test User',
    });
    
    userId = result.user.id;
    
    const updated = await usersService.update(userId, {
      fullName: 'Updated Name',
    });

    expect(updated.fullName).toBe('Updated Name');
  });

  it('should delete user', async () => {
    const result = await authService.register({
      username: 'testuser3',
      email: 'test3@example.com',
      password: 'password123',
      fullName: 'Test User',
    });
    
    userId = result.user.id;
    
    await usersService.delete(userId);

    const deletedUser = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    expect(deletedUser).toBeNull();
  });
});
