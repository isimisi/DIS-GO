import DatabaseBuilder from '../../utils/DatabaseBuilder.js';

export default class Users extends DatabaseBuilder {
   static tableName = 'users';

   static columns = {
      id: 'INTEGER PRIMARY KEY',
      first_name: 'TEXT NOT NULL',
      password: 'TEXT NOT NULL',
      email: 'TEXT NOT NULL UNIQUE',
      verified: 'INTEGER',
      datetime: 'INTEGER NOT NULL'
   };
}
