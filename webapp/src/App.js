import './App.css';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import ResponsiveAppBar from './components/AppBar';
import LoaderSpinner from './components/LoaderSpinner';
import LoginForm from './components/LoginForm';
import VerifyUser from './components/VerifyUser';
import { useEffect } from 'react';
import { fetchTodos } from './api/todos';
import Todo from './components/Todo';

function App() {
   const [pageState, setPageState] = useState('login');
   const [loadingState, setLoadingState] = useState(true);
   const [itemsState, setItemsState] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const loadingHandler = () => {
      setLoadingState((prevState) => !prevState);
   };

   /**
    *
    * @param {boolean} boolean
    */
   const loginHandler = (boolean) => {
      setIsLoggedIn(boolean);
   };

   const resetItemsHandler = () => {
      setItemsState([]);
   };

   const handleGoToPage = (page) => {
      setPageState(page);
   };
   /**
    *
    * @param {{ id: number, user_id: number, todo_text: string, is_done: number}} data
    */
   const addItemsHandler = (data) => {
      setItemsState((prevState) => [...prevState, data]);
   };

   const deleteItemHandler = (id) => {
      setItemsState((prevState) => {
         const copy = [...prevState];
         const index = copy.findIndex((item) => item.id === id);
         copy.splice(index, 1);
         return copy;
      });
   };

   useEffect(() => {
      fetchTodos()
         .then((res) => {
            if (res.error) {
               setPageState('login');
               setIsLoggedIn(false);
               return;
            }
            setPageState('todo-list');
            setItemsState(res);
            setIsLoggedIn(true);
         })
         .finally(() => {
            setLoadingState(false);
         });
   }, [isLoggedIn]);

   const content = loadingState ? (
      <LoaderSpinner />
   ) : (
      <>
         {pageState === 'signup' && (
            <RegisterForm goToPage={handleGoToPage} loading={loadingHandler} />
         )}
         {pageState === 'login' && (
            <LoginForm
               goToPage={handleGoToPage}
               loading={loadingHandler}
               login={loginHandler}
            />
         )}
         {pageState === 'todo-list' && (
            <Todo
               items={itemsState}
               addItems={addItemsHandler}
               removeItem={deleteItemHandler}
            />
         )}
         {pageState === 'verification' && (
            <VerifyUser goToPage={handleGoToPage} login={loginHandler} />
         )}
      </>
   );

   return (
      <div className="App">
         <ResponsiveAppBar
            goToPage={handleGoToPage}
            isLoggedIn={isLoggedIn}
            login={loginHandler}
            resetItems={resetItemsHandler}
         />
         {content}
      </div>
   );
}

export default App;
