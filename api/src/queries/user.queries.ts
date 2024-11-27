import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export interface CreateUser {
  email: string;
  password: string;
  name: string;
}

export class UserQueries {
  private static readonly SALT_ROUNDS = 10;

  constructor(private prisma: PrismaClient) {}

  async create(user: CreateUser): Promise<User> {
    const hashedPassword = await UserQueries.hashPassword(user.password);
    
    try {
      return await this.prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });
    } catch (error: Error | any) {
      if (error.code === 'P2002') {
        throw new Error('A user with this email already exists');
      }
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding user:', error);
      throw new Error('Failed to find user');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, UserQueries.SALT_ROUNDS);
  }

  static async comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(providedPassword, storedPassword);
  }
}

export default UserQueries;