import { Router } from 'express';
import { CustomerController } from '../controllers';

const router = Router();
const custCtrlr = new CustomerController();
router.get('/customers', custCtrlr.getAllCustomers);
router.post('/customers', custCtrlr.addCustomer);
router.post('/login', custCtrlr.signIn);

export default router;
