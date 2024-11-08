import { Router } from "express";
import {
    createSitePackage,
    deleteSitePackageById,
    getAllSitePackages,
    getSitePackageById,
    updateSitePackage
} from "../controllers/sitePackage.controller";

const sitePackageRouter = Router();

sitePackageRouter.get("/", getAllSitePackages);
sitePackageRouter.get("/:siteId/:packageId", getSitePackageById);
sitePackageRouter.post("/", createSitePackage);
sitePackageRouter.put("/:siteId/:packageId", updateSitePackage);
sitePackageRouter.delete("/:siteId/:packageId", deleteSitePackageById);

export default sitePackageRouter;