import Todo from '#App/Models/Todo';
import TodoList from '#App/Models/TodoList';
import socketAuth from '#App/Middleware/socketAuth';

class TodoSocket {
   constructor(socket) {
      this.socket = socket;
      this.io = socket.io.of('/socketTodos');
   }

   main() {
      this.io.use(socketAuth);

      this.io.on('connection', (socket) => {
         this.joinList(socket);
         this.create(socket);
         this.delete(socket);
         this.check(socket);
         socket.on('disconnect', () => {});
         
      });
   }

   joinList(socket) {
      socket.on('join-list', ({ list_id }) => {
         if (!list_id)
            return this.io
               .to(this.room(list_id))
               .emit('error', 'Oops... something went wrong');

         socket.join(this.room(list_id));

         this.io
            .to(this.room(list_id))
            .emit('joined-list', 'succesfully joined todo list');
      });
   }

   create(socket) {
      socket.on('create', async ({ list_id, todo_text }) => {
         try {
            const [todoList] = await TodoList.find(list_id);

            if (!todoList) throw new Error('todo list was deleted');

            const id = await Todo.create({ list_id, todo_text });
            const [todo] = await Todo.find(id);
            this.io.to(this.room(list_id)).emit('created', todo);
         } catch (error) {
            this.io.to(this.room(list_id)).emit('error', error.message);
         }
      });
   }

   delete(socket) {
      socket.on('delete', async ({ id, list_id }) => {
         try {
            const [todoList] = await TodoList.find(list_id);

            if (!todoList) throw new Error('todo list was deleted');

            await Todo.remove(id);
            this.io.to(this.room(list_id)).emit('deleted', { id });
         } catch (error) {
            this.io.to(this.room(list_id)).emit('error', error.message);
         }
      });
   }

   check(socket) {
      socket.on('check', async ({ id, is_done, list_id }) => {
         try {
            const [todoList] = await TodoList.find(list_id);

            if (!todoList) {
               throw new Error('todo list was deleted');
            }

            const [todo] = await Todo.find(id);
            todo.is_done = is_done;
            await Todo.update(todo, id);
            this.io.to(this.room(list_id)).emit('checked', todo);
         } catch (error) {
            this.io.to(this.room(list_id)).emit('error', error.message);
         }
      });
   }

   room(id) {
      return `todo-${id}`;
   }
}

export default function TodoSocketController(socket) {
   const todoSocket = new TodoSocket(socket);
   todoSocket.main();
}
