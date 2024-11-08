import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const userClient = new PrismaClient().user;

// expressjs.com/fr/starter/basic-routing.html = await userClient.findMany();

// Informations de tout les utilisateurs

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const allUsers = await userClient.findMany();

      // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
      res.status(200).json({ data: allUsers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs'});
    }
  }

// Infos un seul utilisateur

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await userClient.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé'});
        }
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ data: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur'});
    }
}

// Mettre à jour un utilisateur par ID

export const updatedUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const { email, password, name } = req.body;

        // Hachage du mdp si modifié
        const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;

        const user = await prisma.user.update({
            where: { id: userId},
            data: {
                email,
                name,
                password: hashedPassword || undefined,
            },
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ data: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur'});
    }
}

// Supprimer un utilisateur par ID

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        
        await prisma.user.delete({
            where: { id: userId},
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ message: 'Utilisateur supprimé avec succès'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur'});
    }
}