import * as React from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';

export default function TodoList(props) {
   return (
      <List sx={{ width: '95%', maxWidth: 500, bgcolor: '#c9e1ff', padding: 2 }}>
         {props.items.map((item) => {
            return (
               <TodoItem
                  key={item.id}
                  id={item.id}
                  text={item.todo_text}
                  checked={Boolean(item.is_done)}
                  checkItem={props.checkItem}
                  removeItem={props.removeItem}
               />
            );
         })}
      </List>
   );
}
