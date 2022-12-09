import BaseModel from './BaseModel.js';
import UserTodoList from './UserTodoList.js';
import database from '../../database/index.js';
import Todo from './Todo.js';

export default class TodoList extends BaseModel {
   static tableName = 'todo_lists';

   static columns = ['title'];

   static findAllUserLists(user_id) {
      return new Promise((resolve, reject) => {
         const sql = `SELECT TL.id, TL.title, TL.datetime FROM ${this.tableName} as TL
         JOIN user_todo_lists as UTL ON TL.id = UTL.list_id
         WHERE UTL.user_id = ?`;
         database.all(sql, [user_id], function (error, rows) {
            if (error) return reject(error);
            resolve(rows);
         });
      });
   }

   static async create(user_id, title) {
      const list_id = await super.create({ title });
      await UserTodoList.create({
         user_id,
         list_id,
      });
      return list_id;
   }

   static async remove(id) {
      await Todo.removeWhere({ list_id: id });
      await UserTodoList.removeWhere({ list_id: id });
      await super.remove(id);
   }
}
