import Todo from './App/Models/Todo.js';
import TodoList from './App/Models/TodoList.js';
import User from './App/Models/User.js';
import database from './database/index.js';

(async () => {
   try {
      const id1 = await User.create({
         first_name: 'isaac',
         password: 'nadejinn7',
         email: 'isaacj.ahmad@gmail.com',
      });

      const id2 = await User.create({
         first_name: 'isaac',
         password: 'nadejinn7',
         email: 'isaac_jacob_ahmad@hotmail.com',
      });

      const [user1] = await User.find(id1);
      const [user2] = await User.find(id2);

      user1.verified = 1;
      user2.verified = 1;

      await User.update(user1, id1);
      await User.update(user2, id2);
   } catch (error) {
      console.log(error);
   }
})();
