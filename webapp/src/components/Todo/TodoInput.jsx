import React from 'react';
import { TextField } from '@mui/material';
import useInput from '../../hooks/useInput';
import { createTodo } from '../../api/todos';

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
         createTodo(e.target.value)
            .then((res) => props.addItem(res))
            .catch((error) => console.log(error));
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
