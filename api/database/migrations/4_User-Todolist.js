import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Todos extends DatabaseBuilder {
   static tableName = 'user_todo_lists';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      user_id: 'INTEGER NOT NULL REFERENCES users(id)',
      list_id: 'INTEGER NOT NULL REFERENCES todo_lists(id)',
      datetime: 'INTEGER NOT NULL',
   };
}
