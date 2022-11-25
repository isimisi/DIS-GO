import jwt from 'jsonwebtoken';
import Env from '../../config/Env.js';
import User from '../Models/User.js';
import Hash from '../Services/Hash.js';

export default class AuthController {
   static async login(request, response) {
      const { email, password } = request.body;

      try {
         const [user] = await User.where('email = ?', email.toLowerCase());
         if (!user)
            return response.status(403).send('incorrect email or password');
         const verifyPassword = await Hash.verify(user.password, password);

         if (!verifyPassword)
            return response.status(403).send('incorrect email or password');

         const access_token_secret = Env.get('ACCESS_TOKEN_SECRET');

         const accessToken = jwt.sign(
            { email: user.email },
            access_token_secret
         );

         request.session.authorization = 'Bearer ' + accessToken;

         delete user.password;

         response.json(user);
      } catch (error) {
         response.sendStatus(501);
      }
   }

   /**
    * POST /users
    */
   static async register(request, response) {
      const { first_name, password, email } = request.body;
      try {
         const [emailExists] = await User.where(
            'email = ?',
            email.toLowerCase()
         );
         if (emailExists)
            return response
               .status(401)
               .json({ message: 'Email already in use' });

         const id = await User.create({
            first_name,
            password,
            email: email.toLowerCase(),
         });
         const [user] = await User.find(id);
         const access_token_secret = Env.get('ACCESS_TOKEN_SECRET');

         const accessToken = jwt.sign(
            { email: user.email },
            access_token_secret
         );
         delete user.password;
         request.session.authorization = 'Bearer ' + accessToken;
         response.json(user);
      } catch (error) {
         response.status(500).send(error);
      }
   }

   static async logout(request, response) {
      try {
         request.session.destroy();
         response.send('ok');
      } catch (error) {
         response.status(500).send(error);
      }
   }

   static async meta(request, response) {
      if (!request.user)
         return response.status(401).send('user needs to login again');
      const user = { ...request.user };
      delete user.password;

      return response.json(user);
   }
}
