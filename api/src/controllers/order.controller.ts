import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
    }
};

export const updateOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        const { amount, status } = req.body;
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { amount, status },
        });
        res.status(200).json({ data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
    }
};

export const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        await prisma.order.delete({
            where: { id: orderId },
        });
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
    }
};