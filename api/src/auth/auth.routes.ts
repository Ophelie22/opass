import { Router, Request, Response, NextFunction } from 'express';
import AuthController from './auth.controller';
import authenticate from './auth.middleware';

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const router = Router();

// Routes publiques
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Routes protégées
//router.get('/profile', authenticate, async (req: Request, res: Response, next: NextFunction) => {
// try {
//   if (!req.userId) {
//     res.status(401).json({ message: 'Non autorisé' });
//     return;
//   }
//   const user = await AuthController.getProfile(req.userId);
//   res.json(user);
// } catch (error) {
//   next(error);
// }
// });

// router.put('/update-profile', authenticate, AuthController.updateProfile);

export default router;