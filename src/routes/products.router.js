import { Router } from 'express';
import productsController from "../controllers/products.controller.js";
import viewsController from "../controllers/views.controller.js";
import uploader from '../services/uploader.js';
//import { passportCall } from '../passport/passportCall.js';

const router = Router();

router.get('/', productsController.getProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', uploader.array('thumbnail', 3), productsController.createProduct);
router.delete('/:pid', productsController.deleteProduct);
router.put('/:pid', productsController.updateProduct);
router.get('/detail/:pid', viewsController.renderProductDetail);

// passportCall('jwt')
/*
router.post('/', passportCall('jwt'), productsController.addProduct);
router.put('/:id', passportCall('jwt'), productsController.updateProduct);
router.delete('/:id', passportCall('jwt'), productsController.deleteProduct);
*/

export default router;