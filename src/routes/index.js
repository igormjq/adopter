import { Router } from 'express';
import animal from './animal';

const router = Router();

router.use('/animal', animal);

router.get('/', (req, res) => {
  res.json({ detail: 'Adopter API', _v: 1 });
});

export default router;