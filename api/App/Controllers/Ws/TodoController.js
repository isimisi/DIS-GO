import Todo from '#App/Models/Todo';

class TodoSocket {
   constructor(socket) {
      this.socket = socket;
      this.io = socket.io;
   }

   main() {
      this.io.of('/socketTodos').on('connection', (socket) => {
         console.log('test');
         this.joinList(socket);
         this.create(socket);
         this.delete(socket);
         socket.on('disconnect', (reason) => {
            console.log('dc');
         });
      });
   }

   joinList(socket) {
      socket.on('join-list', ({ list_id }) => {
         console.log(list_id);
         socket.join(this.room(list_id));
         socket.emit('test', this.room(list_id));
         socket
            .to(this.room(list_id))
            .emit('joined-list', 'succesfully joined todo list');
      });
   }

   create(socket) {
      socket.on('create', async ({ list_id, todo_text }) => {
         try {
            const id = await Todo.create({ list_id, todo_text });
            const [todo] = await Todo.find(id);
            socket.to(this.room(list_id)).emit('created', todo);
         } catch (error) {
            socket.emit('error', error);
         }
      });
   }

   delete(socket) {
      socket.on('delete', async ({ id, list_id }) => {
         try {
            await Todo.remove(id);
            socket.to(this.room(list_id)).emit('deleted', { id });
         } catch (error) {
            socket.emit('error', error);
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
