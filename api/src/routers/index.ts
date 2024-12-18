
//ICI c'est ttes les routes qui commencent /api pour clarifier le code

import { Router } from 'express';
import userRouter from './user.router';
import siteUserRouter from './siteuser.router';
import sitePackageRouter from './sitepackage.router';
import siteCategoryRouter from './sitecategory.router';
import siteRouter from './site.router';
import regionRouter from './region.router';
import passRouter from './pass.router';
import packageRouter from './package.router';
import orderRouter from './order.router';

const router = Router();

router.use("/users", userRouter);
router.use("/siteUsers", siteUserRouter);
router.use("/sitePackages", sitePackageRouter);
router.use("/siteCategories", siteCategoryRouter);
router.use("/sites", siteRouter);
router.use("/regions", regionRouter);
router.use("/passes", passRouter);
router.use("/packages", packageRouter);
router.use("/orders", orderRouter);

export default router;
