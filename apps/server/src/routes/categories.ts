import { Router } from 'express';
import { CategoriesController } from '../controllers';

const router = Router();
const catCtrlr = new CategoriesController();

router.post('/categories', catCtrlr.addCategory);
router.post('/categories/:id', catCtrlr.updateCategory);

export default router;
