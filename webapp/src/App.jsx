import './App.css';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import ResponsiveAppBar from './components/AppBar';
import LoaderSpinner from './components/LoaderSpinner';
import LoginForm from './components/LoginForm';
import VerifyUser from './components/VerifyUser';
import { useEffect } from 'react';
import { fetchTodos } from './api/personalTodos';
import Todo from './components/Todo';
import ListIndex from './components/ListOfSharedTodos';
import { pages } from './api/constants';

function App() {
   const [pageState, setPageState] = useState(pages.login);
   const [loadingState, setLoadingState] = useState(true);
   const [itemsState, setItemsState] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const loadingHandler = () => {
      setLoadingState((prevState) => !prevState);
   };

   const loginHandler = (boolean) => {
      setIsLoggedIn(boolean);
   };

   const resetItemsHandler = () => {
      setItemsState([]);
   };

   const handleGoToPage = (page) => {
      setPageState(page);
   };

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
            setPageState(pages.personalTodo);
            setItemsState(res);
            setIsLoggedIn(true);
         })
         .catch(() => {
            setPageState(pages.login);
            setIsLoggedIn(false);
            return;
         })

         .finally(() => {
            setLoadingState(false);
         });
   }, [isLoggedIn]);

   const content = loadingState ? (
      <LoaderSpinner />
   ) : (
      <>
         {pageState === pages.signup && (
            <RegisterForm goToPage={handleGoToPage} loading={loadingHandler} />
         )}
         {pageState === pages.login && (
            <LoginForm
               goToPage={handleGoToPage}
               loading={loadingHandler}
               login={loginHandler}
            />
         )}
         {pageState === pages.personalTodo && (
            <Todo
               items={itemsState}
               addItems={addItemsHandler}
               removeItem={deleteItemHandler}
            />
         )}
         {pageState === pages.verification && (
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
         <ListIndex />
      </div>
   );
}

export default App;
