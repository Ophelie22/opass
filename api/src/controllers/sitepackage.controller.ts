import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Récupérer toutes les associations Site-Package

export const getAllSitePackages = async (req: Request, res: Response) => {
    try {
        const sitePackages = await prisma.sitePackage.findMany({
            include: { site: true, package: true }, // Inclure les sites et packages associés
        });
        res.status(200).json({ data: sitePackages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des associations Site-Package" });
    }
};

// Récupérer une association Site-Package par IDs

export const getSitePackageById = async (req: Request, res: Response) => {
    try {
        const { siteId, packageId } = req.params;
        const sitePackage = await prisma.sitePackage.findUnique({
            where: {
                siteId_packageId: {
                    siteId: parseInt(siteId, 10),
                    packageId: parseInt(packageId, 10),
                },
            },
            include: { site: true, package: true },
        });
        if (!sitePackage) {
            return res.status(404).json({ message: "Association Site-Package non trouvée" });
        }
        res.status(200).json({ data: sitePackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'association Site-Package" });
    }
};


// Créer une nouvelle association Site-Package

export const createSitePackage = async (req: Request, res: Response) => {
    try {
        const { siteId, packageId } = req.body;
        const newSitePackage = await prisma.sitePackage.create({
            data: {
                siteId,
                packageId,
            },
        });
        res.status(201).json({ data: newSitePackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'association Site-Package" });
    }
};

// Mettre à jour une association Site-Package par ID

export const updateSitePackage = async (req: Request, res: Response) => {
    try {
        const { siteId, packageId } = req.params;
        const { newSiteId, newPackageId } = req.body;

        // Mise à jour de l'association Site-Package
        const updatedSitePackage = await prisma.sitePackage.update({
            where: {
                siteId_packageId: {
                    siteId: parseInt(siteId, 10),
                    packageId: parseInt(packageId, 10),
                },
            },
            data: {
                siteId: newSiteId || undefined,
                packageId: newPackageId || undefined, 
            },
        });

        res.status(200).json({ data: updatedSitePackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'association Site-Package" });
    }
};

// Supprimer une association Site-Package par IDs

export const deleteSitePackageById = async (req: Request, res: Response) => {
    try {
        const { siteId, packageId } = req.params;
        // Supprimer un enregistrement dans la table SitePackage de la BDD
        await prisma.sitePackage.delete({
            where: {
                // Association de 2 clés primaires composite (@@id([siteId, packageId])) donc définit par siteId & packageId au lieu de simplement Id
                siteId_packageId: {
                    siteId: parseInt(siteId, 10),
                    packageId: parseInt(packageId, 10),
                },
            },
        });
        res.status(200).json({ message: "Association Site-Package supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'association Site-Package" });
    }
};