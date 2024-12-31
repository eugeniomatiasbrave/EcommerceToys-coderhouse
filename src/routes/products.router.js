import { Router } from 'express';
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import uploader from '../services/uploader.js';
import { roleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', roleAuth(['admin']), uploader.array('thumbnail', 3), productsController.createProduct);
router.delete('/:pid', roleAuth(['admin']), productsController.deleteProduct);
router.put('/:pid', roleAuth(['admin']), productsController.updateProduct);
router.get('/detail/:pid',  viewsController.renderProductDetail);

export default router;