import { Request, Response } from "express";
import AuthService from "./auth.service";

class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await AuthService.login(req.body.email, req.body.password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ message: "Connexion réussie" });
    } catch (error) {
      res.status(401).json({ message: "Identifiants invalides" });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await AuthService.register(
        req.body.name,
        req.body.email,
        req.body.password
      );
      res.status(201).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Erreur lors de la création de l'utilisateur" }); 
    }
  }
}

export default AuthController;
