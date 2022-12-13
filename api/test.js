import Todo from './App/Models/Todo.js';
import TodoList from './App/Models/TodoList.js';
import User from './App/Models/User.js';
import database from './database/index.js';

(async () => {
   try {
      // console.log(
      //    await User.create({
      //       first_name: 'isaac',
      //       password: 'nadejinn7',
      //       email: 'isaacj.ahmad@gmail.com',
      //    })
      // );
      const [user] = await User.find(1);
      await User.update({ ...user, verified: 1 }, 1);
   } catch (error) {
      console.log(error);
   }
})();
