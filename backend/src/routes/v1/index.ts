import { Router } from 'express';

import auth from './auth';
import users from './users';
import todos from './todos'

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/todos', todos);

export default router;
