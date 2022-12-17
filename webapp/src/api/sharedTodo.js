import axios from 'axios';
import { baseUrl } from './constants';
axios.defaults.withCredentials = true;

export async function fetchTodos(id) {
   const url = `${baseUrl}/todos/${id}`;

   const { data: todos } = await axios.get(url);
   return todos;
}

export async function updateTodo({ id, todo_text, is_done }) {
   const url = `${baseUrl}/personaltodos/${id}`;
   const data = { todo_text, is_done };

   const { data: todo } = await axios.put(url, data);
   return todo;
}

export async function createTodo(todo_text) {
   const url = `${baseUrl}/personaltodos`;
   const data = { todo_text };

   const { data: todo } = await axios.post(url, data);
   return todo;
}

export async function removeTodo(id) {
   const url = `${baseUrl}/personaltodos/${id}`;

   const { data: successMessage } = await axios.delete(url);
   return successMessage;
}
