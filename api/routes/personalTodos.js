import express from 'express';
import PersonalTodoController from '../App/Controllers/PersonalTodoController.js';
import auth from '../App/Middleware/auth.js';

const personalTodoRouter = express.Router();

personalTodoRouter.get('/', auth, PersonalTodoController.index);
personalTodoRouter.post('/', auth, PersonalTodoController.create);

personalTodoRouter.get('/:id', auth, PersonalTodoController.show);
personalTodoRouter.put('/:id', auth, PersonalTodoController.update);
personalTodoRouter.delete('/:id', auth, PersonalTodoController.remove);

export default personalTodoRouter;
