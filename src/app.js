import config from '../config/config';
import mongoose from '../config/database';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const corsOptions = {
  exposedHeaders: ['x-auth']
}

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/', routes);

export default app;