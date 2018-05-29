import { Router } from 'express';
import animal from './animal';
import user from './user'
import auth from '../middlewares/auth'

const router = Router();

router.use('/animal', animal);
router.use('/user', user);

router
// .use(auth)
.get('/', (req, res) => {
  res.json({ detail: 'Adopter API', _v: 1 });
});

export default router;