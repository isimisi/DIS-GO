import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Todos extends DatabaseBuilder {
   static tableName = 'todo_lists';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      title: 'TEXT',
      datetime: 'INTEGER NOT NULL',
   };
}
