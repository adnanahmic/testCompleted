import { Router } from 'express';

import { list, edit, create } from 'controllers/todos';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

router.get('/', [checkJwt, checkRole(['STANDARD'])], list);

router.post('/', [checkJwt, checkRole(['STANDARD'])], create);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'])], edit);

export default router;
