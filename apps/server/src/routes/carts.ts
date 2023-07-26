import { Router } from 'express';
import { CartsController } from '../controllers';

const router = Router();
const cartCtrlr = new CartsController();
const { addCart, getAllCarts } = cartCtrlr;

router.post('/carts', addCart.bind(cartCtrlr));
router.get('/carts', getAllCarts.bind(cartCtrlr));

export default router;
