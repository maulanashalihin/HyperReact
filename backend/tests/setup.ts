import { rmSync, existsSync, copyFileSync } from 'fs';
import { join } from 'path';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { beforeAll, afterAll, beforeEach } from 'vitest';

const TEST_DB_PATH = join(process.cwd(), 'backend', 'test.sqlite');
const DEV_DB_PATH = join(process.cwd(), 'backend', 'database.sqlite');

beforeAll(async () => {
  if (existsSync(DEV_DB_PATH)) {
    copyFileSync(DEV_DB_PATH, TEST_DB_PATH);
  }
  
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    await AppDataSource.synchronize();
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
