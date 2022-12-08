import axios from 'axios';
import { baseUrl } from './constants';

export async function registerUser(data) {
   const url = `${baseUrl}/register/`;
   const body = data;

   const { data: user } = await axios.post(url, body, {
      withCredentials: true,
   });
   return user;
}

export async function verification(code) {
   const url = `${baseUrl}/verification/`;
   const body = { code };

   const { data } = await axios.post(url, body, {
      withCredentials: true,
   });

   return data;
}

export async function sendVerification(id) {
   const url = `${baseUrl}/sendVerification?id=${id}`;
   await axios.get(url, { withCredentials: true });
}
