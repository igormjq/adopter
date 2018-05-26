import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from './database/connect';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/', routes);

export default app;