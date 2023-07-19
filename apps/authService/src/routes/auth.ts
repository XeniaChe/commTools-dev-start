import { Router } from 'express';
import { AuthController } from '../controllers';
import { requiresAuth } from 'express-openid-connect';

const router = Router();
const authCtrlr = new AuthController();
router.get('/auth/get-token', requiresAuth(), authCtrlr.getAccessToken);
router.get('/auth/profile', requiresAuth(), authCtrlr.getProfile);

export default router;
