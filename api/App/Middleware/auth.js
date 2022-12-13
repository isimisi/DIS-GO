import User from '../Models/User.js';

export default async function authToken(request, response, next) {
   const user = request.session.user;

   if (!user) return response.sendStatus(401);

   try {
      const [dbUser] = await User.where({ email: user.email });

      if (!dbUser) return response.sendStatus(401);
      if (!dbUser.verified) {
         return response.status(401).send('User needs verification');
      }
      delete dbUser.password;
      request.session.user = dbUser;
   } catch (error) {
      console.log(err);
      return response.sendStatus(500);
   }

   request.user = { ...user };

   next();
}
