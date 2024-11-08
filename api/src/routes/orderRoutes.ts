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