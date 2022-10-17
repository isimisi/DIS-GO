import BaseModel from './BaseModel.js';

export default class Todo extends BaseModel {
   static tableName = 'todos';

   static columns = ['user_id', 'todo_text', 'is_done'];
}
