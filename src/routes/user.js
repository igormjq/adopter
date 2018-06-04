import { Router } from 'express';
import Controller from '../controllers/user';
import auth from '../middlewares/auth';
import checkUser from '../middlewares/checkUser';

const router = Router();
const UserController = new Controller();

router
  .route('/')
    .post((req, res) => {
      UserController.create(req, res);
    })

router
  .route('/login')
    .post((req, res) => {
      UserController.login(req, res);
    });
  
// router
//   .use(auth, checkUser)
//   .route('/admin')
//     .get((req, res) => {
//       res.send();
//     })
    

export default router;