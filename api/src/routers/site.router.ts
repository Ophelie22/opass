import { Router } from "express";
import {
  deleteSiteById,
  getAllSites,
  getSiteById,
  updateSiteById,
} from "../controllers/site.controller";

const siteRouter = Router();

siteRouter.get("/", getAllSites);
siteRouter.get("/:id", getSiteById);
siteRouter.put("/:id", updateSiteById);
siteRouter.delete("/:id", deleteSiteById);

export default siteRouter;