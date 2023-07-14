import { Router } from 'express';
import { CustomerController } from '../controllers';

const router = Router();
const custCtrlr = new CustomerController();
router.get('/customers', custCtrlr.getAllCustomers);
router.post('/customers/new', custCtrlr.addCustomer);

export default router;
