import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import useInput from '../../hooks/useInput';

function TodoInput(props) {
   const {
      value: enteredTodo,
      isValid: todoIsValid,
      valueChangeHandler: todoChangeHandler,
      inputBlurHandler: todoBlurHandler,
      reset: todoReset,
   } = useInput();

   const enterHandler = (e) => {
      if (e.key === 'Enter') {
         if (!todoIsValid) return;
         todoReset();
         props.addItem({ list_id: props.list_id, todo_text: e.target.value });
      }
   };

   return (
      <TextField
         label="New todo"
         variant="standard"
         value={enteredTodo}
         onChange={todoChangeHandler}
         onBlur={todoBlurHandler}
         sx={{ width: '95%', bgcolor: '#fffaf5' }}
         onKeyDown={enterHandler}
      />
   );
}

export default TodoInput;
