import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).send(`<h4>OK</h4>`);
});

export default router;
