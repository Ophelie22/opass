import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();


// Creation d'un site
export const createSite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { regionId, categoryId, name, description, city, postalCode, address, latitude, longitude, media, contact, information } = req.body;

        const newSite = await prismaClient.site.create({
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
        res.status(201).json(newSite);
    } catch (error: any) {
        res.status(500).json({ error: 'Site creation failed', details: error.message });
    }
};
