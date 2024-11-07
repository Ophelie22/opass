import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuthService {
  // Vérifications des informations d'authentification de l'utilisateur
  static async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Fonction de connexion
  static async login(email: string, password: string): Promise<string> {
    const user = await AuthService.validateUser(email, password);
    if (!user) throw new Error('Invalid credentials');

    // Fonction pour la génération du token
    const token = jwt.sign(
      { email: user.email, userId: user.id },
      'SERVICE_TOKEN', // Mettre le token ici
      { expiresIn: '1h' }
    );
    return token;
  }

  // Fonction d'inscription
  static async register(email: string, password: string) {
    // Vérification si l'utilisateur déjà existant
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Créer un utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    return newUser;
  }
}

export default AuthService;
