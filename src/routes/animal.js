import { Router } from 'express';
import Controller from '../controllers/animal';

const router = Router();
const AnimalController = new Controller();

router
  .route('/')
    .get((req, res) => {
      AnimalController.fetch(req, res);
    })
    .post((req, res) => {
      AnimalController.create(req, res);
    })

export default router;