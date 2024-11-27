import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Token manquant." });
    return; // Assurez-vous de terminer la fonction ici
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.userId = decoded.userId;
    next(); // Continuez vers le prochain middleware ou route
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

export default authenticate;