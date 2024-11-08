import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Récupérer toutes les catégories de sites

export const getAllSiteCategories = async (req: Request, res: Response) => {
    try {
        const siteCategories = await prisma.siteCategory.findMany({
            // Inclure les sites associés
            include: { sites: true }, 
        });
        res.status(200).json({ data: siteCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des catégories de sites" });
    }
};

// Récupérer une catégorie de site par ID

export const getSiteCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const siteCategory = await prisma.siteCategory.findUnique({
            where: { id: categoryId },
            include: { sites: true },
        });
        if (!siteCategory) {
            return res.status(404).json({ message: "Catégorie de site non trouvée" });
        }
        res.status(200).json({ data: siteCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la catégorie de site" });
    }
};


// Créer une nouvelle catégorie de site

export const createSiteCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newSiteCategory = await prisma.siteCategory.create({
            data: { name },
        });
        res.status(201).json({ data: newSiteCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la catégorie de site" });
    }
};


// Mettre à jour une catégorie de site par ID

export const updateSiteCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        const { name } = req.body;
        const updatedSiteCategory = await prisma.siteCategory.update({
            where: { id: categoryId },
            data: { name },
        });
        res.status(200).json({ data: updatedSiteCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie de site" });
    }
};

// Supprimer une catégorie de site par ID

export const deleteSiteCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.params.id, 10);
        await prisma.siteCategory.delete({
            where: { id: categoryId },
        });
        res.status(200).json({ message: "Catégorie de site supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la catégorie de site" });
    }
};