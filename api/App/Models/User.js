import BaseModel from './BaseModel.js';
import Hash from '../Services/Hash.js';
import database from '../../database/index.js';

export default class User extends BaseModel {
   static tableName = 'users';

   static columns = ['first_name', 'password', 'email', 'verified'];

   /**
    *
    * @param {{ first_name: string, password: string, email: string }} data [first_name, password, email]
    */
   static async create(data) {
      data.verified = 0;
      data.password = await Hash.make(data.password);
      return await super.create(data);
   }

   static searchForEmails(searchTerm, id) {
      const sql = `SELECT email FROM users WHERE id != ? AND email LIKE ?`;

      return new Promise((resolve, reject) => {
         database.all(sql, [id, `${searchTerm}%`], function (error, rows) {
            if (error) return reject(error);

            if (rows.length > 0) {
               const result = rows.map((user) => user.email);
               return resolve(result);
            }

            resolve(rows);
         });
      });
   }
}
