import { Router } from "express";
import {
  deleteSiteUserById,
  getAllSiteUsers,
  getSiteUserById,
  updateSiteUserById,
} from "../controllers/siteUser.controller";

const siteUserRouter = Router();

siteUserRouter.get("/", getAllSiteUsers);
siteUserRouter.get("/:id", getSiteUserById);
siteUserRouter.put("/:id", updateSiteUserById);
siteUserRouter.delete("/:id", deleteSiteUserById);

export default siteUserRouter;