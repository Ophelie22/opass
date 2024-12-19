import { Request, Response, RequestHandler } from "express";
import AuthService from "./auth.service";
import jwt from "jsonwebtoken";

// Pour l'authentification il faut aller sur /api/auth/register et /api/auth/login.

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

class AuthController {
	static async login(req: Request, res: Response): Promise<void> {
		try {
			const response = await AuthService.login(req.body.email, req.body.password);
			const token = response.token;
			const user = response.user;

			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			});
			res.status(200).json({ user, message: "Connexion réussie" });
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

	static async check(req: Request, res: Response): Promise<void> {
		const token = req.cookies.token;

		if (!token) {
			res.status(401).json({ authenticated: false });
			return;
		}

		try {
			const decoded = jwt.verify(token, SECRET_KEY);
			res.status(200).json({ authenticated: true, user: decoded });
			return;
		} catch (error) {
			res.status(401).json({ authenticated: false });
			return;
		}
	}

	static logout: RequestHandler = async (req, res) => {
		try {
			res.clearCookie("token");
			res.status(200).json({ message: "Déconnecté avec succès" });
		} catch (error) {
			res.status(500).json({ error: "Une erreur est survenue" });
		}
	}

	static getUserInfo: RequestHandler = async (req, res) => {
		const token = req.cookies.token;

		if (!token) {
			res.status(401).json({ message: "Non authentifié" });
			return;
		}

		try {
			// Décodage du token pour extraire userId
			const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };

			// Utilisation de userId pour récupérer l'utilisateur
			const user = await AuthService.getUserById(decoded.userId);

			if (!user) {
				res.status(404).json({ message: "Utilisateur non trouvé" });
				return;
			}

			// Réponse avec les données utilisateur
			res.status(200).json({ user });
		} catch (error) {
			// Gérer les erreurs (ex: token expiré ou invalide)
			res.status(401).json({ message: "Token invalide ou expiré" });
		}
	}
}

export default AuthController;
