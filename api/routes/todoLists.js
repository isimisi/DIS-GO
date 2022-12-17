import express from 'express';
import TodoListController from '../App/Controllers/TodoListController.js';
import auth from '../App/Middleware/auth.js';
import todoListPath from '../App/Middleware/todolistPath.js';

const todoListsRouter = express.Router();

todoListsRouter.post('/', auth, TodoListController.create);
todoListsRouter.get('/search', auth, TodoListController.searchUsers);

todoListsRouter.get('/', auth, TodoListController.index);
todoListsRouter.get('/:id', auth, TodoListController.show);
todoListsRouter.put('/:id', [auth, todoListPath], TodoListController.update);
todoListsRouter.delete('/:id', [auth, todoListPath], TodoListController.remove);
todoListsRouter.post(
   '/:id/addUsers',
   [auth, todoListPath],
   TodoListController.addUsersToList
);

export default todoListsRouter;
