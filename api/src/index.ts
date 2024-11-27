import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authRouter from '../src/auth/auth.routes';
import dotenv from 'dotenv';
import router from './routers';

const cookieParser = require('cookie-parser');
const app = express();
//exports.app = app;

// Chargement des variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 3000;

// Partie Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world !');
});

// Mount all routes under /api
app.use('/api', router);


app.use('/api/auth', authRouter);
// Error handling for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;