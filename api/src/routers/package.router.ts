import { Router } from "express";
import {
  deletePackageById,
  getAllPackages,
  getPackageById,
  updatePackageById,
} from "../controllers/package.controller";

const packageRouter = Router();

packageRouter.get("/", getAllPackages);
packageRouter.get("/:id", getPackageById);
packageRouter.put("/:id", updatePackageById);
packageRouter.delete("/:id", deletePackageById);

export default packageRouter;