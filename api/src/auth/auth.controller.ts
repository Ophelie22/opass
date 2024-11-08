import express, { Request, Response } from 'express';
import AuthService from './auth.service';
import authentificate from './auth.middleware';

const router = express.Router();

// Route pour la connexion

router.post('/login', async (req: Request, res: Response) => {
    try {
      const token = await AuthService.login(req.body.email, req.body.password);
      res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: 'Connexion réussie'});
    } catch (error) {
      return res.status(401).json({ message: 'Identifiants invalide' });
    }
  });

// Route pour l'inscription

router.post('/register', async (req: Request, res: Response) => {
    try {
      const user = await AuthService.register(req.body.email, req.body.name, req.body.password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Erreur lors de la création de votre utilisateur' });
    }
  });


export default router;