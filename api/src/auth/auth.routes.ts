import { Router } from "express";
import AuthController from "./auth.controller";
import authenticate from "./auth.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/check", AuthController.check);
router.get("/me", AuthController.getUserInfo); 
router.post("/logout", AuthController.logout);

// Exemple de route protégée
router.get("/profile", authenticate, async (req, res) => {
  if (!req.userId) {
    res.status(401).json({ message: "Non autorisé." });
    return;
  }
  res.json({ message: "Voici votre profil", userId: req.userId });
});

export default router;