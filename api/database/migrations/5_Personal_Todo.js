import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Todos extends DatabaseBuilder {
   static tableName = 'personal_todos';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      user_id: 'INTEGER NOT NULL REFERENCES users(id)',
      todo_text: 'TEXT',
      is_done: 'INTEGER NOT NULL',
      datetime: 'INTEGER NOT NULL'
   };
}
