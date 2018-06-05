import { Router } from 'express'
import Controller from '../controllers/event'
import auth from '../middlewares/auth'
import checkUser from '../middlewares/checkUser'

const router = Router()
const EventController = new Controller()

router
  .use(auth, checkUser)
  .post('/', (req, res) => {
    EventController.create(req, res);
  });

export default router