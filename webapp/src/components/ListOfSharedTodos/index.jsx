import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import ListForm from './ListForm';
import ListOfLists from './ListOfLists';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import LoaderSpinner from '../LoaderSpinner';
import { fetchTodoLists } from '../../api/listOfSharedTodos';

export default function ListIndex(props) {
   const [loader, setLoader] = React.useState(true);
   const [todoLists, setTodoLists] = React.useState([]);

   React.useEffect(() => {
      setLoader(true);

      (async () => {
         try {
            const response = await fetchTodoLists();
            setTodoLists(response);
            setLoader(false);
         } catch (error) {
            console.log(error);
            setLoader(false);
         }
      })();
   }, []);

   const refreshHandler = () => {
      (async () => {
         try {
            const response = await fetchTodoLists();
            setTodoLists(response);
         } catch (error) {
            console.log(error);
         }
      })();
   };

   if (loader) return <LoaderSpinner />;

   return (
      <Box
         sx={{
            margin: '3rem auto',
            border: '1px solid #E1CEB5',
            width: '90%',
            maxWidth: 1200,
            borderRadius: 3,
            paddingBottom: 8,
         }}>
         <CssVarsProvider>
            <Typography
               fontSize="lg"
               fontWeight="lg"
               textColor="#002E94"
               sx={{
                  margin: '1rem auto',
                  borderBottom: '1px solid #002E9490',
                  width: '90%',
               }}>
               Create a new shared Todo-list
            </Typography>
            <ListForm goToPage={props.goToPage} />
            <Divider
               sx={{
                  width: '90%',
                  margin: 'auto auto',
                  maxWidth: 900,
                  bgcolor: '#002E9490',
               }}
            />
            <ListOfLists
               setLoadingState={setLoader}
               lists={todoLists}
               goToPage={props.goToPage}
               refresh={refreshHandler}
            />
         </CssVarsProvider>
      </Box>
   );
}
