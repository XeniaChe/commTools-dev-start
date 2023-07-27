import { Router } from 'express';
import { CategoriesController } from '../controllers';

const router = Router();
const catCtrlr = new CategoriesController();
const { addCategory, genericCategoryUpdate } = catCtrlr;

router.post('/categories', addCategory.bind(catCtrlr));
router.post('/categories/:id', genericCategoryUpdate.bind(catCtrlr));

export default router;
