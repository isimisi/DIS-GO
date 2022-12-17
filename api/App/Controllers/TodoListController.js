import TodoList from '../Models/TodoList.js';
import User from '../Models/User.js';
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
      const { id } = request.params;

      try {
         const [todoList] = await TodoList.find(id);

         return response.json(todoList);
      } catch (error) {
         return response.sendStatus(500);
      }
   }

   static async create(request, response) {
      const user = request.user;
      const { title, users } = request.body;

      try {
         const list_id = await TodoList.create(user.id, title);

         if (users?.length > 0) {
            for (let i = 0; i < users.length; i++) {
               const email = users[i];

               const [_user] = await User.where({ email });

               await UserTodoList.create({
                  user_id: _user.id,
                  list_id,
               });
            }
         }

         return response.json({ list_id });
      } catch (error) {
         console.log(error);
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
      } catch (error) {}
   }

   static async searchUsers(request, response) {
      const { q: searchTerm } = request.query;
      const user = request.user;

      try {
         const emails = await User.searchForEmails(searchTerm, user.id);
         response.json(emails);
      } catch (error) {
         console.log(error);
      }
   }

   static async update(request, response) {
      const todoList = request.todoList;
      const { title } = request.todoList;

      todoList.title = title;
      try {
         await TodoList.update(updatedList, todoList.id);
         request.session.todoList = todoList;
         return response.json(todoList);
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
