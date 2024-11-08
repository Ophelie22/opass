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
       process.env.SECRET_KEY ||,
      { expiresIn: '1h' }
    );
    return token;
  }

  
  // Fonction d'inscription 
  
  // resolution du bug
  // Ajout de name dans les paramètres de la fonction
  // ainsi que dans l'objet data
  static async register(name: string, email: string, password: string) {
    try {
      // Vérification si l'utilisateur déjà existant
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error('Utilisateur déjà existant');

      const hashedPassword = bcrypt.hashSync(password, 10);

      // Création de compte dans la BDD
      return await prisma.user.create({ data: { name, email, password: hashedPassword } });
    } catch (error: Error) {
      throw new Error(`Échec de l'inscription : ${error.message}`);
    }
  }
}

export default AuthService;
