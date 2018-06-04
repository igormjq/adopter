import { Router } from 'express';
import Controller from '../controllers/animal';
import auth from '../middlewares/auth';

const router = Router();
const AnimalController = new Controller();

router.get('/', (req, res) => {
  AnimalController.fetch(req, res);
});

router
  .use(auth)
  .post('/', (req, res) => {
    AnimalController.create(req, res);
  });

router
  .use(auth)
  .route('/:id')
    .patch((req, res) => {
      AnimalController.updateById(req, res);
    })
    .delete((req, res) => {
      AnimalController.delete(req, res);
    });

export default router;