import { PrismaClient } from "@prisma/client";
import { Request, Response, RequestHandler } from "express";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// expressjs.com/fr/starter/basic-routing.html = await userClient.findMany();

// Informations de tout les utilisateurs

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                // Exclude password for security

            },
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ data: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
}

// Infos un seul utilisateur

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                // Exclude password for security
            }
        });
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur' });
    }
}

export const getCurrentUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // This is set by the authenticate middleware
        if (!userId) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createAt: true,
                updatedAt: true,
                // Exclude password for security
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil utilisateur' });
    }
};


// Mettre à jour un utilisateur par ID


export const updatedUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const { email, password, name } = req.body;

        // Hachage du mdp si modifié
        const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                email,
                name,
                password: hashedPassword || undefined,
            },
            select: {
                id: true,
                name: true,
                email: true,
                // Exclude password for security
            }
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
}

// Créer un utilisateur

export const createUser: RequestHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password before saving
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                // Exclude password for security
            }
        });


        res.status(201).json({ data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
};

// Supprimer un utilisateur par ID

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        await prisma.user.delete({
            where: { id: userId },
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
}