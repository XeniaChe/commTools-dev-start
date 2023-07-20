import { Router } from 'express';
import { ProductsController } from '../controllers';

const router = Router();
const prodCtrlr = new ProductsController();
const { createProduct } = prodCtrlr;

router.post('/products', createProduct.bind(prodCtrlr));

export default router;
