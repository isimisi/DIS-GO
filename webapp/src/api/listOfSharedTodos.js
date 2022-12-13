import axios from 'axios';
import { baseUrl } from './constants';

axios.defaults.withCredentials = true;

export async function fetchTodoLists() {
   const url = `${baseUrl}/todolist`;
   const { data } = await axios.get(url);
   return data;
}

export async function searchMail(searchTerm) {
   const url = `${baseUrl}/todolist/search?q=${searchTerm}`;
   const { data } = await axios.get(url);
   return data;
}

export async function createTodoList(title, users) {
   const url = `${baseUrl}/todolist`;
   const body = { title, users };
   const { data } = await axios.post(url, body);
   return data;
}
