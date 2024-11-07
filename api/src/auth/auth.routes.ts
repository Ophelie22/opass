import express, { Request, Response } from 'express';
import authentificate from './auth.middleware';

const router = express.Router();

// Router qui a besoin de JWT valide pour protégé la Route

router.get('/profile', authentificate, (req: Request, res: Response) => {
    res.json({ message: 'Cette route est protégé', userId: req.userId});
});

export default router;