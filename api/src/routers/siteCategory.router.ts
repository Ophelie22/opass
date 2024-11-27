import { Router } from "express";
import {
  deleteSiteCategoryById,
  getAllSiteCategories,
  getSiteCategoryById,
  updateSiteCategoryById,
} from "../controllers/siteCategory.controller";

const siteCategoryRouter = Router();

siteCategoryRouter.get("/", getAllSiteCategories);
siteCategoryRouter.get("/:id", getSiteCategoryById);
siteCategoryRouter.put("/:id", updateSiteCategoryById);
siteCategoryRouter.delete("/:id", deleteSiteCategoryById);

export default siteCategoryRouter;