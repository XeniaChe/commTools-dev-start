import { Router } from 'express';
import customer from './customers';
import categories from './categories';
const router = Router();

router.use(customer);
router.use(categories);

export default router;
