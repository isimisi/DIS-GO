import useInput from '../hooks/useInput.js';
import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import login from '../api/login.js';
import { saveToLocalStorage } from '../api/localStorage.js';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm = (props) => {
   const [loadingState, setLoadingState] = useState(false);

   const {
      value: enteredEmail,
      isValid: emailIsValid,
      hasError: emailInputHasError,
      valueChangeHandler: emailChangeHandler,
      inputBlurHandler: emailBlurHandler,
      reset: emailReset,
   } = useInput((email) => email.includes('@'));

   const {
      value: enteredPassword,
      isValid: passwordIsValid,
      hasError: passwordInputHasError,
      valueChangeHandler: passwordChangeHandler,
      inputBlurHandler: passwordBlurHandler,
      reset: passwordReset,
   } = useInput((password) => password.length > 7);

   let formIsValid = false;

   if (passwordIsValid && emailIsValid) {
      formIsValid = true;
   }

   const handleGoToCreateAccount = (e) => {
      e.preventDefault();
      props.goToPage('signup');
   };

   const formSubmissionHandler = async (e) => {
      e.preventDefault();

      if (!formIsValid) {
         return;
      }

      setLoadingState(true);
      const data = {
         password: enteredPassword,
         email: enteredEmail,
      };

      const response = await login(data);

      if (response.error) {
         return console.log(response.error);
      }
      emailReset();
      passwordReset();

      saveToLocalStorage({ token: response.accessToken });
      setLoadingState(false);
      props.login(true)
      props.goToPage('todo-list');
   };

   return (
      <Box
         component="form"
         sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            width: 400,
            maxWidth: 600,
            height: 300,
            padding: '0.5rem',
            margin: '3rem auto',
            border: 2,
            borderRadius: 12,
            borderColor: '#E1CEB5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
         }}
         noValidate
         autoComplete="off">
         <h2 style={{ color: '#002E94' }}>Login</h2>
         <TextField
            id="email"
            style={{ width: '80%' }}
            label="Email"
            variant="filled"
            required
            type="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            fullWidth
            error={emailInputHasError}
            helperText={emailInputHasError && 'Must be a valid email'}
         />
         <TextField
            id="password"
            style={{ width: '80%' }}
            label="Password"
            variant="filled"
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            error={passwordInputHasError}
            helperText={
               passwordInputHasError &&
               'Your password must have a length greater than 7'
            }
         />
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               width: '70%',
            }}>
            <LoadingButton
               variant="outlined"
               loading={loadingState}
               disabled={!formIsValid}
               onClick={formSubmissionHandler}
               type="submit">
               Login
            </LoadingButton>
            <label
               style={{
                  fontSize: '10px',
                  margin: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'gray',
               }}>
               <Button variant="outlined" onClick={handleGoToCreateAccount}>
                  Create account
               </Button>
               Click here to create an account
            </label>
         </div>
      </Box>
   );
};

export default LoginForm;
