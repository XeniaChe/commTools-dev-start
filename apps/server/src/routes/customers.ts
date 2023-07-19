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

router.post('/login', custCtrlr.signIn);
router.post('/customers', custCtrlr.addCustomer);

router.use(checkJwt);
router.get('/customers', custCtrlr.getAllCustomers);
router.get('/customers/:id', custCtrlr.getSingleCustomer);
router.post('/customers/emailVerify', custCtrlr.verifyEmail);
//TODO: add logOut

export default router;
