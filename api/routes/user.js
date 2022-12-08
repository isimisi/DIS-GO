import express from 'express';
import UserController from '../App/Controllers/UserController.js';
import authPath from '../App/Middleware/authPath.js';

const userRouter = express.Router();

userRouter.get('/:id', authPath, UserController.show);
userRouter.put('/:id', authPath, UserController.update);
userRouter.delete('/:id', authPath, UserController.remove);

export default userRouter;
