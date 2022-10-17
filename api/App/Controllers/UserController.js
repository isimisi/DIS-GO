import User from '../Models/User.js';

export default class UserController {
   /**
    * GET /users
    */
   static async index(request, response) {
      try {
         const users = await User.all();
         response.json(users);
      } catch (error) {
         response.status(400).send('error');
      }
   }

   /**
    * GET /users/:id
    */
   static async show(request, response) {
      try {
         const user = request.user;
         response.json(user);
      } catch (error) {}
   }

   /**
    * POST /users
    */
   static async create(request, response) {
      const { first_name, password, email } = request.body;
      try {
         const id = await User.create({ first_name, password, email });
         const [user] = await User.find(id);
         response.json(user);
      } catch (error) {
         console.log(error);
         response.status(400).send(error);
      }
   }

   /**
    * PUT /users/:id
    */
   static async update(request, response) {
      const { first_name, password, email } = request.body;

      try {
         const user = request.user;

         user.first_name = first_name || user.first_name;
         user.password = password || user.password;
         user.email = email || user.email;

         await User.update(user, id);

         response.json(user);
      } catch (error) {
         console.log(error);
         response.status(400).send(error);
      }
   }

   /**
    * DELETE /users/:id
    */
   static async remove(request, response) {
      const user = request.user;
      try {
         await User.remove(user.id);
         response.send('user deleted');
      } catch (error) {
         response.status(400).send('error');
      }
   }
}
