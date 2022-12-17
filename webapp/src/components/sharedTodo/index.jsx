import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './Todo.css';
import TodoInput from './TodoInput';
import { fetchTitle, fetchTodos } from '../../api/sharedTodo';
import LoaderSpinner from '../LoaderSpinner';
import { pages } from '../../api/constants';
import { Typography } from '@mui/material';

import { showErrorMessage } from '../../helpers/exceptionUtils';
import {
   OnAddItems,
   OnCheckItem,
   OnConnectError,
   OnError,
   OnRemoveItem,
   addItems,
   checkItem,
   disconnect,
   initiateConnection,
   removeItem,
} from '../../services/socket.service';

function SharedTodo({ page, login, goToPage }) {
   const [items, setItems] = useState([]);
   const [loader, setLoader] = useState(true);
   const [list_id] = useState(page.split('/').at(-1));
   const [title, setTitle] = useState('');
   const [token, setToken] = useState(null);

   useEffect(() => {
      initiateConnection(token, list_id);

      OnError((error) => {
         console.log(error);
         showErrorMessage('Error', error);
         goToPage(pages.listOfSharedTodos);
      });

      OnRemoveItem((id) =>
         setItems((prevState) => {
            const copy = [...prevState];
            const index = copy.findIndex((item) => item.id === id);
            copy.splice(index, 1);
            return copy;
         })
      );

      OnCheckItem((todo) =>
         setItems((prevState) => {
            const copy = [...prevState];
            const foundTodo = copy.find((item) => item.id === todo.id);
            foundTodo.is_done = todo.is_done;
            return copy;
         })
      );

      OnAddItems((data) => setItems((prevState) => [...prevState, data]));

      OnConnectError(() => {
         showErrorMessage('Error', 'Oops... something went wrong', 5000);
         goToPage(pages.listOfSharedTodos);
      });

      return () => {
         disconnect();
      };
   }, [goToPage, token, list_id]);

   const addItemsHandler = (data) => {
      data.list_id = list_id;
      addItems(data);
   };

   const deleteItemHandler = (id) => {
      removeItem(id, list_id);
   };

   const checkItemHandler = (id, is_done) => {
      checkItem(id, is_done, list_id);
   };

   useEffect(() => {
      setLoader(true);
      (async () => {
         try {
            const response = await fetchTodos(list_id);
            const listTitle = await fetchTitle(list_id);
            setTitle(listTitle);
            setToken(response.token);
            setItems(response.todos);
         } catch (error) {
            login(false);
            goToPage(pages.login);
         } finally {
            setLoader(false);
         }
      })();
   }, [goToPage, list_id, login]);

   if (loader) return <LoaderSpinner />;

   return (
      <>
         <Typography
            sx={{
               fontFamily: 'monospace',
               fontWeight: 700,
               fontSize: 24,
               letterSpacing: '.05rem',
               color: '#002E94',
               margin: '1rem auto',
               ':first-letter': {
                  textTransform: 'uppercase',
               },
            }}>
            {title}
         </Typography>
         <div className="todo">
            <TodoInput addItem={addItemsHandler} list_id={list_id} />
            <TodoList
               items={items}
               removeItem={deleteItemHandler}
               checkItem={checkItemHandler}
            />
         </div>
      </>
   );
}

export default SharedTodo;
