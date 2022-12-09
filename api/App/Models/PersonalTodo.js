import BaseModel from './BaseModel.js';
import database from '../../database/index.js';

export default class PersonalTodo extends BaseModel {
   static tableName = 'personal_todos';

   static columns = ['user_id', 'todo_text', 'is_done'];

   /**
    *
    * @param {number} user_id
    * @returns
    */
   static allUserTodos(user_id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
         database.all(sql, [user_id], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   /**
    *
    * @param {{user_id: number, todo_text: string}} data
    * @returns
    */
   static async create(data) {
      data.is_done = 0;
      return await super.create(data);
   }
}
