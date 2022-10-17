import BaseModel from './BaseModel.js';
import database from '../../database/index.js';

export default class Todo extends BaseModel {
   static tableName = 'todos';

   static columns = ['user_id', 'todo_text', 'is_done'];

   static allUserTodos(user_id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
         database.all(sql, [user_id], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }
}
