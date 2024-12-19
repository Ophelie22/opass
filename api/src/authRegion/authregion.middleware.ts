import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthRegionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
<<<<<<< HEAD
  // Récupérer le token depuis l'en-tête Authorization ou les cookies
  const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;

  // Vérifier si le token existe
  if (!token) {
    res.status(401).json({ message: "Token manquant. Accès non autorisé." });
    return; // Important : arrêter ici pour éviter d'appeler `next()`
  }

  // Vérifier que JWT_SECRET est défini
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not defined');
    res.status(500).json({ message: 'Erreur interne du serveur.' });
    return;
  }

  try {
    // Décoder et vérifier le token avec la clé secrète
    const decoded = jwt.verify(token, secret);

    // Vérifier que le token contient bien un `regionId`
    if (!decoded || (decoded as any).role !== "region") {
      res.status(403).json({ message: "Accès interdit. Vous n'êtes pas une région valide." });
      return;
    }

    // Ajouter les informations du token au `req` pour utilisation dans les routes
    req.params.region = decoded.toString();

    // Passer au middleware ou à la route suivante
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: "Token invalide ou expiré." });
    return; 
  }
=======
    // Récupérer le token depuis l'en-tête Authorization ou les cookies
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;

    // Vérifier si le token existe
    if (!token) {
        res.status(401).json({ message: "Token manquant. Accès non autorisé." });
        return; // Important : arrêter ici pour éviter d'appeler `next()`
    }

    // Vérifier que JWT_SECRET est défini
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not defined');
        res.status(500).json({ message: 'Erreur interne du serveur.' });
        return;
    }

    try {
        // Décoder et vérifier le token avec la clé secrète
        const decoded = jwt.verify(token, secret);

        // Vérifier que le token contient bien un `regionId`
        if (!decoded || (decoded as any).role !== "region") {
            res.status(403).json({ message: "Accès interdit. Vous n'êtes pas une région valide." });
            return;
        }

        // Ajouter les informations du token au `req` pour utilisation dans les routes
        req.params.region = decoded.toString();

        // Passer au middleware ou à la route suivante
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(401).json({ message: "Token invalide ou expiré." });
        return;
    }
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
};

export default AuthRegionMiddleware;