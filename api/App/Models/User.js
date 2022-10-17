import BaseModel from './BaseModel.js';

export default class User extends BaseModel {
   static tableName = 'users';

   static columns = ['first_name', 'password', 'email'];
}
