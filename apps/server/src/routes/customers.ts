import { Router } from 'express';
import { CustomerController } from '../controllers';

// Auth middleware
import { auth } from 'express-oauth2-jwt-bearer';

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
});

const router = Router();
const custCtrlr = new CustomerController();
const { signIn, addCustomer, getAllCustomers, getSingleCustomer, verifyEmail } =
  custCtrlr;

router.post('/login', signIn.bind(custCtrlr));
router.post('/customers', addCustomer.bind(custCtrlr));

router.use(checkJwt);
router.get('/customers', getAllCustomers.bind(custCtrlr));
router.get('/customers/:id', getSingleCustomer.bind(custCtrlr));
router.post('/customers/emailVerify', verifyEmail.bind(custCtrlr));
//TODO: add logOut

export default router;
