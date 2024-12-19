import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';



// Fonction utilitaire pour s'assurer que le répertoire existe
function ensureDirExists(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Dossier ${dir} créé avec succès.`);
    }
}
// Définir le répertoire de stockage
const uploadDir = path.resolve(__dirname, '../../uploads');
const sitesDir = path.resolve(__dirname, '../../uploads/sites');

ensureDirExists(sitesDir);

// Vérifier si le dossier `uploads/` existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Création récursive
    console.log('Dossier uploads créé avec succès.');
}

// Configuration de stockage pour Multer
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, uploadDir); // Répertoire où les fichiers seront stockés
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// Configuration de stockage pour les sites
const storageSites = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, sitesDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
// Filtre de fichier commun : autoriser uniquement les images
function imageFileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Seuls les fichiers image sont autorisés.'));
    }
    cb(null, true);
}
// Middleware Multer avec limites et filtre
const upload: Multer = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Taille max : 5 MB
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Seuls les fichiers image sont autorisés.'));
        }
        cb(null, true);
    },
});
// Taille limite (exemple : 5MB)
const limits = { fileSize: 5 * 1024 * 1024 };
export const uploadSiteMedia: Multer = multer({
    storage: storageSites,
    limits,
    fileFilter: imageFileFilter,
});
export default upload;