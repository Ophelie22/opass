import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

// Creations du  Pass
app.post('/pass', async (req: Request, res: Response): Promise<void> => {
    try {
        const { packageId, codePass, orderId } = req.body;

        const newPass = await prismaClient.pass.create({
            data: {
                packageId, // on recupere les infos utiles
                codePass,
                orderId,
            },
        });
        res.status(201).json(newPass);
    } catch (error: any) {
        res.status(500).json({ error: 'Pass creation failed', details: error.message });
    }
});
//Lire tt les passes
app.get('/pass', async (req: Request, res: Response): Promise<void> => {
    try {
        const pass = await prismaClient.pass.findMany({
            include: { package: true, order: true },
        });
        res.status(200).json(pass);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve pass', details: error.message });
    }
});
// Lire un seul pass
app.get('/pass/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const pass = await prismaClient.pass.findUnique({
            where: { id: parseInt(id) },
            include: { package: true, order: true },
        });

        if (!pass) {
            res.status(404).json({ error: 'Pass not found' });
            return;
        }
        res.status(200).json(pass);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve pass', details: error.message });
    }
});

// Update du pass
app.put('/pass/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { packageId, codePass, orderId } = req.body;

        const updatedPass = await prismaClient.pass.update({
            where: { id: parseInt(id) },
            data: {
                packageId, // On met à jour ces données
                codePass,
                orderId,
            },
        });

        res.status(200).json(updatedPass);
    } catch (error: any) {
        res.status(500).json({ error: 'Pass update failed', details: error.message });
    }
});

// Supprimmer un pass
app.delete('/passes/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prismaClient.pass.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: 'Pass deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});