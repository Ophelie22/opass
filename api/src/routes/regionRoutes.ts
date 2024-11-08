import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

// Creation de la Region
app.post('/regions', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, media, description, name } = req.body;

        const newRegion = await prismaClient.region.create({
            data: {
                email,
                password,
                media,
                description,
                name,
            },
        });
        res.status(201).json(newRegion);
    } catch (error: any) {
        res.status(500).json({ error: 'Region creation failed', details: error.message });
    }
});


// Lire toutes les regions
app.get('/regions', async (req: Request, res: Response): Promise<void> => {
    try {
        const regions = await prismaClient.region.findMany({
            include: { sites: true, packages: true },
        });
        res.status(200).json(regions);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve regions', details: error.message });
    }
});

// Lire une seule region
app.get('/regions/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const region = await prismaClient.region.findUnique({
            where: { id: parseInt(id) },
            include: { sites: true, packages: true },
        });

        if (!region) {
            res.status(404).json({ error: 'Region not found' });
            return;
        }
        res.status(200).json(region);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve region', details: error.message });
    }
});


// Update de la region
app.put('/regions/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { email, password, media, description, name } = req.body;

        const updatedRegion = await prismaClient.region.update({
            where: { id: parseInt(id) },
            data: {
                email,
                password,
                media,
                description,
                name,
            },
        });

        res.status(200).json(updatedRegion);
    } catch (error: any) {
        res.status(500).json({ error: 'Region update failed', details: error.message });
    }
});
// Supprimer une region
app.delete('/regions/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prismaClient.region.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: 'Region deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
