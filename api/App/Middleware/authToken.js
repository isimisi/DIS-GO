import jwt from 'jsonwebtoken';
import Env from '../../config/Env.js';
import User from '../Models/User.js';

export default function authToken(request, response, next) {
   const authHeader = request.headers['authorization'];
   const [, token] = authHeader && authHeader.split(' ');
   if (token == null) return response.sendStatus(401);
   return new Promise((resolve, reject) => {
      jwt.verify(token, Env.get('ACCESS_TOKEN_SECRET'), async (error, data) => {
         if (error) return reject(error);
         try {
            const [user] = await User.where('email = ?', data.email);
            request.user = user;
            resolve();
         } catch (error) {
            reject(error);
         }
      });
   })
      .then(() => next())
      .catch(() => response.sendStatus(403));
}
