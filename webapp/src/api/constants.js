import { loadFromLocalStorage } from "./localStorage";

export const baseUrl =
   window.location.hostname === 'nginx' ? 'nginx' : 'http://localhost:3333';


export const getToken = (user) => {
   const meta = user && user.meta;
   if (meta) {
      return meta.accessToken;
   }
   const { token } = loadFromLocalStorage() || {};
   return token || '';
};

export const authHeader = (user) => ({
   headers: {
      Authorization: `Bearer ${getToken(user)}`,
   },
});
