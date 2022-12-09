import TodoList from '../Models/TodoList.js';
import UserTodoList from '../Models/UserTodoList.js';

export default class TodoListController {
   static async index(request, response) {
      const user = request.user;

      try {
         const todoLists = await TodoList.findAllUserLists(user.id);
         return response.json(todoLists);
      } catch (error) {
         return response.sendStatus(500);
      }
   }

   static async show(request, response) {
      const { list_id } = request.params;

      try {
         const [todoList] = await TodoList.find(list_id);
         request.session.todoList = todoList;

         return response.json(todoList);
      } catch (error) {
         return response.sendStatus(500);
      }
   }

   static async create(request, response) {
      const user = request.user;
      const { title } = request.body;

      try {
         const list_id = await TodoList.create(user.id, title);
         return response.json({ list_id });
      } catch (error) {
         return response.sendStatus(500);
      }
   }

   static async addUsersToList(request, response) {
      const users = request.body.users;
      const todoList = request.todoList;

      try {
         for (let i = 0; i < users.length; i++) {
            const user = users[i];
            
            await UserTodoList.create({
               user_id: user.id,
               list_id: todoList.id,
            });
         }
         response.send('users added to list');
      } catch (error) {

      }
   }

   static async update(request, response) {
      const todoList = request.todoList;
      const { title } = request.todoList;

      const updatedList = { ...todoList, title };
      try {
         await TodoList.update(updatedList, todoList.id);
         request.session.todoList = updatedList;
         return response.json(updatedList);
      } catch (error) {
         return response.sendStatus(500);
      }
   }

   static async remove(request, response) {
      const todoList = request.todoList;

      try {
         await TodoList.remove(todoList.id);
         return response.send('List removed');
      } catch (error) {
         return response.sendStatus(500);
      }
   }
}
