import { Router } from 'express';
import customer from './customers';
import categories from './categories';
import products from './products';
const router = Router();

router.use(customer);
router.use(categories);
router.use(products);

export default router;
