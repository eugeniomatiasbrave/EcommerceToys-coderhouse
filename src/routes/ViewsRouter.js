import {Router} from 'express';
import sessionsController from "../controllers/sessions.controller.js";
import viewsController from "../controllers/views.controller.js";
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', viewsController.renderHome);
router.get('/register', viewsController.renderRegister);
router.get('/login', viewsController.renderLogin);
router.get('/logout', sessionsController.logout);
router.get('/profile', passportCall('current'), viewsController.renderProfile);
router.get('/products', viewsController.renderProducts);
router.get("/realtimeproducts", passportCall('current'), roleAuth(['admin']), viewsController.renderRealTimeProducts);
router.get('/carts', passportCall('current'), viewsController.renderCartById);
router.get('/detail/:pid', viewsController.renderProductDetail);
router.get('/ticket', passportCall('current'), viewsController.renderTicket);

export default router;
       
        
        
    
        
  