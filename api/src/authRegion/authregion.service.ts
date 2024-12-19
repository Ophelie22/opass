import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, Region } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET  || "default_secret";

class RegionService {
  static async validateRegion(email: string, password: string): Promise<Omit<Region, 'password'> | null> {
    const region = await prisma.region.findUnique({ where: { email } });
    if (region && bcrypt.compareSync(password, region.password || '')) {
      const { password, ...result } = region;
      return result;
    }
    return null;
  }

  static async login(email: string, password: string): Promise<string> {
    const region = await RegionService.validateRegion(email, password);
    if (!region) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { email: region.email, regionId: region.id, role: "region" },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

  // Rendre les champs Media et Description pour le controlleur
  static async register(name: string, email: string, password: string, description: string | null, media: string | null) {
    try {
      const existingRegion = await prisma.region.findUnique({ where: { email } });
      if (existingRegion) {
        throw new Error('Region already exists');
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      return await prisma.region.create({
        data: { name, email, password: hashedPassword, description: description ?? null, media: media ?? null },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
      }
      throw new Error('Registration failed: Unknown error occurred');
    }
  }
}

export default RegionService;