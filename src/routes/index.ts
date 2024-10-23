import { Router } from 'express';
import { useHandler } from '../controllers';

const router = Router();

router.post('/', useHandler);

export default router;
