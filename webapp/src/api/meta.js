import axios from 'axios';
import { baseUrl } from './constants';

export default async function meta() {
   const url = `${baseUrl}/meta/`;

   const { data: user } = await axios.get(url, {
      withCredentials: true,
   });
   return user;
}
