import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


const prisma = new PrismaClient();

export interface CreateUser {
  email: string;
  password: string;
  name: string;
}

export class UserQueries {
    static async create(user: CreateUser): Promise<User> {
      const hashedPassword = await UserQueries.hashPassword(user.password);
    
      return prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
        },
      });
    }
// Methode pour la hashage du mot de passe
static async findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

static async hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

static async comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
  return bcrypt.compare(providedPassword, storedPassword);
}
}

export default UserQueries;
