import { Router } from 'express';
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.get('/', roleAuth(['admin']), cartsController.getCarts); // endpoint para ver todos los carritos, solo admin puede verlo.
router.get('/:cid', passportCall('current'), roleAuth(['user']), cartsController.getCartById); // endpoint para ver un carrito por id, solo el usuario que tiene el carrito puede verlo.
router.post('/', passportCall('current'), roleAuth(['user']), cartsController.createCart); // endpoint para crear un carrito, solo el usuario que tiene el carrito puede crearlo.
router.post('/:cid/product/:pid', passportCall('current'), roleAuth(['user']), cartsController.addProductToCart);// endpoint para agregar un producto al carrito, solo el usuario que tiene el carrito puede agregar productos al carrito.
router.delete('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.deleteProductCart);// endpoint para eliminar un producto del carrito, solo el usuario que tiene el carrito puede eliminar productos del carrito.
router.put('/:cid/products', passportCall('current'), roleAuth(['user']), cartsController.cleanToCart);// endpoint para vaciar el carrito, solo el usuario que tiene el carrito puede vaciarlo.
router.delete('/:cid', passportCall('current'), roleAuth(['user']), cartsController.deleteCart);// endpoint para eliminar el carrito, solo el usuario que tiene el carrito puede eliminarlo.
router.put('/:cid/products/:pid', passportCall('current'), roleAuth(['user']), cartsController.updateProductQuantity);// endpoint para actualizar la cantidad de un producto en el carrito, solo el usuario que tiene el carrito puede actualizar la cantidad de productos en el carrito.
router.post('/:cid/purchase', passportCall('current'), roleAuth(['user']), cartsController.purchaseCart);// endpoint para comprar el carrito, solo el usuario que tiene el carrito puede comprarlo.


export default router;