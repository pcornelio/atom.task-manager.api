import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Rutas de usuarios
router.post('/', userController.createUser.bind(userController));
router.post('/login', userController.login.bind(userController));

export default router; 