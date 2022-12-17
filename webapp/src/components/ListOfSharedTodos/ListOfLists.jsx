import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Divider } from '@mui/material';
import { pages } from '../../api/constants';
import Typography from '@mui/joy/Typography';

export default function ListOfLists(props) {
   return (
      <Box
         sx={{
            display: 'flex',
            width: '90%',
            margin: '1rem auto',
            justifyContent: 'center',
            alignItems: 'center',
            '& > *': { minWidth: 0, flexBasis: 200 },
         }}>
         <List
            variant="outlined"
            sx={{
               borderRadius: 'sm',
               width: '100%',
               maxWidth: 900,
               boxShadow: 'md',
               bgcolor: '#CBE6FF',
               overflowY: 'auto',
               maxHeight: 400,
               '&::-webkit-scrollbar': {
                  width: '8px',
               },
               '&::-webkit-scrollbar:hover': {
                  cursor: 'pointer',
               },
               '&::-webkit-scrollbar-track': {
                  bgcolor: '#ccc',
                  borderRadius: '100px',
               },
               '&::-webkit-scrollbar-thumb': {
                  bgcolor: '#002E9490',
                  borderRadius: '100px',
               },
            }}>
            <ListItemButton
               onClick={props.refresh}
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#002E94',
               }}>
               <FormatListNumberedIcon
                  sx={{
                     marginRight: 1,
                  }}
               />
               <p
                  style={{
                     margin: '0 0 5px 0',
                     fontWeight: 'bold',
                     fontSize: 18,
                  }}>
                  Your shared Todo-lists
               </p>
            </ListItemButton>
            <Divider
               sx={{
                  bgcolor: '#6BB2F590',
               }}
            />
            {props.lists.map((list) => {
               return (
                  <ListItem key={list.id}>
                     <ListItemButton
                        onClick={() =>
                           props.goToPage(pages.sharedTodo(list.id))
                        }
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           color: '#2D7CC7',

                           ':hover': {
                              bgcolor: '#DDEBF8',
                              color: '#12375A',
                           },
                           ':active': {
                              bgcolor: '#12375A50',
                           },
                        }}>
                        <Typography
                           sx={{
                              color: 'inherit',
                              ':first-letter': {
                                 textTransform: 'uppercase',
                              },
                           }}>
                           {list.title}
                        </Typography>
                     </ListItemButton>
                  </ListItem>
               );
            })}
         </List>
      </Box>
   );
}
