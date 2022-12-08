import express from 'express';
import TodoController from '../App/Controllers/TodoController.js';
import authPath from '../App/Middleware/authPath.js';

const todoRouter = express.Router();

todoRouter.get('/', authPath, TodoController.index);
todoRouter.post('/', authPath, TodoController.create);

todoRouter.get('/:id', authPath, TodoController.show);
todoRouter.put('/:id', authPath, TodoController.update);
todoRouter.delete('/:id', authPath, TodoController.remove);

export default todoRouter;
