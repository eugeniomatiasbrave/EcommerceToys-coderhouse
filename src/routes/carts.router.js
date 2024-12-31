import {Router} from 'express';
import cartsController from "../controllers/carts.controller.js";
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', roleAuth(['admin']), cartsController.getCarts);
router.get('/:cid', passportCall('current'), roleAuth(['user']), cartsController.getCartById);
router.post('/', passportCall('current'), roleAuth(['user']), cartsController.createCart);
router.post('/:cid/product/:pid', passportCall('current'), roleAuth(['user']), cartsController.addProductToCart);
router.delete('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.deleteProductCart);
router.put('/:cid/products', passportCall('current'), roleAuth(['user']), cartsController.cleanToCart);
router.put('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.updateProductQuantity);
router.post('/:cid/purchase', passportCall('current'), roleAuth(['user']), cartsController.purchaseCart);


export default router;