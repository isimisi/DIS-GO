import axios from 'axios';
import { baseUrl } from './constants';

export async function registerUser(data) {
   const url = `${baseUrl}/register/`;
   const body = data;
   try {
      const { data: user } = await axios.post(url, body, {
         withCredentials: true,
      });
      return user;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}

export function verification(code) {
   const url = `${baseUrl}/verification/`;
   const body = { code };

   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await axios.post(url, body, {
            withCredentials: true,
         });
         resolve(data);
      } catch (error) {
         reject({
            error: {
               message: error.response.data,
            },
         });
      }
   });
}
