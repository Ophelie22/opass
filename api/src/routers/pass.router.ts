import { Router } from "express";
import {
  deletePassById,
  getAllPasses,
  getPassById,
  updatePassById,
  getActivePasses,
} from "../controllers/pass.controller";

const passRouter = Router();

passRouter.get("/", getAllPasses);
passRouter.get("/:id", getPassById);
passRouter.put("/:id", updatePassById);
passRouter.delete("/:id", deletePassById);
passRouter.get("/active-passes/:id", getActivePasses);

export default passRouter;