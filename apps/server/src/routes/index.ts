import { Router } from 'express';
import customer from './customers';
import categories from './categories';
import products from './products';
import carts from './carts';
import orders from './orders';
const router = Router();

router.use(customer);
router.use(categories);
router.use(products);
router.use(carts);
router.use(orders);

export default router;
