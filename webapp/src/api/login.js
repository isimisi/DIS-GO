import axios from 'axios';
import { baseUrl } from './constants';

export default async function login(data) {
   const url = `${baseUrl}/login/`;
   const body = data;
   try {
      const { data: token } = await axios.post(url, body);
      return token;
   } catch (error) {
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}
