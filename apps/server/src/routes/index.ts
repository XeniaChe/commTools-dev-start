import { Router } from 'express';
import customer from './customers';
import categories from './categories';
import products from './products';
import carts from './carts';
const router = Router();

router.use(customer);
router.use(categories);
router.use(products);
router.use(carts);

export default router;
