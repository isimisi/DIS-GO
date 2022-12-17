import JWT from '#App/Services/JWT';

export default async function socketAuth(socket, next) {
   const token = socket.handshake.auth.token;

   try {
      const user = await JWT.verify(token);
      socket.user = user;
      next();
   } catch (error) {
      return next(new Error('Unauthorized'));
   }
}
