import { Router } from 'express';
import userRouter from './user.router';
import siteUserRouter from './siteUser.router';
import sitePackageRouter from './sitePackage.router';
import siteCategoryRouter from './siteCategory.router';
import siteRouter from './site.router';
import regionRouter from './region.router';
import passRouter from './pass.router';
import packageRouter from './package.router';
import orderRouter from './order.router';

const router = Router();

router.use("/users", userRouter);
router.use("/siteUser", siteUserRouter);
router.use("/sitePackage", sitePackageRouter);
router.use("/siteCategory", siteCategoryRouter);
router.use("/site", siteRouter);
router.use("/region", regionRouter);
router.use("/pass", passRouter);
router.use("/package", packageRouter);
router.use("/order", orderRouter);

export default router;

