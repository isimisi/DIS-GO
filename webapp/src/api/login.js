import axios from 'axios';
import { baseUrl } from './constants';

export async function login(data) {
   const url = `${baseUrl}/login/`;
   const body = data;
   try {
      const { data: token } = await axios.post(url, body, {
         withCredentials: true,
      });
      return token;
   } catch (error) {
      console.log(error);
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}

export async function logout() {
   const url = `${baseUrl}/logout/`;

   try {
      const { data: token } = await axios.post(url, {}, {
         withCredentials: true,
      });
      return token;
   } catch (error) {
      console.log(error);
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}
