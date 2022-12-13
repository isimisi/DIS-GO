import Todo from './App/Models/Todo.js';
import TodoList from './App/Models/TodoList.js';
import User from './App/Models/User.js';
import database from './database/index.js';

(async () => {
   try {
      console.log(
         await User.create({
            first_name: 'test',
            password: 'test',
            email: 'is@test.com',
         })
      );
   } catch (error) {
      console.log(error);
   }
})();
