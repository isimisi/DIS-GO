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

const people = ['pee', 'poo'];

function sleep(delay = 0) {
   return new Promise((resolve) => {
      setTimeout(resolve, delay);
   });
}

export default function ListForm() {
   const [open, setOpen] = React.useState(false);
   const [options, setOptions] = React.useState([]);
   const loading = open && options.length === 0;

   React.useEffect(() => {
      let active = true;

      if (!loading) {
         return undefined;
      }

      (async () => {
         await sleep(1e3); // For demo purposes.

         if (active) {
            setOptions([...people]);
         }
      })();

      return () => {
         active = false;
      };
   }, [loading]);

   React.useEffect(() => {
      if (!open) {
         setOptions([]);
      }
   }, [open]);

   return (
      <FormControl
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
               sx={{
                  fontSize: 16,
                  color: '#002E94',
               }}>
               Title
            </FormLabel>
            <Input
               placeholder="Example Title"
               sx={{
                  borderColor: '#E1CEB5',
                  ':active': {
                     borderColor: 'green',
                  },
               }}
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
               endDecorator={loading ? <Loader /> : null}
            />
            <FormHelperText>
               People you want to share the todo list with.
            </FormHelperText>
         </Box>
         <Box>
            <Button
               onClick={function (e) {
                  console.log(e);
               }}
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
