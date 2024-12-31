import {Router} from 'express';
import cartsController from "../controllers/carts.controller.js";
//import { passportCall } from '../passport/passportCall.js';

const router = Router();

router.get('/', cartsController.getCarts);
router.get('/:cid', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.post('/:cid/product/:pid', cartsController.addProductToCart);
router.delete('/:cid/products/:pid', cartsController.deleteProductCart);
router.put('/:cid/products', cartsController.cleanToCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);
router.post('/:cid/purchase', cartsController.purchaseCart);

// passportCall('jwtCookies')
/*
router.get('/', passportCall('jwtCookies'), cartsController.getCart);
router.post('/add', passportCall('jwtCookies'), cartsController.addToCart);
router.delete('/remove', passportCall('jwtCookies'), cartsController.removeFromCart);
*/

export default router;