import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Récupérer tous les pass

export const getAllPasses = async (req: Request, res: Response) => {
    try {
        const passes = await prisma.pass.findMany();
        res.status(200).json({ data: passes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des passes" });
    }
};

// Récupérer un pass par ID

export const getPassById = async (req: Request, res: Response) => {
    try {
        const passId = parseInt(req.params.id, 10);
        const pass = await prisma.pass.findUnique({
            where: { id: passId },
            // Inclut les détails de l'order et du package si nécessaire
            include: { order: true, package: true },
        });
        if (!pass) {
            res.status(404).json({ message: "Pass non trouvé" });
        }
        res.status(200).json({ data: pass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du pass" });
    }
};


// Créer un nouveau pass
export const createPass = async (req: Request, res: Response) => {
    try {
        const { packageId, codePass, orderId } = req.body;

        const pass = await prisma.pass.create({
            data: {
                codePass,
                orderId,
                packageId,
            },
        });
        res.status(201).json({ data: pass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création du pass" });
    }
};

// Afficher les pass actifs
export const getActivePasses = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const passes = await prisma.pass.findMany({
            where: {
                isActive: true,
                userId,
            },
        });
        if (!passes) {
            res.status(404).json({ message: "Aucun pass actif trouvé" })
        }
        res.status(200).json({ data: passes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des pass actifs" });
    }
};

// Mettre à jour un pass par ID
export const updatePassById = async (req: Request, res: Response) => {
    try {
        const passId = parseInt(req.params.id, 10);
        const { packageId, codePass, orderId } = req.body;

        const pass = await prisma.pass.update({
            where: { id: passId },
            data: {
                codePass,
                orderId,
                packageId,
            },
        });
        res.status(200).json({ data: pass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du pass" });
    }
};


// Supprimer un pass par ID
export const deletePassById = async (req: Request, res: Response) => {
    try {
        const passId = parseInt(req.params.id, 10);
        await prisma.pass.delete({
            where: { id: passId },
        });
        res.status(200).json({ message: "Pass supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du pass" });
    }
};