import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export interface Package {
  id: number;
  name: string;
  regionId: string;
  price: number;
  description: string;
}

export interface Pass {
  id: string;
  packageId: number;
  codePass: string;
  orderId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Package {
  quantity: number; 
}

const generateUniquePassCode = () => {
  const currentYear = new Date().getFullYear();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomCode = '';
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters[randomIndex];
  }
  
  return `PASS${currentYear}${randomCode}`;
}

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

export const createOrder = async (req: Request, res: Response) => {
  const { amount, items, userId } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId, 10),
        amount,
        status: "pending",
        Passes: {
          create: items.flatMap((item: CartItem) => 
            Array.from({ length: item.quantity }, () => ({
              packageId: item.id,
              codePass: generateUniquePassCode()
            }))
          )
        }
      },
      include: {
        Passes: true
      }
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
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