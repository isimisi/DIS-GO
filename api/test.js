import Todo from './App/Models/Todo.js';
import TodoList from './App/Models/TodoList.js';
import User from './App/Models/User.js';

(async () => {
   try {
      console.log(await TodoList.remove(1));
   } catch (error) {
      console.log(error);
   }
})();
