import { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { updateTodo } from '../../api/todos';

export default function TodoItem(props) {
   const [checked, setChecked] = useState(false);

   useEffect(() => {
      if (props.checked) {
         setChecked(true);
      }
   }, []);

   const handleToggle = () => {
      setChecked((prevValue) => !prevValue);
      updateTodo({
         id: props.id,
         is_done: Number(!checked),
         todo_text: undefined,
      });
   };

   const style = checked
      ? { textDecoration: 'line-through', color: 'gray' }
      : {};

   style.textTransform = 'capitalize';
   
   return (
      <ListItem
         key={props.id}
         disablePadding
         sx={{
            bgcolor: '#fcf5ed',
         }}>
         <ListItemButton role={undefined} onClick={handleToggle} dense>
            <ListItemIcon>
               <Checkbox
                  edge="start"
                  checked={checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': props.id }}
               />
            </ListItemIcon>
            <ListItemText id={props.id} style={style} primary={props.text} />
         </ListItemButton>
      </ListItem>
   );
}
