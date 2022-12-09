import BaseModel from './BaseModel.js';
import database from '../../database/index.js';

export default class Todo extends BaseModel {
   static tableName = 'todos';

   static columns = ['list_id', 'todo_text', 'is_done'];

   static allListTodos(list_id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT * FROM ${this.tableName} WHERE list_id = ?`;
         database.all(sql, [list_id], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static async create(data) {
      data.is_done = 0;
      return await super.create(data);
   }
}
