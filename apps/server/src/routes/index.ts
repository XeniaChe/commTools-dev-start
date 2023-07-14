import { Router } from 'express';
import customer from './customers';
const router = Router();

router.use(customer);

export default router;
