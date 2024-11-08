import { Router } from "express";
import {
  deleteRegionById,
  getAllRegions,
  getRegionById,
  updateRegionById,
} from "../controllers/region.controller";

const regionRouter = Router();

regionRouter.get("/", getAllRegions);
regionRouter.get("/:id", getRegionById);
regionRouter.put("/:id", updateRegionById);
regionRouter.delete("/:id", deleteRegionById);

export default regionRouter;