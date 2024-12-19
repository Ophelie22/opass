import { Request, Response } from 'express';
import RegionService from './authregion.service';
import { PrismaClient, Package } from '@prisma/client';
const prisma = new PrismaClient();
import path from 'path';
import fs from 'fs';
class AuthRegionController {
<<<<<<< HEAD
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await RegionService.login(req.body.email, req.body.password);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
      res.status(401).json({ message: "Identifiants invalides" });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, media, description } = req.body;

    // Vérification des champs obligatoires si présent ou non
    if (!name || !email || !password) {
      res.status(400).json({ message: "Non, email et mot de passe requis." });
      return;
    }
    try {
      // Appel de Regionservice.register avec des champs media et descriptions qui sont optionnels
      const region = await RegionService.register(
        name,
        email,
        password,
        media ?? null,  // Si champ vide alors null
        description ?? null, // Si champ vide alors null
      );
      res.status(201).json(region);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création de la région" });
    }
  }
  ///ajout dashboard:
  static async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      // Récupérer l'ID de la région à partir des paramètres
      const regionId = parseInt(req.params.regionId, 10);

      if (!regionId) {
        res.status(400).json({ message: "Region ID manquant." });
        return;
      }

      // Récupérer le nombre de packages pour cette région
      const packagesCount = await prisma.package.count({
        where: { regionId },
      });

      // Récupérer le nombre de sites pour cette région
      const sitesCount = await prisma.site.count({
        where: { regionId },
      });

      // Répondre avec les statistiques
      res.status(200).json({
        message: "Données du dashboard récupérées avec succès.",
        data: {
          packagesCount,
          sitesCount,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données du dashboard :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des données du dashboard.",
        error,
      });
    }
  }


  // Ajouter un package
  static async addPackage(req: Request, res: Response): Promise<void> {
    try {
      const regionId = parseInt(req.params.regionId); // ID de la région
      const { price, description, name } = req.body;
      const media = req.file; // Récupération du fichier uploadé

      if (!regionId) {
        res.status(400).json({ message: "Region ID manquant." });
        return;
      }

      if (!name || !price) {
        res.status(400).json({ message: "Les champs 'name' et 'price' sont obligatoires." });
        return;
      }

      const newPackage = await prisma.package.create({
        data: {
          name,
          price,
          media: media ? media.filename : null,
          description,
          region: {
            connect: { id: regionId }, // Lien avec la région
          },
        },
      });

      res.status(201).json({ message: "Package créé avec succès.", package: newPackage });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du package.", error });
    }
  }

  // Lister les packages
  static async listPackages(req: Request, res: Response): Promise<void> {
    try {
      const regionId = parseInt(req.params.regionId);
      if (!regionId) {
        res.status(400).json({ message: "Region ID manquant." });
        return;
      }

      const packages = await prisma.package.findMany({
        where: {
          regionId,
        },
        include: {
          sitePackages: true, // Inclure des relations si nécessaire
        },
      });
      // Ajouter l'URL complète pour les médias
      const packagesWithMediaUrl = packages.map(pkg => ({
        ...pkg, // Inclure tous les champs d'origine
        media: pkg.media ? `${req.protocol}://${req.get('host')}/uploads/${pkg.media}` : null,
      }));

      res.status(200).json({ message: "Packages récupérés avec succès.", packages: packagesWithMediaUrl, });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des packages.", error });
    }
  }



  // Mettre à jour un package
  static async updatePackage(req: Request, res: Response): Promise<void> {
    try {
      const { packageId } = req.params; // ID du package
      const regionId = parseInt(req.params.region, 10);
      const { price, description, name } = req.body;
      const media = req.file;
      const packageItem = await prisma.package.findUnique({
        where: { id: parseInt(packageId, 10) },
      });

      if (!packageItem || packageItem.regionId !== regionId) {
        res.status(403).json({ message: "Accès interdit ou package non trouvé." });
        return;
      }

      // Supprimer l'ancien média si un nouveau est uploadé
      if (media && packageItem.media) {
        const oldMediaPath = path.resolve(__dirname, '../../uploads', packageItem.media);
        if (fs.existsSync(oldMediaPath)) {
          fs.unlinkSync(oldMediaPath); // Supprime l'ancien fichier
        }
      }
      const updatedPackage = await prisma.package.update({
        where: { id: parseInt(packageId, 10) },
        data: {
          name: name ?? packageItem.name,
          price: price ? parseFloat(price) : packageItem.price,
          media: media ? media.filename : packageItem.media, // Remplace l'ancien média
          description: description ?? packageItem.description,
        },
      });
      res.status(200).json({ message: "Package mis à jour avec succès.", package: updatedPackage });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du package.", error });
    }
  }

  // Supprimer un package
  static async deletePackage(req: Request, res: Response): Promise<void> {
    try {
      const { regionId, packageId } = req.params;

      // Vérifier si l'ID de région et l'ID du package sont fournis
      if (!regionId || !packageId) {
        res.status(400).json({ message: "Region ID ou Package ID manquant." });
        return;
      }

      // Récupérer le package depuis la base de données
      const packageToDelete = await prisma.package.findFirst({
        where: {
          id: parseInt(packageId),
          regionId: parseInt(regionId),
        },
      });
      if (!packageToDelete) {
        res.status(404).json({ message: "Package non trouvé." });
        return;
      }

      // Si le package contient un média, supprimer le fichier associé
      if (packageToDelete.media) {
        const fs = require("fs");
        const path = require("path");

        // Chemin du fichier média
        const filePath = path.join(__dirname, "../uploads", packageToDelete.media);

        // Vérifier si le fichier existe
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath); // Supprimer le fichier
            console.log(`Fichier supprimé : ${filePath}`);
          } catch (error) {
            console.error(`Erreur lors de la suppression du fichier : ${error}`);
          }
        } else {
          console.warn(`Fichier introuvable : ${filePath}`);
        }
      }

      // Supprimer le package de la base de données
      await prisma.package.delete({
        where: {
          id: parseInt(packageId),
        },
      });

      res.status(200).json({ message: "Package supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du package :", error);
      res.status(500).json({ message: "Erreur interne lors de la suppression du package.", error });
    }
  }

  // Ajouter un site
  static async addSite(req: Request, res: Response): Promise<void> {
    try {
      const regionId = parseInt(req.params.regionId, 10);
      const { name, description, city, postalCode, address, latitude, longitude, contact, information, categoryId } = req.body;
      const media = req.file; // Récupération du fichier uploadé

      if (!name || !city || !postalCode || !address) {
        res.status(400).json({ message: "Les champs 'name', 'city', 'postalCode' et 'address' sont obligatoires." });
        return;
      }

      const newSite = await prisma.site.create({
        data: {
          name,
          description,
          city,
          postalCode,
          address,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          media: media ? media.filename : null,
          contact,
          information,
          region: {
            connect: { id: regionId },
          },
          category: categoryId ? { connect: { id: parseInt(categoryId, 10) } } : undefined,
        },
      });
      res.status(201).json({ message: "Site créé avec succès.", site: newSite });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du site.", error });
    }
  }

  // Lister les sites
  static async listSites(req: Request, res: Response): Promise<void> {
    try {
      const regionId = parseInt(req.params.regionId, 10);

      const sites = await prisma.site.findMany({
        where: { regionId },
        include: {
          category: true,
          sitePackage: true,
        },
        
      });
        // Ajouter l'URL complète pour les médias
        const sitesWithSitesUrl = sites.map(site => ({
          ...site, // Inclure tous les champs d'origine
          media: site.media ? `${req.protocol}://${req.get('host')}/uploads/sites/${site.media}` : null,
        }));
      res.status(200).json({ message: "Sites récupérés avec succès.", sites: sitesWithSitesUrl });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des sites.", error });
    }
  }

  // Mettre à jour un site
  static async updateSite(req: Request, res: Response): Promise<void> {
    try {
      const { siteId } = req.params;
      const regionId = parseInt(req.params.regionId, 10);
      const { name, description, city, postalCode, address, latitude, longitude, contact, information } = req.body;
      const media = req.file;

      const site = await prisma.site.findUnique({
        where: { id: parseInt(siteId, 10) },
      });

      if (!site || site.regionId !== regionId) {
        res.status(403).json({ message: "Accès interdit ou site non trouvé." });
        return;
      }

      const updatedSite = await prisma.site.update({
        where: { id: parseInt(siteId, 10) },
        data: {
          name: name ?? site.name,
          description: description ?? site.description,
          city: city ?? site.city,
          postalCode: postalCode ?? site.postalCode,
          address: address ?? site.address,
          latitude: latitude ?? site.latitude,
          longitude: longitude ?? site.longitude,
          media: media ? media.filename : site.media, // Remplace l'ancien média
          contact: contact ?? site.contact,
          information: information ?? site.information,
        },
      });
      res.status(200).json({ message: "Site mis à jour avec succès.", site: updatedSite });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du site.", error });
    }
  }

  // Supprimer un site
  static async deleteSite(req: Request, res: Response): Promise<void> {
    try {
      const { siteId } = req.params;
      const regionId = parseInt(req.params.regionId, 10);

      const site = await prisma.site.findUnique({
        where: { id: parseInt(siteId, 10) },
      });

      if (!site || site.regionId !== regionId) {
        res.status(403).json({ message: "Accès interdit ou site non trouvé." });
        return;
      }
      // Si le site contient un média, on le supprime du dossier
      if (site.media) {
        const filePath = path.join(__dirname, '../../uploads/sites', site.media);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
            console.log(`Fichier média supprimé : ${filePath}`);
          } catch (error) {
            console.error(`Erreur lors de la suppression du fichier média : ${error}`);
          }
        } else {
          console.warn(`Fichier média introuvable : ${filePath}`);
        }
      }

      await prisma.site.delete({
        where: { id: parseInt(siteId, 10) },
      });
      res.status(200).json({ message: "Site supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du site :", error);
      res.status(500).json({ message: "Erreur interne lors de la suppression du site.", error });
    }
  }
=======
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await RegionService.login(req.body.email, req.body.password);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });
            res.status(200).json({ message: "Connexion réussie", token });
        } catch (error) {
            res.status(401).json({ message: "Identifiants invalides" });
        }
    }

    static async register(req: Request, res: Response): Promise<void> {
        const { name, email, password, media, description } = req.body;

        // Vérification des champs obligatoires si présent ou non
        if (!name || !email || !password) {
            res.status(400).json({ message: "Non, email et mot de passe requis." });
            return;
        }
        try {
            // Appel de Regionservice.register avec des champs media et descriptions qui sont optionnels
            const region = await RegionService.register(
                name,
                email,
                password,
                media ?? null,  // Si champ vide alors null
                description ?? null, // Si champ vide alors null
            );
            res.status(201).json(region);
        } catch (error) {
            res.status(400).json({ message: "Erreur lors de la création de la région" });
        }
    }
    ///ajout dashboard:
    static async getDashboard(req: Request, res: Response): Promise<void> {
        try {
            // Récupérer l'ID de la région à partir des paramètres
            const regionId = parseInt(req.params.regionId, 10);

            if (!regionId) {
                res.status(400).json({ message: "Region ID manquant." });
                return;
            }

            // Récupérer le nombre de packages pour cette région
            const packagesCount = await prisma.package.count({
                where: { regionId },
            });

            // Récupérer le nombre de sites pour cette région
            const sitesCount = await prisma.site.count({
                where: { regionId },
            });

            // Répondre avec les statistiques
            res.status(200).json({
                message: "Données du dashboard récupérées avec succès.",
                data: {
                    packagesCount,
                    sitesCount,
                },
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données du dashboard :", error);
            res.status(500).json({
                message: "Erreur lors de la récupération des données du dashboard.",
                error,
            });
        }
    }


    // Ajouter un package
    static async addPackage(req: Request, res: Response): Promise<void> {
        try {
            const regionId = parseInt(req.params.regionId); // ID de la région
            const { price, description, name } = req.body;
            const media = req.file; // Récupération du fichier uploadé

            if (!regionId) {
                res.status(400).json({ message: "Region ID manquant." });
                return;
            }

            if (!name || !price) {
                res.status(400).json({ message: "Les champs 'name' et 'price' sont obligatoires." });
                return;
            }

            const newPackage = await prisma.package.create({
                data: {
                    name,
                    price,
                    media: media ? media.filename : null,
                    description,
                    region: {
                        connect: { id: regionId }, // Lien avec la région
                    },
                },
            });

            res.status(201).json({ message: "Package créé avec succès.", package: newPackage });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du package.", error });
        }
    }

    // Lister les packages
    static async listPackages(req: Request, res: Response): Promise<void> {
        try {
            const regionId = parseInt(req.params.regionId);
            if (!regionId) {
                res.status(400).json({ message: "Region ID manquant." });
                return;
            }

            const packages = await prisma.package.findMany({
                where: {
                    regionId,
                },
                include: {
                    sitePackages: true, // Inclure des relations si nécessaire
                },
            });
            // Ajouter l'URL complète pour les médias
            const packagesWithMediaUrl = packages.map(pkg => ({
                ...pkg, // Inclure tous les champs d'origine
                media: pkg.media ? `${req.protocol}://${req.get('host')}/uploads/${pkg.media}` : null,
            }));

            res.status(200).json({ message: "Packages récupérés avec succès.", packages: packagesWithMediaUrl, });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des packages.", error });
        }
    }



    // Mettre à jour un package
    static async updatePackage(req: Request, res: Response): Promise<void> {
        try {
            const { packageId } = req.params; // ID du package
            const regionId = parseInt(req.params.region, 10);
            const { price, description, name } = req.body;
            const media = req.file;
            const packageItem = await prisma.package.findUnique({
                where: { id: parseInt(packageId, 10) },
            });

            if (!packageItem || packageItem.regionId !== regionId) {
                res.status(403).json({ message: "Accès interdit ou package non trouvé." });
                return;
            }

            // Supprimer l'ancien média si un nouveau est uploadé
            if (media && packageItem.media) {
                const oldMediaPath = path.resolve(__dirname, '../../uploads', packageItem.media);
                if (fs.existsSync(oldMediaPath)) {
                    fs.unlinkSync(oldMediaPath); // Supprime l'ancien fichier
                }
            }
            const updatedPackage = await prisma.package.update({
                where: { id: parseInt(packageId, 10) },
                data: {
                    name: name ?? packageItem.name,
                    price: price ? parseFloat(price) : packageItem.price,
                    media: media ? media.filename : packageItem.media, // Remplace l'ancien média
                    description: description ?? packageItem.description,
                },
            });
            res.status(200).json({ message: "Package mis à jour avec succès.", package: updatedPackage });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du package.", error });
        }
    }

    // Supprimer un package
    static async deletePackage(req: Request, res: Response): Promise<void> {
        try {
            const { regionId, packageId } = req.params;

            // Vérifier si l'ID de région et l'ID du package sont fournis
            if (!regionId || !packageId) {
                res.status(400).json({ message: "Region ID ou Package ID manquant." });
                return;
            }

            // Récupérer le package depuis la base de données
            const packageToDelete = await prisma.package.findFirst({
                where: {
                    id: parseInt(packageId),
                    regionId: parseInt(regionId),
                },
            });
            if (!packageToDelete) {
                res.status(404).json({ message: "Package non trouvé." });
                return;
            }

            // Si le package contient un média, supprimer le fichier associé
            if (packageToDelete.media) {
                const fs = require("fs");
                const path = require("path");

                // Chemin du fichier média
                const filePath = path.join(__dirname, "../uploads", packageToDelete.media);

                // Vérifier si le fichier existe
                if (fs.existsSync(filePath)) {
                    try {
                        fs.unlinkSync(filePath); // Supprimer le fichier
                        console.log(`Fichier supprimé : ${filePath}`);
                    } catch (error) {
                        console.error(`Erreur lors de la suppression du fichier : ${error}`);
                    }
                } else {
                    console.warn(`Fichier introuvable : ${filePath}`);
                }
            }

            // Supprimer le package de la base de données
            await prisma.package.delete({
                where: {
                    id: parseInt(packageId),
                },
            });

            res.status(200).json({ message: "Package supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression du package :", error);
            res.status(500).json({ message: "Erreur interne lors de la suppression du package.", error });
        }
    }

    // Ajouter un site
    static async addSite(req: Request, res: Response): Promise<void> {
        try {
            const regionId = parseInt(req.params.regionId, 10);
            const { name, description, city, postalCode, address, latitude, longitude, contact, information, categoryId } = req.body;
            const media = req.file; // Récupération du fichier uploadé

            if (!name || !city || !postalCode || !address) {
                res.status(400).json({ message: "Les champs 'name', 'city', 'postalCode' et 'address' sont obligatoires." });
                return;
            }

            const newSite = await prisma.site.create({
                data: {
                    name,
                    description,
                    city,
                    postalCode,
                    address,
                    latitude: latitude ? parseFloat(latitude) : null,
                    longitude: longitude ? parseFloat(longitude) : null,
                    media: media ? media.filename : null,
                    contact,
                    information,
                    region: {
                        connect: { id: regionId },
                    },
                    category: categoryId ? { connect: { id: parseInt(categoryId, 10) } } : undefined,
                },
            });
            res.status(201).json({ message: "Site créé avec succès.", site: newSite });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du site.", error });
        }
    }

    // Lister les sites
    static async listSites(req: Request, res: Response): Promise<void> {
        try {
            const regionId = parseInt(req.params.regionId, 10);

            const sites = await prisma.site.findMany({
                where: { regionId },
                include: {
                    category: true,
                    sitePackage: true,
                },

            });
            // Ajouter l'URL complète pour les médias
            const sitesWithSitesUrl = sites.map(site => ({
                ...site, // Inclure tous les champs d'origine
                media: site.media ? `${req.protocol}://${req.get('host')}/uploads/sites/${site.media}` : null,
            }));
            res.status(200).json({ message: "Sites récupérés avec succès.", sites: sitesWithSitesUrl });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des sites.", error });
        }
    }

    // Mettre à jour un site
    static async updateSite(req: Request, res: Response): Promise<void> {
        try {
            const { siteId } = req.params;
            const regionId = parseInt(req.params.regionId, 10);
            const { name, description, city, postalCode, address, latitude, longitude, contact, information } = req.body;
            const media = req.file;

            const site = await prisma.site.findUnique({
                where: { id: parseInt(siteId, 10) },
            });

            if (!site || site.regionId !== regionId) {
                res.status(403).json({ message: "Accès interdit ou site non trouvé." });
                return;
            }

            const updatedSite = await prisma.site.update({
                where: { id: parseInt(siteId, 10) },
                data: {
                    name: name ?? site.name,
                    description: description ?? site.description,
                    city: city ?? site.city,
                    postalCode: postalCode ?? site.postalCode,
                    address: address ?? site.address,
                    latitude: latitude ?? site.latitude,
                    longitude: longitude ?? site.longitude,
                    media: media ? media.filename : site.media, // Remplace l'ancien média
                    contact: contact ?? site.contact,
                    information: information ?? site.information,
                },
            });
            res.status(200).json({ message: "Site mis à jour avec succès.", site: updatedSite });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du site.", error });
        }
    }

    // Supprimer un site
    static async deleteSite(req: Request, res: Response): Promise<void> {
        try {
            const { siteId } = req.params;
            const regionId = parseInt(req.params.regionId, 10);

            const site = await prisma.site.findUnique({
                where: { id: parseInt(siteId, 10) },
            });

            if (!site || site.regionId !== regionId) {
                res.status(403).json({ message: "Accès interdit ou site non trouvé." });
                return;
            }
            // Si le site contient un média, on le supprime du dossier
            if (site.media) {
                const filePath = path.join(__dirname, '../../uploads/sites', site.media);
                if (fs.existsSync(filePath)) {
                    try {
                        fs.unlinkSync(filePath);
                        console.log(`Fichier média supprimé : ${filePath}`);
                    } catch (error) {
                        console.error(`Erreur lors de la suppression du fichier média : ${error}`);
                    }
                } else {
                    console.warn(`Fichier média introuvable : ${filePath}`);
                }
            }

            await prisma.site.delete({
                where: { id: parseInt(siteId, 10) },
            });
            res.status(200).json({ message: "Site supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression du site :", error);
            res.status(500).json({ message: "Erreur interne lors de la suppression du site.", error });
        }
    }
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
}



export default AuthRegionController 