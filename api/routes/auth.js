import express from 'express';
import AuthController from '../App/Controllers/AuthController.js';
import authToken from '../App/Middleware/authToken.js';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/logout', authToken, AuthController.logout);
authRouter.get('/meta', authToken, AuthController.meta);
authRouter.post('/verification', AuthController.verify);

export default authRouter;
