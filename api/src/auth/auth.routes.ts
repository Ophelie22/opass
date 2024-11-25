import { Router } from "express";
import AuthController from "./auth.controller";
import authenticate from "./auth.middleware";

const router = Router();

// Routes publiques
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Exemple de route protégée
router.get("/profile", authenticate, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Non autorisé." });
    return;
  }
  res.json({ message: "Voici votre profil", userId: req.userId });
});

export default router;