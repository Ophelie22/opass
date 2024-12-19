import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Récupérer tous les packages

export const getAllPackages = async (req: Request, res: Response) => {
    try {
        const packages = await prisma.package.findMany({
            // Inclure la région et les passes associés
            include: { region: true, passes: true },
        });
        res.status(200).json({ data: packages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des packages" });
    }
};

// Récupérer un package par ID

export const getPackageById = async (req: Request, res: Response) => {
    try {
        const packageId = parseInt(req.params.id, 10);
        const packageItem = await prisma.package.findUnique({
            where: { id: packageId },
            // Inclure la région et les passes associés
            include: { region: true, passes: true },
        });
        if (!packageItem) {
            res.status(404).json({ message: "Package non trouvé" });
        }
        res.status(200).json({ data: packageItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du package" });
    }
};

// Créer un nouveau package

export const createPackage = async (req: Request, res: Response) => {
    try {
        const { regionId, price, description, media, name, } = req.body; // Inclure mediaId

        const newPackage = await prisma.package.create({
            data: {
                regionId,
                price,
                description,
                media,
                name,
            },
        });
        res.status(201).json({ data: newPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du package" });
    }
};


// Mettre à jour un package par ID

export const updatePackageById = async (req: Request, res: Response) => {
    try {
        const packageId = parseInt(req.params.id, 10);
        const { regionId, price, description, name } = req.body;

        const updatedPackage = await prisma.package.update({
            where: { id: packageId },
            data: {
                regionId,
                price,
                description,
                name,
            },
        });
        res.status(200).json({ data: updatedPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du package" });
    }
};

// Supprimer un package par ID

export const deletePackageById = async (req: Request, res: Response) => {
    try {
        const packageId = parseInt(req.params.id, 10);
        await prisma.package.delete({
            where: { id: packageId },
        });
        res.status(200).json({ message: "Package supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du package" });
    }
};