import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../entities/user.entity';
import { join } from 'path';

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
const databasePath = isTest
  ? join(process.cwd(), 'backend', 'test.sqlite')
  : join(process.cwd(), 'data', 'database.sqlite');

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: databasePath,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['backend/migrations/*.js'],
});

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}
