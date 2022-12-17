import Todo from '#App/Models/Todo';
import jsonwebtoken from 'jsonwebtoken';
import JWT from '#App/Services/JWT';

export default class TodoController {
   static async index(request, response) {
      const { id: list_id } = request.params;
      let token = null;

      try {
         token = await JWT.sign(request.user);
      } catch (error) {
         return response.status(501).send(error.message);
      }

      try {
         const todos = await Todo.allListTodos(list_id);
         response.json({ todos, token });
      } catch (error) {
         console.log(error);
         response.status(501).send(error);
      }
   }

   static async show(request, response) {
      const { id } = request.params;

      try {
         const [todo] = await Todo.find(id);
         response.json(todo);
      } catch (error) {
         response.status(501).json(error);
      }
   }

   static async create(request, response) {
      const { todo_text } = request.body;
      todoList = request.todoList;
      try {
         const id = await Todo.create({
            list_id: todoList.id,
            todo_text,
         });

         const [todo] = await Todo.find(id);

         response.json(todo);
      } catch (error) {
         response.status(501).send(error);
      }
   }

   static async update(request, response) {
      const { id } = request.params;
      const { todo_text, is_done } = request.body;

      try {
         const [todo] = await Todo.find(id);

         todo.todo_text = todo_text || todo.todo_text;
         todo.is_done = is_done != undefined ? is_done : todo.is_done;

         await Todo.update(todo, id);
         response.json(todo);
      } catch (error) {
         console.log(error);
         response.status(501).json(error);
      }
   }

   static async remove(request, response) {
      const { id } = request.params;

      try {
         await Todo.remove(id);
         response.json({ message: 'todo deleted' });
      } catch (error) {
         response.status(501).json(error);
      }
   }
}
