import useInput from '../hooks/useInput.js';
import { useState } from 'react';
import { TextField, Box } from '@mui/material';
import registerUser from '../api/register.js';
import { saveToLocalStorage } from '../api/localStorage.js';
import LoadingButton from '@mui/lab/LoadingButton';

const RegisterForm = (props) => {
   const [loadingState, setLoadingState] = useState(false);

   const {
      value: enteredFName,
      isValid: fNameIsValid,
      hasError: fNameInputHasError,
      valueChangeHandler: fNameChangeHandler,
      inputBlurHandler: fNameBlurHandler,
      reset: fNameReset,
   } = useInput();

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

   if (fNameIsValid && passwordIsValid && emailIsValid) {
      formIsValid = true;
   }

   const formSubmissionHandler = async (e) => {
      e.preventDefault();

      if (!formIsValid) {
         return;
      }

      setLoadingState(true);
      const data = {
         first_name: enteredFName,
         password: enteredPassword,
         email: enteredEmail,
      };

      const response = await registerUser(data);
      if (response.error) {
         return;
      }

      fNameReset();
      emailReset();
      passwordReset();

      saveToLocalStorage({ token: response.meta.accessToken });
      setLoadingState(false);
      props.login(true);
      props.goToPage('todo-list');
   };

   return (
      <Box
         component="form"
         sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            width: '90%',
            maxWidth: 400,
            height: 400,
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
         <h2 style={{ color: '#002E94' }}>Sign up</h2>
         <TextField
            style={{ width: '80%' }}
            id="first_name"
            label="First Name"
            variant="filled"
            required
            value={enteredFName}
            onChange={fNameChangeHandler}
            onBlur={fNameBlurHandler}
            error={fNameInputHasError}
            helperText={fNameInputHasError && "This field can't be empty"}
         />
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
         <LoadingButton
            variant="outlined"
            loading={loadingState}
            disabled={!formIsValid}
            type="submit"
            onClick={formSubmissionHandler}>
            Create Account
         </LoadingButton>
      </Box>
   );
};

export default RegisterForm;
