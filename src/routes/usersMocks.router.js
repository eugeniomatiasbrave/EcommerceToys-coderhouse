import {Router} from 'express';
import usersMocksController from '../controllers/usersMocks.controller.js';

const router = Router();

router.post('/generateData', usersMocksController.createUser);
router.get('/mockingusers', usersMocksController.getUsers);

export default router;