import jwt from 'jsonwebtoken';
import Env from '../../config/Env.js';
import User from '../Models/User.js';
import Hash from '../Services/Hash.js';
import Mail from '../Services/MailService.js';

export default class AuthController {
   static async login(request, response) {
      const { email, password } = request.body;

      try {
         const [user] = await User.where({ email: email.toLowerCase() });

         if (!user)
            return response.status(403).send('incorrect email or password');

         const verifyPassword = await Hash.verify(user.password, password);

         if (!verifyPassword)
            return response.status(403).send('incorrect email or password');

         if (!Boolean(user.verified)) {
            return response.redirect('/sendVerification?' + `id=${user.id}`);
         }

         delete user.password;

         request.session.user = user;
         request.session.save();

         response.json(user);
      } catch (error) {
         console.log(error);
         response.sendStatus(500);
      }
   }

   /**
    * POST /users
    */
   static async register(request, response) {
      const { first_name, password, email } = request.body;
      try {
         const [emailExists] = await User.where({ email: email.toLowerCase() });
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

         delete user.password;

         const query = `id=${id}`;

         response.redirect('/sendVerification?' + query);
      } catch (error) {
         console.log(error);
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

   static async sendVerfication(request, response) {
      const { id } = request.query;
      const code = Math.floor(1000 + Math.random() * 9000);
      request.session.verification = { code, id };
      const [user] = await User.find(id);

      if (!user) return response.status(400).send('User not found');

      try {
         await Mail.verificationMail(user, code);
      } catch (error) {
         console.log(error);
         return response.status(500).send('Internal Server Error');
      }

      response.send({ id: user.id, email: user.email, verified: false });
   }

   static async verify(request, response) {
      const code = request.body.code;

      if (+code === +request.session.verification.code) {
         const [user] = await User.find(request.session.verification.id);
         user.verified = 1;

         try {
            await User.update(
               {
                  first_name: user.first_name,
                  email: user.email,
                  password: user.password,
                  verified: user.verified,
               },
               request.session.verification.id
            );
         } catch (error) {
            console.log(error);
            return response.sendStatus(500);
         }

         delete request.session.verification;

         request.session.user = user;
         request.session.save();

         delete user.password;

         return response.send(user);
      } else {
         return response.status(403).send('Incorrect code');
      }
   }
}
