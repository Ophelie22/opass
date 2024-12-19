import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authRouter from "../src/auth/auth.routes";
import authregionRouter from './auth/auth.routes';
import dotenv from "dotenv";
import router from "./routers";
import cors from 'cors';
import authregionRouter from "./authRegion/authregion.routes";

const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();


const allowedOrigins = [
	'http://localhost:3002', // Backend
	'http://localhost:3000', // Backend local ou autre service
	'http://api:3000',       // Frontend dans Docker (depuis le réseau interne Docker)
	'https://votre-domaine.com', // Domaine de production
	"http://localhost:5173",//frontennd
<<<<<<< HEAD
  ];
=======
];
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e

// Configuration CORS
app.use(cors({
	origin: (origin, callback) => {
<<<<<<< HEAD
	  if (!origin || allowedOrigins.includes(origin)) {
		callback(null, true);
	  } else {
		callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
	credentials: true,
  }));
  
  // Middleware pour gérer les requêtes prévolantes (OPTIONS)
=======
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
	credentials: true,
}));

// Middleware pour gérer les requêtes prévolantes (OPTIONS)
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
app.options('*', cors());


// Partie Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
<<<<<<< HEAD
// app.use(cors(corsOptions)); // voir si on commente cette ligne


// Logging des requêtes pour debug
app.use((req, res, next) => {
	console.log('Request Origin:', req.headers.origin);
	console.log('Request Method:', req.method);
	console.log('Request Headers:', req.headers);
	next();
  });
  
  const path = require('path');
  
  // Middleware pour rendre le dossier "uploads" public
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  //enregistrements des medias des sites dans le dossier sites
  app.use('/uploads/sites', express.static(path.join(__dirname, '..', 'uploads', 'sites')));
  
  
  // Routes
  app.get('/', (req: Request, res: Response) => {
	res.send('Hello world !');
  });
  app.use('/api', router);
  app.use('/api/authregion', authregionRouter);
  app.use('/api/auth', authRouter);
  
  // Gestion des erreurs 404
  app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route not found' });
  });
  
  // Démarrage du serveur
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
=======
//app.use(cors(corsOptions)); // voir si on commente cette ligne


// Logging des requêtes pour debug
app.use((req, res, next) => {
	console.log('Request Origin:', req.headers.origin);
	console.log('Request Method:', req.method);
	console.log('Request Headers:', req.headers);
	next();
});

const path = require('path');

// Middleware pour rendre le dossier "uploads" public
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
//enregistrements des medias des sites dans le dossier sites
app.use('/uploads/sites', express.static(path.join(__dirname, '..', 'uploads', 'sites')));


// Routes
app.get('/', (req: Request, res: Response) => {
	res.send('Hello world !');
});
app.use('/api', router);
app.use('/api/authregion', authregionRouter);
app.use('/api/auth', authRouter);

// Gestion des erreurs 404
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route not found' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
>>>>>>> 5bbb2ec506d34f8887bc667e0ab32d257e272d0e
	console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  export default app;
