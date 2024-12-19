

declare namespace Express {
  export interface Request {
    userId?: number; // Si tu en as besoin pour les utilisateurs normaux
    region?: {
      regionId: number;
      email: string;
      [key: string]: any; // Si d'autres champs dynamiques sont présents
    }
    file?: Multer.File; 
    files?: { [fieldname: string]: Multer.File[] } | Multer.File[];
  }
}