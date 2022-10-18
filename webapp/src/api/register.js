import axios from 'axios';
import { baseUrl } from './constants';

export default async function registerUser(data) {
   const url = `${baseUrl}/register/`;
   const body = data;
   try {
      const { data: user } = await axios.post(url, body);
      return user;
   } catch (error) {
      console.log(error);
      return {
         error: {
            message: error.response.data,
         },
      };
   }
}
