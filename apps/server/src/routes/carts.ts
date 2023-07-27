import { Router } from 'express';
import { CartsController } from '../controllers';

const router = Router();
const cartCtrlr = new CartsController();
const { addCart, getAllCarts, genericCartUpdate } = cartCtrlr;

router.post('/carts', addCart.bind(cartCtrlr));
router.get('/carts', getAllCarts.bind(cartCtrlr));
router.post('/carts/:id', genericCartUpdate.bind(cartCtrlr));

export default router;
