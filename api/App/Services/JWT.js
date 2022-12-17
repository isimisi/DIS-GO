import jwt from 'jsonwebtoken';
import Env from '#config/Env';

export default class JWT {
   static secret = Env.get('ACCESS_TOKEN_SECRET');

   /**
    *
    * @param {any} data
    * @returns {Promise<string>}
    */
   static sign(data) {
      return new Promise((resolve, reject) => {
         jwt.sign(data, this.secret, (error, encoded) => {
            if (error) return reject(error);
            resolve(encoded);
         });
      });
   }

   /**
    *
    * @param {string} token
    * @returns {Promise<any>}
    */
   static verify(token) {
      return new Promise((resolve, reject) => {
         jwt.verify(token, this.secret, (error, decoded) => {
            if (error) return reject(error);
            resolve(decoded);
         });
      });
   }
}
