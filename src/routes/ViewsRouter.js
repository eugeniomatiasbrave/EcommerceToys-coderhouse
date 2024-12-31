
import {Router} from 'express';
import sessionsController from "../controllers/sessions.controller.js";
import viewsController from "../controllers/views.controller.js";
import { passportCall } from '../passport/passportCall.js';

const router = Router();

router.get('/', viewsController.renderHome);
router.get('/register',viewsController.renderRegister);
router.get('/login', viewsController.renderLogin);
router.get('/logout', sessionsController.logout);
router.get('/profile', passportCall('current'), viewsController.renderProfile);
router.get('/products', viewsController.renderProducts);
router.get("/realtimeproducts", viewsController.renderRealTimeProducts);
router.get('/carts', viewsController.renderCartById);
router.get('/detail/:pid', viewsController.renderProductDetail);
router.get('/ticket', viewsController.renderTicket);


export default router;
       
        
        
    
        
  