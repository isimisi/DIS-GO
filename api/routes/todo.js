import express from 'express';
import TodoController from '../App/Controllers/TodoController.js';
import authToken from '../App/Middleware/authToken.js';

const todoRouter = express.Router();

todoRouter.get('/', authToken, TodoController.index);
todoRouter.post('/', authToken, TodoController.create);

todoRouter.get('/:id', authToken, TodoController.show);
todoRouter.put('/:id', authToken, TodoController.update);
todoRouter.delete('/:id', authToken, TodoController.remove);

export default todoRouter;
