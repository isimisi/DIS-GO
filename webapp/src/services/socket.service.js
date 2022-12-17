import io from 'socket.io-client';
import { baseUrl } from '../api/constants';

let socket = null;

export function initiateConnection(token, list_id) {
   if (token) {
      socket = io.connect(`${baseUrl}/socketTodos`, {
         auth: {
            token,
         },
      });

      if (socket) {
         socket.connect();
         socket.emit('join-list', { list_id });
      }
   }
}

export function disconnect() {
   if (socket) {
      socket.off('checked');
      socket.off('deleted');
      socket.off('created');
      socket.off('joined-list');
      socket.off('connected');
      socket.off('disconnect');
      socket.disconnect();
   }
}

export function addItems(data) {
   if (socket) {
      socket.emit('create', data);
   }
}
export function removeItem(id, list_id) {
   if (socket) {
      socket.emit('delete', { id, list_id });
   }
}
export function checkItem(id, is_done, list_id) {
   if (socket) {
      socket.emit('check', { id, is_done, list_id });
   }
}

export const OnAddItems = (cb) => {
   if (socket) {
      socket.on('created', (data) => cb(data));
   }
};

export const OnRemoveItem = (cb) => {
   if (socket) {
      socket.on('deleted', ({ id }) => cb(id));
   }
};

export const OnCheckItem = (cb) => {
   if (socket) {
      socket.on('checked', (todo) => {
         return cb(todo);
      });
   }
};

export const OnError = (cb) => {
   if (socket) {
      socket.on('error', (error) => cb(error));
   }
};

export const OnConnectError = (cb) => {
   if (socket) {
      socket.on('connect_error', (err) => cb(err));
   }
};
