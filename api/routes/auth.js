import express from 'express';
import AuthController from '../App/Controllers/AuthController.js';
import auth from '../App/Middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/logout', auth, AuthController.logout);
authRouter.get('/meta', auth, AuthController.meta);
authRouter.post('/verification', AuthController.verify);
authRouter.get('/sendVerification', AuthController.sendVerfication);

export default authRouter;
