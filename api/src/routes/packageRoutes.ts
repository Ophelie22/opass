import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

// Creation de Package
app.post('/packages', async (req: Request, res: Response): Promise<void> => {
    try {
        const { region_id, price, description, name } = req.body;

        const newPackage = await prismaClient.package.create({
            data: {
                region_id,
                price,
                description,
                name,
            },
        });
        res.status(201).json(newPackage);
    } catch (error: any) {
        res.status(500).json({ error: 'Package creation failed', details: error.message });
    }
});

// Lire un seul package
app.get('/packages/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const packageItem = await prismaClient.package.findUnique({
            where: { id: parseInt(id) },
            include: { passes: true, sitePackages: true, region: true },
        });

        if (!packageItem) {
            res.status(404).json({ error: 'Package not found' });
            return;
        }
        res.status(200).json(packageItem);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve package', details: error.message });
    }
});
// Update du package
app.put('/packages/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { region_id, price, description, name } = req.body;

        const updatedPackage = await prismaClient.package.update({
            where: { id: parseInt(id) },
            data: {
                region_id,
                price,
                description,
                name,
            },
        });

        res.status(200).json(updatedPackage);
    } catch (error: any) {
        res.status(500).json({ error: 'Package update failed', details: error.message });
    }
});
// Supprimer un package
app.delete('/packages/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prismaClient.package.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: 'Package deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
