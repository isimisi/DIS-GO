import axios from 'axios';
import { baseUrl } from './constants';
import { authHeader } from './constants';

export async function fetchTodos() {
   const url = `${baseUrl}/todos/`;
   const header = authHeader();
   try {
      const { data: todos } = await axios.get(url, header);
      return todos;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}

export async function updateTodo({ id, todo_text, is_done }) {
   const url = `${baseUrl}/todos/${id}`;
   const data = { todo_text, is_done };
   const header = authHeader();
   try {
      const { data: todo } = await axios.put(url, data, header);
      return todo;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}

export async function createTodo(todo_text) {
   const url = `${baseUrl}/todos/`;
   const data = { todo_text };
   const header = authHeader();
   try {
      const { data: todo } = await axios.post(url, data, header);
      return todo;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}

export async function removeTodo(id) {
   const url = `${baseUrl}/todos/${id}`;
   const header = authHeader();
   try {
      const { data: successMessage } = await axios.delete(url, header);
      return successMessage;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}
