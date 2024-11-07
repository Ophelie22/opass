import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authController from './auth/auth.routes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Partie Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello world !');
});



app.use('/auth', authController);


// Démarrage du serveur
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});