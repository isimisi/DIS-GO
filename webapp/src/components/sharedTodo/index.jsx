import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './Todo.css';
import TodoInput from './TodoInput';
import { fetchTodos } from '../../api/sharedTodo';
import LoaderSpinner from '../LoaderSpinner';
import { pages } from '../../api/constants';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3333/socketTodos');

function SharedTodo({ page, login, goToPage }) {
   const [items, setItems] = useState([]);
   const [loader, setLoader] = useState(true);

   const [isConnected, setIsConnected] = useState(socket.connected);
   const [lastPong, setLastPong] = useState(null);

   const list_id = page.split('/').at(-1);

   useEffect(() => {
      socket.connect();

      socket.on('connect', () => {
         socket.emit('join-list', { list_id });
         setIsConnected(true);
      });

      socket.on('test', (string) => console.log(string));
      socket.on('joined-list', (string) => console.log(string));

      socket.on('disconnect', () => {
         setIsConnected(false);
      });

      return () => {
         socket.off('connect');
         socket.off('disconnect');
         socket.off('pong');
         socket.disconnect();
      };
   }, []);

   const addItemsHandler = (data) => {
      setItems((prevState) => [...prevState, data]);
   };

   const deleteItemHandler = (id) => {
      setItems((prevState) => {
         const copy = [...prevState];
         const index = copy.findIndex((item) => item.id === id);
         copy.splice(index, 1);
         return copy;
      });
   };

   useEffect(() => {
      setLoader(true);
      (async () => {
         try {
            const response = await fetchTodos(list_id);
            setItems(response);
         } catch (error) {
            login(false);
            goToPage(pages.login);
         } finally {
            setLoader(false);
         }
      })();
   }, []);

   const testFn = () => {
      socket.emit('pee', 'tiiiis');
   };

   if (loader) return <LoaderSpinner />;

   return (
      <div className="todo">
         <h5>shared {list_id}</h5>
         <TodoInput addItem={addItemsHandler} socket={socket} test={testFn} />
         <TodoList
            items={items}
            removeItem={deleteItemHandler}
            socket={socket}
         />
      </div>
   );
}

export default SharedTodo;
