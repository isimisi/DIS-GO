import express from 'express';
import AuthController from '../App/Controllers/AuthController.js';
import authPath from '../App/Middleware/authPath.js';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/logout', authPath, AuthController.logout);
authRouter.get('/meta', authPath, AuthController.meta);
authRouter.post('/verification', AuthController.verify);
authRouter.get('/sendVerification', AuthController.sendVerfication);

export default authRouter;
