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
         response.json({ accessToken });
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
         user.meta = { accessToken };
         response.json(user);
      } catch (error) {
         response.status(500).send(error);
      }
   }
}
