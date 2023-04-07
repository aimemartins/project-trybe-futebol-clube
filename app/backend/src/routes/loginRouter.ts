import { Router } from 'express';
import UserController from '../controllers/UserController';
import verifyRequiredFields from '../middlewares/verifyRequiredFields';
import UserValidations from '../validations/user/UserValidations';
import UserService from '../services/UserService';

const router = Router();

const userValidations = new UserValidations();
const userService = new UserService(userValidations);
const userController = new UserController(userService);

// router.post('/login', (req, res) => res.json({ message: 'rota login funcionando' }));

router.post('/login', verifyRequiredFields('login'), userController.login.bind(userController));

export default router;
