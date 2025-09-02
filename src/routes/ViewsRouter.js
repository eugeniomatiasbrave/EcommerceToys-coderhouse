import {Router} from 'express';
import sessionsController from "../controllers/sessions.controller.js";
import viewsController from "../controllers/views.controller.js";
import { passportCall } from '../passport/passportCall.js';
import { roleAuth } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', passportCall('current'), viewsController.renderHome);
router.get('/register', passportCall('current'), viewsController.renderRegister);
router.get('/login', passportCall('current'), viewsController.renderLogin);
router.get('/logout', passportCall('current'), sessionsController.logout);
router.get('/profile', passportCall('current'), viewsController.renderProfile);
router.get('/products', passportCall('current'), roleAuth(['user','admin']),viewsController.renderProducts);
router.get("/realtimeproducts", passportCall('current'), roleAuth(['admin']), viewsController.renderRealTimeProducts);
router.get('/carts', passportCall('current'), roleAuth(['user']),viewsController.renderCartById);
router.get('/detail/:pid', passportCall('current'),viewsController.renderProductDetail);
router.get('/ticket', passportCall('current'), roleAuth(['user']), viewsController.renderTicket);

export default router;
       
        
        
    
        
  