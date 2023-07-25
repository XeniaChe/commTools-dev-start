import { Router } from 'express';
import { ProductsController } from '../controllers';

const router = Router();
const prodCtrlr = new ProductsController();
const { createProduct, /* queryProdProjection,  */ queryProducts } = prodCtrlr;

router.post('/products', createProduct.bind(prodCtrlr));
router.get('/products', queryProducts.bind(prodCtrlr));

export default router;
