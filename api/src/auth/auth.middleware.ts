import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Vérification du token avec un Middleware

const authenticate = ( req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorisation')?.replace('Bearer','');
    if (!token) {
        return res.status(401).json({ message: 'Token invalide' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: number};
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};

export default authenticate;