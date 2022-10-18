import express from 'express';
import UserController from '../App/Controllers/UserController.js';
import authToken from '../App/Middleware/authToken.js';

const userRouter = express.Router();

userRouter.get('/', UserController.index)
userRouter.get('/:id', authToken, UserController.show);
userRouter.put('/:id', authToken, UserController.update);
userRouter.delete('/:id', authToken, UserController.remove);

export default userRouter;
