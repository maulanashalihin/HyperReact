import 'reflect-metadata';
import { EntitySchema } from 'typeorm';

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName?: string;
  isActive: boolean;
  role: 'user' | 'admin';
  emailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpires: Date | null;
  resetToken: string | null;
  resetTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const User = new EntitySchema<UserInterface>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    fullName: {
      type: 'varchar',
      nullable: true,
    },
    isActive: {
      type: 'boolean',
      default: true,
    },
    role: {
      type: 'varchar',
      default: 'user',
    },
    emailVerified: {
      type: 'boolean',
      default: false,
    },
    emailVerificationToken: {
      type: 'varchar',
      nullable: true,
    },
    emailVerificationExpires: {
      type: 'datetime',
      nullable: true,
    },
    resetToken: {
      type: 'varchar',
      nullable: true,
    },
    resetTokenExpires: {
      type: 'datetime',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      createDate: true,
    },
    updatedAt: {
      type: 'datetime',
      updateDate: true,
    },
  },
});
