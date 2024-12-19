import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRouter from "../src/auth/auth.routes";
import dotenv from "dotenv";
import router from "./routers";
import cors from 'cors';
import authregionRouter from "./authRegion/authregion.routes";

const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();

const allowedOrigins = [
  'http://localhost:3002',
  'http://localhost:3000',
  'http://api:3000',
  'https://votre-domaine.com',
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);
  next();
});

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/uploads/sites', express.static(path.join(__dirname, '..', 'uploads', 'sites')));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world !');
});
app.use('/api', router);
app.use('/api/authregion', authregionRouter);
app.use('/api/auth', authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
