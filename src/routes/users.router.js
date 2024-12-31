import {Router} from 'express';
import usersController from "../controllers/users.controller.js";

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:uid', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);

export default router;
