import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './Todo.css';
import TodoInput from './TodoInput';
import { fetchTitle, fetchTodos } from '../../api/sharedTodo';
import LoaderSpinner from '../LoaderSpinner';
import { pages } from '../../api/constants';
import { Typography } from '@mui/material';
import io from 'socket.io-client';
import { showErrorMessage } from '../../helpers/exceptionUtils';
import { baseUrl } from '../../api/constants';
import {
   initiateConnection,
   disconnect,
   addItems,
   removeItem,
   checkItem,
   OnAddItems,
   OnCheckItem,
   OnError,
   OnRemoveItem,
} from '../../services/socket.service';

const socket = io.connect(`${baseUrl}/socketTodos`);

function SharedTodo({ page, login, goToPage }) {
   const [items, setItems] = useState([]);
   const [loader, setLoader] = useState(true);
   const [list_id] = useState(page.split('/').at(-1));
   const [title, setTitle] = useState('');

   useEffect(() => {
      socket.connect();

      socket.on('connect', () => {
         socket.emit('join-list', { list_id });
      });

      socket.on('created', (data) =>
         setItems((prevState) => [...prevState, data])
      );

      socket.on('deleted', ({ id }) =>
         setItems((prevState) => {
            const copy = [...prevState];
            const index = copy.findIndex((item) => item.id === id);
            copy.splice(index, 1);
            return copy;
         })
      );

      socket.on('checked', (todo) => {
         setItems((prevState) => {
            const copy = [...prevState];
            const foundTodo = copy.find((item) => item.id === todo.id);
            foundTodo.is_done = todo.is_done;
            return copy;
         });
      });

      socket.on('error', () => {
         showErrorMessage('Error', 'List was deleted');
         goToPage(pages.listOfSharedTodos);
      });

      return () => {
         socket.off('checked');
         socket.off('deleted');
         socket.off('created');
         socket.off('joined-list');
         socket.off('connected');
         socket.off('disconnect');
         socket.disconnect();
      };
   }, [goToPage, list_id]);

   const addItemsHandler = (data) => {
      socket.emit('create', data);
   };

   const deleteItemHandler = (id) => {
      socket.emit('delete', { id, list_id });
   };

   const checkItemHandler = (id, is_done) => {
      socket.emit('check', { id, is_done, list_id });
   };

   useEffect(() => {
      setLoader(true);
      (async () => {
         try {
            const response = await fetchTodos(list_id);
            const listTitle = await fetchTitle(list_id);
            setTitle(listTitle);
            setItems(response);
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
