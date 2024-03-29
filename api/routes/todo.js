import express from 'express';
import TodoController from '../App/Controllers/TodoController.js';
import auth from '../App/Middleware/auth.js';

const todoRouter = express.Router();

todoRouter.post('/', auth, TodoController.create);

todoRouter.get('/:id', auth, TodoController.index);
todoRouter.get('/show/:id', auth, TodoController.show);
todoRouter.put('/:id', auth, TodoController.update);
todoRouter.delete('/:id', auth, TodoController.remove);

export default todoRouter;
