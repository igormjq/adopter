import { Router } from 'express';
import animal from './animal';
import user from './user'

const router = Router();

router.use('/animal', animal);
router.use('/user', user);

router.get('/', (req, res) => {
  res.json({ detail: 'Adopter API', _v: 1 });
});

export default router;