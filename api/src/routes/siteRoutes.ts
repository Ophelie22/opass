import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

// Creation du site que l'on visitera
app.post('/sites', async (req: Request, res: Response): Promise<void> => {
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
});
//Lire les infos des sites
app.get('/sites', async (req: Request, res: Response): Promise<void> => {
    try {
        const pass = await prismaClient.pass.findMany({
            include: include: { region: true, category: true, events: true, siteUsers: true, sitePackage: true },
        });
        res.status(200).json(pass);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve pass', details: error.message });
    }
});

// Lire les info d'un seul site
app.get('/sites/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const site = await prismaClient.site.findUnique({
            where: { id: parseInt(id) },
            include: { region: true, category: true, events: true, siteUsers: true, sitePackage: true },
        });

        if (!site) {
            res.status(404).json({ error: 'Site not found' });
            return;
        }
        res.status(200).json(site);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve site', details: error.message });
    }
});

//mise à jour d'un seul site
app.put('/sites/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { regionId, categoryId, name, description, city, postalCode, address, latitude, longitude, media, contact, information } = req.body;

        const updatedSite = await prismaClient.site.update({
            where: { id: parseInt(id) },
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

        res.status(200).json(updatedSite);
    } catch (error: any) {
        res.status(500).json({ error: 'Site update failed', details: error.message });
    }
});

// Supprimmer un site 
app.delete('/sites/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prismaClient.site.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: 'Site deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
