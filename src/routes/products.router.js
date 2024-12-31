import { Router } from 'express';
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import uploader from '../services/uploader.js';
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', passportCall('current'), productsController.getProductById);
router.post('/', passportCall('current'), roleAuth(['admin']), uploader.array('thumbnail', 3), productsController.createProduct);
router.delete('/:pid', passportCall('current'), roleAuth(['admin']), productsController.deleteProduct);
router.put('/:pid', passportCall('current'), roleAuth(['admin']), productsController.updateProduct);
router.get('/detail/:pid', passportCall('current'), viewsController.renderProductDetail);

export default router;