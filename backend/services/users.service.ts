import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User, type UserInterface } from '../entities/user.entity';

export class UsersService {
  private userRepository: Repository<UserInterface>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<UserInterface[]> {
    const users = await this.userRepository.find({
      select: ['id', 'username', 'email', 'fullName', 'isActive', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
    });
    return users;
  }

  async findOne(id: string): Promise<UserInterface | null> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'fullName', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async update(id: string, data: Partial<UserInterface>): Promise<UserInterface> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, data);
    const updated = await this.userRepository.findOne({ where: { id } });
    return updated!;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }
}

export const usersService = new UsersService();
