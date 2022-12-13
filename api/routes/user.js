import express from 'express';
import UserController from '../App/Controllers/UserController.js';
import auth from '../App/Middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/:id', auth, UserController.show);
userRouter.put('/:id', auth, UserController.update);
userRouter.delete('/:id', auth, UserController.remove);

export default userRouter;
