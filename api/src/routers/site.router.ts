import { Router } from "express";
import {
  deleteSiteById,
  getAllSites,
  getAllSitesByRegionIdAndCategoryId,
  getSiteById,
  updateSiteById,
} from "../controllers/site.controller";

const siteRouter = Router();

siteRouter.get("/", getAllSites);
siteRouter.get("/:regionId/:categoryId", getAllSitesByRegionIdAndCategoryId);
siteRouter.get("/:id", getSiteById);
siteRouter.put("/:id", updateSiteById);
siteRouter.delete("/:id", deleteSiteById);

export default siteRouter;