import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Todos extends DatabaseBuilder {
   static tableName = 'todos';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      list_id: 'INTEGER NOT NULL REFERENCES todo_lists(id)',
      todo_text: 'TEXT',
      is_done: 'INTEGER NOT NULL',
      datetime: 'INTEGER NOT NULL'
   };
}
