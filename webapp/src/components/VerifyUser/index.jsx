import { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import LoadingButton from '@mui/lab/LoadingButton';
import AuthCode from 'react-auth-code-input';
import classes from './style.module.css';
import { sendVerification, verification } from '../../api/register';
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../helpers/exceptionUtils';

const VerifyUser = (props) => {
   const [loadingState, setLoadingState] = useState(false);
   const [responseIsValid, setResponseIsValid] = useState(false);
   const [emailState, setEmailState] = useState('xxxx@email.com');
   const [codeState, setCodeState] = useState(null);
   const [errorState, setErrorState] = useState(false);

   const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();

   useEffect(() => {
      const email = loadFromLocalStorage('d1ee921859').email;
      const emailName = email.split('@').at(0);
      const domain = email.split('@').at(1);
      const firstLetter = email[0];
      const lastLetter = emailName.slice(-1);
      const stars = Array(emailName.length).fill('*').join('');

      setEmailState(`${firstLetter}${stars}${lastLetter}@${domain}`);
   }, [loadFromLocalStorage]);

   const handleOnChange = (code) => {
      setErrorState(false);
      if (code.length === 4) {
         setCodeState(code);
         setResponseIsValid(true);
      } else {
         setResponseIsValid(false);
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!responseIsValid) {
         return;
      }

      setLoadingState(true);
      try {
         const data = await verification(codeState);
         saveToLocalStorage('d1ee921859', data);
         setLoadingState(false);
         props.login(true);
         props.goToPage('todo-list');
      } catch (error) {
         setErrorState(true);
         props.login(false);
         setLoadingState(false);
         return;
      }
   };

   const handleNewVerifcationCode = async (e) => {
      e.preventDefault();
      try {
         const { id } = loadFromLocalStorage('d1ee921859');
         await sendVerification(id);
         showSuccessMessage('Success', 'A new email has been sent', 3000);
      } catch (error) {
         showErrorMessage('Error', 'Oops.. something went wrong');
      }
   };

   return (
      <>
         <div className={classes.background}></div>
         <form className={classes.form} onSubmit={handleSubmit}>
            <h1 className={classes.header}>Verify your account</h1>
            <p>An email with a varification code has been sent to: </p>
            <p>{emailState}</p>
            <p> Enter the code here: </p>
            <AuthCode
               onChange={handleOnChange}
               allowedCharacters="numeric"
               length={4}
               placeholder="x"
               inputClassName={!errorState ? classes.input : classes.error}
               containerClassName={classes.container}></AuthCode>
            <LoadingButton
               className={classes.loadingBtn}
               variant="outlined"
               size="large"
               loading={loadingState}
               type="submit"
               loadingPosition="center"
               loadingIndicator="Verifying...">
               Verify
            </LoadingButton>
            <br />
            <a
               href="/"
               className={classes.anchor}
               onClick={handleNewVerifcationCode}>
               Resend verification mail
            </a>
            <p className={classes.spamHelper}>
               Please make sure to look in your spam folder
            </p>
         </form>
      </>
   );
};

export default VerifyUser;
