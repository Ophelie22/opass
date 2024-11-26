import express, { Request, Response } from 'express';
import userRouter from './routers/user.router';
import siteUserRouter from './routers/siteUser.router';
import sitePackageRouter from './routers/sitePackage.router';
import siteCategoryRouter from './routers/siteCategory.router';
import siteRouter from './routers/site.router';
import regionRouter from './routers/region.router';
import passRouter from './routers/pass.router';
import packageRouter from './routers/package.router';
import orderRouter from './routers/order.router';
// Test pour le seed
import '../prisma/seed';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world !');
});

// Middleware pour parser le JSON
app.use(express.json());

// Routes des 9 tables V.1
app.use("/api/users", userRouter);
app.use("/api/siteUser", siteUserRouter);
app.use("/api/sitePackage", sitePackageRouter);
app.use("/api/siteCategory", siteCategoryRouter);
app.use("/api/site", siteRouter );
app.use("/api/region", regionRouter);
app.use("/api/pass", passRouter);
app.use("/api/package", packageRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});