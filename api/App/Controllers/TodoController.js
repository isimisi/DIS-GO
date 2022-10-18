import Todo from '../Models/Todo.js';

export default class TodoController {
   static async index(request, response) {
      const user = request.user;
      try {
         const todos = await Todo.allUserTodos(user.id);
         response.json(todos);
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
      const user = request.user;

      try {
         const id = await Todo.create({
            user_id: user.id,
            todo_text,
            is_done: 0,
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
