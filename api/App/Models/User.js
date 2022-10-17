import BaseModel from './BaseModel.js';
import Hash from '../Services/Hash.js';

export default class User extends BaseModel {
   static tableName = 'users';

   static columns = ['first_name', 'password', 'email'];

   /**
    *
    * @param {string[]} data [first_name, password, email]
    */
   static async create(data) {
      data.password = await Hash.make(data.password);
      return await super.create(data);
   }
}
