import React from 'react';
import TodoList from './TodoList';
import './Todo.css';
import TodoInput from './TodoInput';

function Todo(props) {
   return (
      <div className="todo">
         <TodoInput addItem={props.addItems} />
         <TodoList items={props.items} removeItem={props.removeItem}/>
      </div>
   );
}

export default Todo;
