import {Router} from 'express';
import usersController from "../controllers/users.controller.js";
//import { passportCall } from '../passport/passportCall.js';


const router = Router();

router.get('/', usersController.getUsers);
router.get('/:uid', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/profile', usersController.updateUserProfile);
router.delete('/:uid', usersController.deleteUser);

export default router;
