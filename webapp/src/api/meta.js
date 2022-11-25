import axios from 'axios';
import { baseUrl } from './constants';

export default async function meta() {
   const url = `${baseUrl}/meta/`;
   try {
      const { data: user } = await axios.get(url, {
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