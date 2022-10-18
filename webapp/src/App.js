import './App.css';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import ResponsiveAppBar from './components/AppBar';

function App() {
   const [pageState, setPageState] = useState('login');

   const handleGoToPage = (page) => {
      setPageState(page);
   };

   return (
      <div className="App">
         <ResponsiveAppBar goToPage={handleGoToPage} />
         {pageState === 'signup' && <RegisterForm goToPage={handleGoToPage}/>}
         {pageState === 'login' && <h2>Login</h2>}
         {pageState === 'todo-list' && <h2>Todo</h2>}
      </div>
   );
}

export default App;
