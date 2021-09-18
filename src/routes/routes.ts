/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import UserController from '@src/useCases/Users/Controllers/UserController';

const router = Router();

router.post('/register', UserController.register);
router.get('/', (req, res) => res.json({ message: 'Hellow' }));

export default router;
