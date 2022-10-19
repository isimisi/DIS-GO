import { loadFromLocalStorage } from './localStorage';

export const baseUrl =
   window.location.hostname === '134.122.73.248'
      ? 'http://159.89.8.171'
      : 'http://localhost:3333';

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
