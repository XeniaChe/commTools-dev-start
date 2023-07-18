import { Router } from 'express';
import { CustomerController } from '../controllers';

const router = Router();
const custCtrlr = new CustomerController();
router.get('/customers', custCtrlr.getAllCustomers);
router.post('/customers', custCtrlr.addCustomer);
router.post('/login', custCtrlr.signIn);
router.get('/customers/:id', custCtrlr.getSingleCustomer);
router.post('/customers/emailVerify', custCtrlr.verifyEmail);

export default router;
