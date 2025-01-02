import { Router } from 'express';
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';
import uploader from '../services/uploader.js';
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', passportCall(['current', 'jwt']), roleAuth(['admin']), uploader.array('thumbnail', 3), productsController.createProduct);
router.delete('/:pid', passportCall(['current', 'jwt']), roleAuth(['admin']), productsController.deleteProduct);
router.put('/:pid', passportCall(['current', 'jwt']), roleAuth(['admin']), productsController.updateProduct);
router.get('/detail/:pid',  viewsController.renderProductDetail);

export default router;