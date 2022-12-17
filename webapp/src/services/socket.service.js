import io from 'socket.io-client';
import { showErrorMessage } from '../../helpers/exceptionUtils';
import { baseUrl } from '../../api/constants';

let socket = null;

export function initiateConnection(token) {
   socket = io.connect(`${baseUrl}/socketTodos`, {
      auth: {
         token,
      },
   });

   if (socket) {
      socket.connect();
   }
}

export function onDisconnect() {}

export function disconnect() {
   if (!socket) return;
   socket.off('checked');
   socket.off('deleted');
   socket.off('created');
   socket.off('joined-list');
   socket.off('connected');
   socket.off('disconnect');
   socket.disconnect();
}

export function addItems(data) {
   if (!socket) return;

   socket.emit('create', data);
}
export function removeItem(id, list_id) {
   if (!socket) return;

   socket.emit('delete', { id, list_id });
}
export function checkItem(id, is_done, list_id) {
   if (!socket) return;

   socket.emit('check', { id, is_done, list_id });
}

export function OnAddItems(setItems) {
   if (!socket) return;

   socket.on('created', (data) =>
      setItems((prevState) => [...prevState, data])
   );
}

export function OnRemoveItem(setItems) {
   if (!socket) return;

   socket.on('deleted', ({ id }) =>
      setItems((prevState) => {
         const copy = [...prevState];
         const index = copy.findIndex((item) => item.id === id);
         copy.splice(index, 1);
         return copy;
      })
   );
}

export function OnCheckItem(setItems) {
   if (!socket) return;

   socket.on('checked', (todo) => {
      setItems((prevState) => {
         const copy = [...prevState];
         const foundTodo = copy.find((item) => item.id === todo.id);
         foundTodo.is_done = todo.is_done;
         return copy;
      });
   });
}

export function OnError(pages, goToPage) {
   if (!socket) return;

   socket.on('error', () => {
      showErrorMessage('Error', 'List was deleted');
      goToPage(pages.listOfSharedTodos);
   });
}
