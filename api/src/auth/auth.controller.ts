import express, { Request, Response } from 'express';
import AuthService from './auth.service';
import authentificate from './auth.middleware';

const router = express.Router();

// Route pour la connexion

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      return res.json({ access_token: token });
    } catch (error) {
      return res.status(401).json({ message: 'Connexion invalide' });
    }
  });

// Route pour l'inscription

router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await AuthService.register(email, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Erreur lors de la création de votre utilisateur' });
    }
  });


export default router;