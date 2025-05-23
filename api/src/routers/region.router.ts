import { Router } from "express";
import {
  deleteRegionById,
  getAllRegionDetails,
  getAllRegions,
  getAllRegionsForVisitors,
  getRegionById,
  updateRegionById,
} from "../controllers/region.controller";

const regionRouter = Router();

regionRouter.get("/", getAllRegions);
regionRouter.get("/visitors", getAllRegionsForVisitors); // Description, image & noms de la région
regionRouter.get("/:id/all-relations", getAllRegionDetails); // Toutes les infos de la région + packages avec l'id
regionRouter.get("/:id", getRegionById);
regionRouter.put("/:id", updateRegionById);
regionRouter.delete("/:id", deleteRegionById);

export default regionRouter;