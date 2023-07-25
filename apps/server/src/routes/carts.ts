import { Router } from 'express';
import { CartsController } from '../controllers';

const router = Router();
const cartCtrlr = new CartsController();
const { addCart } = cartCtrlr;

router.post('/carts', addCart.bind(cartCtrlr));

export default router;
