import { Router } from 'express';
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.get('/', roleAuth(['admin']), cartsController.getCarts); //Solo admin puede ver todos los carritos. 
router.get('/:cid', passportCall('current'), roleAuth(['user']), cartsController.getCartById); // Solo el usuario que tiene el carrito puede verlo.
router.post('/', passportCall('current'), roleAuth(['user']), cartsController.createCart); // Solo el usuario que tiene el carrito puede crearlo.
router.post('/:cid/product/:pid', passportCall('current'), roleAuth(['user']), cartsController.addProductToCart);// Solo el usuario que tiene el carrito puede agregar productos al carrito.
router.delete('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.deleteProductCart);// Solo el usuario que tiene el carrito puede eliminar productos del carrito.
router.put('/:cid/products', passportCall('current'), roleAuth(['user']), cartsController.cleanToCart);// Solo el usuario que tiene el carrito puede vaciar el carrito.
router.delete('/:cid', passportCall('current'), roleAuth(['user']), cartsController.deleteCart);// Solo el usuario que tiene el carrito puede eliminarlo.
router.put('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.updateProductQuantity);// Solo el usuario que tiene el carrito puede actualizar la cantidad de un producto en el carrito.
router.post('/:cid/purchase', passportCall('current'), roleAuth(['user']), cartsController.purchaseCart);// Solo el usuario que tiene el carrito puede comprarlo.


export default router;