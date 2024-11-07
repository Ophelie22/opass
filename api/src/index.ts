import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import authController from './auth/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world !');
});

app.use(bodyParser.json());

app.use('/auth', authController);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});