const express = require('express');
const prisma = require('@prisma/client');

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

// Creation des Commandes
app.post('/orders', async (req, res) => {
    try {
        const { userId, amount, status } = req.body;

        const newOrder = await prismaClient.order.create({
            data: {
                userId,
                amount,
                status,
            },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Order creation failed', details: error.message });
    }
});

//Lire ttes les commandes
app.get('/orders', async (req, res) => {
    try {
        const orders = await prismaClient.order.findMany({
            include: { user: true, Passes: true },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
    }
});

//Lire une seule commande
app.get('/orders/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await prismaClient.order.findUnique({
            where: { id: parseInt(id) },
            include: { user: true, Passes: true },
        });

        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to retrieve order', details: error.message });
    }
});

// Mise à jour des Commandes
app.put('/orders/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId, amount, status } = req.body;

        const updatedOrder = await prismaClient.order.update({
            where: { id: parseInt(id) },
            data: {
                userId,
                amount,
                status,
            },
        });

        res.status(200).json(updatedOrder);
    } catch (error: any) {
        res.status(500).json({ error: 'Order update failed', details: error.message });
    }
});
// Supprimer une commande
app.delete('/orders/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prismaClient.order.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: 'Order deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
