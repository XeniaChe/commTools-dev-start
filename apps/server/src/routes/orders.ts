import { Router } from 'express';
import { OrdersController } from '../controllers';

const router = Router();
const ordersCtrlr = new OrdersController();
const { createOrder } = ordersCtrlr;

router.post('/orders', createOrder.bind(ordersCtrlr));

export default router;
