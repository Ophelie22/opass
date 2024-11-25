import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Récupérer toutes les Régions

export const getAllRegions = async (req: Request, res: Response) => {
    try {
        const regions = await prisma.region.findMany({
            // Inclure les sites et packages associés
            include: { sites: true, packages: true },
        });
        res.status(200).json({ data: regions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des régions" });
    }
};

// Récupérer toutes les régions pour les visiteurs

export const getAllRegionsForVisitors = async (req: Request, res: Response) => {
    try {
        const regions = await prisma.region.findMany({
            select: {
                name: true,
                description: true,
                media: true,
            }
        })
        res.status(200).json({ data: regions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des régions" });
    }
};

// Récupérer les détails pour les régions (détails, catégories, packages)

export const getAllRegionDetails = async (req: Request, res: Response) => {
    try {
        const regionId = parseInt(req.params.id, 10);
        const regionWithRelations = await prisma.region.findUnique({
            where: {
              id: regionId,
            },
            select: {
                name: true,
                description: true,
                media: true,
                packages: true,
            },
          });
          res.status(200).json({ data: regionWithRelations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des régions" });
    }
}

// Récupérer une Région par ID

export const getRegionById = async (req: Request, res: Response) => {
    try {
        const regionId = parseInt(req.params.id, 10);
        const region = await prisma.region.findUnique({
            where: { id: regionId },
            // Inclure les sites et packages associés
            include: { sites: true, packages: true },
        });
        if (!region) {
            res.status(404).json({ message: "Région non trouvée" });
        }
        res.status(200).json({ data: region });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la région" });
    }
};


// Créer une nouvelle Région

export const createRegion = async (req: Request, res: Response) => {
    try {
        const { email, password, media, description, name } = req.body;

        const newRegion = await prisma.region.create({
            data: {
                email,
                password,
                media,
                description,
                name
            },
        });
        res.status(201).json({ data: newRegion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la Région" });
    }
};

// Mettre à jour une Région par ID

export const updateRegionById = async (req: Request, res: Response) => {
    try {
        const regionId = parseInt(req.params.id, 10);
        const { email, password, media, description, name } = req.body;

        const updatedRegion = await prisma.region.update({
            where: { id: regionId },
            data: { 
                email, 
                password, 
                media, 
                description, 
                name },
        });
        res.status(200).json({ data: updatedRegion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la région" });
    }
};


// Supprimer une Région par ID

export const deleteRegionById = async (req: Request, res: Response) => {
    try {
        const regionId = parseInt(req.params.id, 10);
        await prisma.region.delete({
            where: { id: regionId },
        });
        res.status(200).json({ message: "Région supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la région" });
    }
};