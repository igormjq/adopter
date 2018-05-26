import { Router } from 'express';
import Controller from '../controllers/animal';
import Model from '../models/animal';

const router = Router();
const AnimalController = new Controller(Model);

router
  .route('/')
    .get((req, res) => {
      AnimalController.fetch(req, res);
    })
    .post((req, res) => {
      AnimalController.create(req, res);
    })

export default router;