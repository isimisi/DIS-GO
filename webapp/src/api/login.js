import axios from 'axios';
import { baseUrl } from './constants';

export async function login(data) {
   const url = `${baseUrl}/login/`;
   const body = data;

   const { data: user } = await axios.post(url, body, {
      withCredentials: true,
   });
   return user;
}

export async function logout() {
   const url = `${baseUrl}/logout/`;

   const { data: token } = await axios.post(
      url,
      {},
      {
         withCredentials: true,
      }
   );
   return token;
}
