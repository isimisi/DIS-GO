export default function authToken(request, response, next) {
   const user = request.session.user;

   console.log(request.session);

   if (!user) return response.sendStatus(401);

   if (!Boolean(user.verified))
      return response.status(401).send('User needs verification');

   request.user = user;

   next();
}
