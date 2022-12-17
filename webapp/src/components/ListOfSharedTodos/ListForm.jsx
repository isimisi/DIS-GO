import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Autocomplete from '@mui/joy/Autocomplete';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loader from './Loader';
import Button from '@mui/joy/Button';
import useInput from '../../hooks/useInput';
import { createTodoList, searchMail } from '../../api/listOfSharedTodos';
import TextField from '@mui/joy/TextField';
import { pages } from '../../api/constants';

export default function ListForm({ goToPage }) {
   const [open, setOpen] = React.useState(false);
   const [options, setOptions] = React.useState([]);
   const [loading, setLoading] = React.useState(false);

   const {
      value: searchTerm,
      isValid: searchTermIsValid,
      valueChangeHandler: searchTermChangeHandler,
      reset: searchTermReset,
   } = useInput();

   const {
      value: title,
      hasError: titleHasError,
      valueChangeHandler: titleChangeHandler,
      inputBlurHandler: titleBlurHandler,
      reset: titleReset,
   } = useInput();

   const {
      value: users,
      valueChangeHandler: usersChangeHandler,
      inputBlurHandler: usersBlurHandler,
      reset: usersReset,
   } = useInput((emails) => emails.length > 0);

   React.useEffect(() => {
      if (searchTermIsValid) {
         (async () => {
            setLoading(true);
            try {
               const emails = await searchMail(searchTerm);

               setOptions(emails);
               setLoading(false);
            } catch (error) {
               console.log(error);
               setLoading(false);
            }
         })();
      }

      return () => {
         searchTermReset();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [searchTerm, searchTermIsValid]);

   React.useEffect(() => {
      if (!open) {
         setOptions([]);
      }
   }, [open]);

   function submitHandler(e) {
      e.preventDefault();
      if (titleHasError) return;
      console.log(title, users);

      (async () => {
         try {
            const response = await createTodoList(title, users);
            titleReset();
            usersReset();
            goToPage(pages.sharedTodo(response.list_id));
         } catch (error) {
            usersReset();
            titleReset();
            console.log(error);
         }
      })();
   }

   return (
      <FormControl
         component="form"
         onSubmit={submitHandler}
         sx={{
            maxWidth: 900,
            margin: '1rem auto',
            width: '90%',
         }}>
         <Box
            sx={{
               marginBottom: '1rem',
            }}>
            <FormLabel
               required
               sx={{
                  fontSize: 16,
                  color: '#002E94',
               }}>
               Title
            </FormLabel>
            <TextField
               placeholder="Example Title"
               required={true}
               sx={{
                  borderColor: '#E1CEB5',
                  ':active': {
                     borderColor: 'green',
                  },
               }}
               onChange={titleChangeHandler}
               onBlur={titleBlurHandler}
               value={title}
               error={titleHasError}
               helperText={titleHasError && 'This field cannot be left empty.'}
            />
         </Box>
         <Box
            sx={{
               marginBottom: '1rem',
            }}>
            <FormLabel
               sx={{
                  fontSize: 16,
                  color: '#002E94',
               }}>
               People
            </FormLabel>
            <Autocomplete
               sx={{
                  borderColor: '#E1CEB5',
               }}
               clearOnEscape
               autoHighlight
               options={options}
               multiple
               open={open}
               onOpen={() => {
                  setOpen(true);
               }}
               onClose={() => {
                  setOpen(false);
               }}
               loading={loading}
               startDecorator={
                  <AccountCircleIcon
                     sx={{
                        color: open ? '#607EAA' : '#c9e1ff',
                     }}
                  />
               }
               limitTags={3}
               endDecorator={loading ? <Loader /> : null}
               onKeyUp={searchTermChangeHandler}
               onChange={(_e, value) => {
                  const e = {};
                  e.target = { value };
                  usersChangeHandler(e);
               }}
               onBlur={usersBlurHandler}
            />
            <FormHelperText>
               People you want to share the todo list with.
            </FormHelperText>
         </Box>
         <Box>
            <Button
               onClick={submitHandler}
               type="submit"
               size="md"
               variant="soft"
               sx={{
                  width: '100%',
               }}>
               Create List
            </Button>
         </Box>
      </FormControl>
   );
}
