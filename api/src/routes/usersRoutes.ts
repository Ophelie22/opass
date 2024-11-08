infer { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const bcrypt = require('bcrypt')

const userClient = new PrismaClient().user;

// Creation utilisateur
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'User creation failed', details: error.message });
    }
});

// LIRE LES INFOS de tt nos Users
app.get('/users', async (req, res) => {
    try {
        const users = await prismaClient.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
    }
});
// Lire les infos d'un seul utilsateurs
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prismaClient.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user', details: error.message });
    }
});
// Mise à jour User
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedUser = await prismaClient.user.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'User update failed', details: error.message });
    }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prismaClient.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'User deletion failed', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


