import { Router } from 'express';
import Controller from '../controllers/user';

const router = Router();
const UserController = new Controller();

router
  .route('/')
    .post((req, res) => {
      UserController.create(req, res);
    })

export default router;