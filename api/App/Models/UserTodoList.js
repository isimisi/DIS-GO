import database from '../../database/index.js';
import BaseModel from './BaseModel.js';

export default class UserTodoList extends BaseModel {
   static tableName = 'user_todo_lists';

   static columns = ['user_id', 'list_id'];
}
