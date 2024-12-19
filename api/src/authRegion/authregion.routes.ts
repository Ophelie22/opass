import { Router, Request, Response, NextFunction } from 'express';
import AuthRegionController from './authregion.controller';
import AuthRegionMiddleware from './authregion.middleware';
import { PrismaClient, Package } from '@prisma/client';
import upload, { uploadSiteMedia } from '../config/multer.config'; // Importer la configuration Multer

const router = Router();

const prisma = new PrismaClient();

// Routes publiques pour les administrateurs régionaux
router.post('/register', AuthRegionController.register);
router.post('/login', AuthRegionController.login);

// Route pour lister les packages (avec middleware d'auth région) EERREUR DE FORMAT pour le retour du tableau qu'on attends
//router.get("/:regionId/packages", AuthRegionMiddleware, (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
  //const regionId = req.params.regionId; // ID de la région, changer le region? par params car le region n'était pas reconnu. Dans la Request, pour recup les infos il faut passer par params.
  //res.json({ message: `Liste des packages pour la région ${regionId}` });
//});

// Route pour ajouter un package
router.post("/:regionId/packages", AuthRegionMiddleware,  upload.single('media'),AuthRegionController.addPackage);
=======
//const regionId = req.params.regionId; // ID de la région, changer le region? par params car le region n'était pas reconnu. Dans la Request, pour recup les infos il faut passer par params.
//res.json({ message: `Liste des packages pour la région ${regionId}` });
//});

// Route pour ajouter un package
router.post("/:regionId/packages", AuthRegionMiddleware, upload.single('media'), AuthRegionController.addPackage);
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
router.put('/:regionId/packages/:packageId', AuthRegionMiddleware, upload.single('media'), AuthRegionController.updatePackage);
// Route pour lister les packages
router.get("/:regionId/packages", AuthRegionMiddleware, AuthRegionController.listPackages);
// Route pour supprimer un package
router.delete("/:regionId/packages/:packageId", AuthRegionMiddleware, AuthRegionController.deletePackage);





// Gestion des sites
router.post('/:regionId/sites', uploadSiteMedia.single('media'), AuthRegionController.addSite);
router.get('/:regionId/sites', AuthRegionController.listSites);
router.put('/:regionId/sites/:siteId', uploadSiteMedia.single('media'), AuthRegionController.updateSite);
router.delete('/:regionId/sites/:siteId', AuthRegionController.deleteSite);

// Gestion des passes
router.get('/:regionId/passes', AuthRegionMiddleware, async (req, res) => { /* ... */ });
router.get('/:regionId/passes/:id', AuthRegionMiddleware, async (req, res) => { /* ... */ });
router.post('/:regionId/passes', AuthRegionMiddleware, async (req, res) => { /* ... */ });
router.delete('/:regionId/passes/:id', AuthRegionMiddleware, async (req, res) => { /* ... */ });

// Dashboard
<<<<<<< HEAD
 
  router.get('/:regionId/dashboard', AuthRegionMiddleware, async (req: Request, res: Response) => {
    try {
      console.log('Route /:regionId/dashboard appelée avec params :', req.params);
  
      const regionId = parseInt(req.params.regionId, 10);
      if (!regionId) {
        res.status(400).json({ message: 'Region ID manquant.' });
        return;
      }
  
      console.log(`Récupération des données pour la région ${regionId}.`);
  
      const packagesCount = await prisma.package.count({
        where: { regionId },
      });
  
      const sitesCount = await prisma.site.count({
        where: { regionId },
      });
  
      console.log('Données récupérées :', { packagesCount, sitesCount });
  
      res.status(200).json({
        message: 'Données du dashboard récupérées avec succès.',
        data: {
          packagesCount,
          sitesCount,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données du dashboard :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données du dashboard.', error });
    }
  });
  //ROUTE DE LIAISON ENTRE PACKAGES ET ROUTES 
  router.post('/site-packages', AuthRegionMiddleware, async (req: Request, res: Response) => {
=======

router.get('/:regionId/dashboard', AuthRegionMiddleware, async (req: Request, res: Response) => {
    try {
        console.log('Route /:regionId/dashboard appelée avec params :', req.params);

        const regionId = parseInt(req.params.regionId, 10);
        if (!regionId) {
            res.status(400).json({ message: 'Region ID manquant.' });
            return;
        }

        console.log(`Récupération des données pour la région ${regionId}.`);

        const packagesCount = await prisma.package.count({
            where: { regionId },
        });

        const sitesCount = await prisma.site.count({
            where: { regionId },
        });

        console.log('Données récupérées :', { packagesCount, sitesCount });

        res.status(200).json({
            message: 'Données du dashboard récupérées avec succès.',
            data: {
                packagesCount,
                sitesCount,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données du dashboard :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données du dashboard.', error });
    }
});
//ROUTE DE LIAISON ENTRE PACKAGES ET ROUTES 
router.post('/site-packages', AuthRegionMiddleware, async (req: Request, res: Response) => {
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
    try {
        const { siteId, packageId } = req.body;
        const newSitePackage = await prisma.sitePackage.create({
            data: {
                siteId: parseInt(siteId),
                packageId: parseInt(packageId)
            }
        });
        res.status(201).json({ message: "Association site-package créée avec succès", data: newSitePackage });
    } catch (error) {
        console.error('Erreur lors de la création de l\'association site-package:', error);
        res.status(500).json({ message: "Erreur lors de la création de l'association site-package" });
    }
});

router.get('/site-packages', AuthRegionMiddleware, async (req: Request, res: Response) => {
    try {
        const sitePackages = await prisma.sitePackage.findMany({
            include: {
                site: true,
                package: true
            }
        });
        res.status(200).json({ data: sitePackages });
    } catch (error) {
        console.error('Erreur lors de la récupération des associations site-package:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des associations site-package" });
    }
});
router.put('/site-packages/:siteId/:packageId', AuthRegionMiddleware, async (req: Request, res: Response) => {
<<<<<<< HEAD
  try {
      const { siteId, packageId } = req.params; // L'identifiant de l'association existante
      const { newSiteId, newPackageId } = req.body; // Les nouvelles valeurs à mettre à jour

      const updatedSitePackage = await prisma.sitePackage.update({
          where: {
              siteId_packageId: {
                  siteId: parseInt(siteId),
                  packageId: parseInt(packageId)
              }
          },
          data: {
              siteId: newSiteId ? parseInt(newSiteId) : undefined, // Mise à jour conditionnelle
              packageId: newPackageId ? parseInt(newPackageId) : undefined
          }
      });

      res.status(200).json({ message: "Association site-package mise à jour avec succès", data: updatedSitePackage });
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'association site-package:', error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'association site-package" });
  }
=======
    try {
        const { siteId, packageId } = req.params; // L'identifiant de l'association existante
        const { newSiteId, newPackageId } = req.body; // Les nouvelles valeurs à mettre à jour

        const updatedSitePackage = await prisma.sitePackage.update({
            where: {
                siteId_packageId: {
                    siteId: parseInt(siteId),
                    packageId: parseInt(packageId)
                }
            },
            data: {
                siteId: newSiteId ? parseInt(newSiteId) : undefined, // Mise à jour conditionnelle
                packageId: newPackageId ? parseInt(newPackageId) : undefined
            }
        });

        res.status(200).json({ message: "Association site-package mise à jour avec succès", data: updatedSitePackage });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'association site-package:', error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'association site-package" });
    }
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
});

router.delete('/site-packages/:siteId/:packageId', AuthRegionMiddleware, async (req: Request, res: Response) => {
    try {
        const { siteId, packageId } = req.params;
        await prisma.sitePackage.delete({
            where: {
                siteId_packageId: {
                    siteId: parseInt(siteId),
                    packageId: parseInt(packageId)
                }
            }
        });
        res.status(200).json({ message: "Association site-package supprimée avec succès" });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'association site-package:', error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'association site-package" });
    }
});
// Exemple de route protégée
//router.get('/dashboard', AuthRegionMiddleware, (req, res) => {
// const region = req.region;
<<<<<<< HEAD
  //if (!req.region) {
    //res.status(401).json({ message: "Non autorisé." });
    //return;
  //}
  //res.json({ message: "Bienvenue sur le tableau de bord de la région." });
=======
//if (!req.region) {
//res.status(401).json({ message: "Non autorisé." });
//return;
//}
//res.json({ message: "Bienvenue sur le tableau de bord de la région." });
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
//});

export default router;