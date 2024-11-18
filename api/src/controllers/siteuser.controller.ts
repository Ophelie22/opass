import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Récupérer tous les utilisateurs du site

export const getAllSiteUsers = async (req: Request, res: Response) => {
    try {
        const siteUsers = await prisma.siteUser.findMany({
            // Inclure le site associé
            include: { site: true },
        });
        res.status(200).json({ data: siteUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs du site" });
    }
};

// Récupérer un utilisateur du site par ID

export const getSiteUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const siteUser = await prisma.siteUser.findUnique({
            where: { id: userId },
            include: { site: true },
        });
        if (!siteUser) {
            res.status(404).json({ message: "Utilisateur du site non trouvé" });
        }
        res.status(200).json({ data: siteUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur du site" });
    }
};

// Créer un nouvel utilisateur pour un site

export const createSiteUser = async (req: Request, res: Response) => {
    try {
        const { site_id, name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newSiteUser = await prisma.siteUser.create({
            data: {
                site_id,
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ data: newSiteUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur du site" });
    }
};

// Mettre à jour un utilisateur du site par ID

export const updateSiteUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const { name, email, password } = req.body;

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedSiteUser = await prisma.siteUser.update({
            where: { id: userId },
            data: {
                name,
                email,
                password: hashedPassword || undefined,
            },
        });
        res.status(200).json({ data: updatedSiteUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur du site" });
    }
};

// Supprimer un utilisateur du site par ID

export const deleteSiteUserById = async (req: Request, res: Response) => {
    try {
        const siteuserId = parseInt(req.params.id, 10);

        await prisma.siteUser.delete({
            where: { id: siteuserId},
        });
        // Gestions des erreurs 200 : OK | 500 : Erreur interne lors du traitement de la requête | 404 : Le serveur ne retrouve pas la ressource demandé
        res.status(200).json({ message: "SiteUser supprimé avec succès"});
    } catch (error) {
        console.error;
        res.status(500).json({ message: "Erreur lors de la suppresion du siteUser"})
    }
}
