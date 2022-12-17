import './App.css';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import ResponsiveAppBar from './components/AppBar';
import LoaderSpinner from './components/LoaderSpinner';
import LoginForm from './components/LoginForm';
import VerifyUser from './components/VerifyUser';
import { useEffect } from 'react';
import Todo from './components/Todo';
import ListIndex from './components/ListOfSharedTodos';
import { pages } from './api/constants';
import meta from './api/meta';

import SharedTodo from './components/sharedTodo';

function App() {
   const [pageState, setPageState] = useState(pages.login);
   const [loadingState, setLoadingState] = useState(true);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const loadingHandler = () => {
      setLoadingState((prevState) => !prevState);
   };

   const loginHandler = (boolean) => {
      setIsLoggedIn(boolean);
   };

   const handleGoToPage = (page) => {
      setPageState(page);
   };

   useEffect(() => {
      (async () => {
         try {
            await meta();
            setIsLoggedIn(true);
            setPageState(pages.personalTodo);
         } catch (error) {
            setIsLoggedIn(false);
            setPageState(pages.login);
         } finally {
            setLoadingState(false);
         }
      })();
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
            <Todo goToPage={handleGoToPage} login={loginHandler} />
         )}
         {pageState === pages.verification && (
            <VerifyUser goToPage={handleGoToPage} login={loginHandler} />
         )}
         {pageState === pages.listOfSharedTodos && (
            <ListIndex
               setLoadingState={setLoadingState}
               goToPage={handleGoToPage}
            />
         )}
         {pageState.includes('sharedTodo') && <SharedTodo page={pageState} />}
      </>
   );

   return (
      <div className="App">
         <ResponsiveAppBar
            goToPage={handleGoToPage}
            isLoggedIn={isLoggedIn}
            login={loginHandler}
         />
         {content}
      </div>
   );
}

export default App;
