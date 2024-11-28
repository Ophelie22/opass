import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();


// Récuperer tous les sites

export const getAllSites = async (req: Request, res: Response) => {
    try {
        const sites = await prisma.site.findMany({
          include: { region: true, category: true, events: true, siteUsers: true, sitePackage: true },
        });
        res.status(200).json({ data: sites})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des sites"});
    }
};

// Récuperer les sites en fonction de l'id de région et l'id de categorie
export const getAllSitesByRegionIdAndCategoryId = async (req: Request, res: Response) => {
  try {
    const regionId = parseInt(req.params.regionId, 10);
    const categoryId = parseInt(req.params.categoryId, 10);
    const sitesByRegionIdAndCategoryId = await prisma.site.findMany({
      where: { regionId: regionId, categoryId:categoryId },
    });
    res.status(200).json({ data: sitesByRegionIdAndCategoryId });
  } catch(error) {
    res.status(500).json({ message: "Erreur lors de la récupération des sites"})
  }
}

// Récuperer un site par ID

export const getSiteById = async (req: Request, res: Response) => {
    try {
        const siteId = parseInt(req.params.id, 10);
        const site = await prisma.site.findUnique({
            where: { id : siteId },
            include: { region: true, category: true, events: true, siteUsers: true, sitePackage: true },
        })
        if (!site) {
            res.status(404).json({ message: "Site non trouvé"});
        }
        res.status(200).json({ data: site});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du site" });
    }
};

// Creation d'un site

export const createSite = async (req: Request, res: Response) => {
    try {
        const { regionId, categoryId, name, description, city, postalCode, address, latitude, longitude, media, contact, information } = req.body;

        const newSite = await prisma.site.create({
            data: {
                regionId,
                categoryId,
                name,
                description,
                city,
                postalCode,
                address,
                latitude,
                longitude,
                media,
                contact,
                information,
            },
        });
        res.status(201).json({ data: newSite});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création du site" });
    }
};

// Mettre à jour un site par ID

export const updateSiteById = async (req: Request, res: Response) => {
    try {
        const siteId = parseInt(req.params.id, 10);
        const { regionId, categoryId, name, description, city, postalCode, address, latitude, longitude, media, contact, information } = req.body;

        const updatedSite = await prisma.site.update({
            where: { id: siteId },
            data: {
                regionId,
                categoryId,
                name,
                description,
                city,
                postalCode,
                address,
                latitude,
                longitude,
                media,
                contact,
                information,
            },
        });
        res.status(200).json({ data: updatedSite });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du site" });
    }
};


// Supprimer un site par ID

export const deleteSiteById = async (req: Request, res: Response) => {
    try {
        const siteId = parseInt(req.params.id, 10);
        await prisma.site.delete({
            where: { id: siteId },
        });
        res.status(200).json({ message: "Site supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du site" });
    }
};