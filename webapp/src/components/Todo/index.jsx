import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './Todo.css';
import TodoInput from './TodoInput';
import { fetchTodos } from '../../api/personalTodos';
import LoaderSpinner from '../LoaderSpinner';
import { pages } from '../../api/constants';

function Todo(props) {
   const [items, setItems] = useState([]);
   const [loader, setLoader] = useState(true);

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
            const response = await fetchTodos();
            setItems(response);
         } catch (error) {
            props.login(false);
            props.goToPage(pages.login);
         } finally {
            setLoader(false);
         }
      })();
   }, []);

   if (loader) return <LoaderSpinner />;

   return (
      <div className="todo">
         <h5>personalTodos</h5>
         <TodoInput addItem={addItemsHandler} />
         <TodoList items={items} removeItem={deleteItemHandler} />
      </div>
   );
}

export default Todo;
