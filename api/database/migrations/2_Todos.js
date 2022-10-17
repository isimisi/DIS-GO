import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Todos extends DatabaseBuilder {
   static tableName = 'todos';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      user_id: 'INTEGER NOT NULL',
      todo_text: 'TEXT',
      is_done: 'INTEGER NOT NULL',
   };

   static options = ' FOREIGN KEY(user_id) REFERENCES users(id) ';
}
