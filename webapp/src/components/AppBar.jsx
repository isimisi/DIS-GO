import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { logout } from '../api/login';
import useLocalStorage from '../hooks/useLocalStorage';
import meta from '../api/meta';
import { pages as definedPages } from '../api/constants';
import { removeList } from '../api/sharedTodo';

const ResponsiveAppBar = (props) => {
   const { isLoggedIn, goToPage, login, currentPage } = props;
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [pages, setPages] = useState([
      definedPages.login,
      definedPages.signup,
   ]);
   const [settings, setSettings] = useState(['Logout']);

   const { loadFromLocalStorage, clearLocalStorage, saveToLocalStorage } =
      useLocalStorage();

   useEffect(() => {
      if (!isLoggedIn) {
         setPages([definedPages.login, definedPages.signup]);
      }

      if (isLoggedIn) {
         setPages([definedPages.personalTodo, definedPages.listOfSharedTodos]);
      }
   }, [isLoggedIn, loadFromLocalStorage]);

   useEffect(() => {
      if (currentPage.includes('sharedTodo')) {
         setSettings(['Logout', 'Delete List']);
      } else {
         setSettings(['Logout']);
      }
   }, [currentPage]);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleGoToPage = (page) => {
      setAnchorElNav(null);
      goToPage(page);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const getAvatarName = () => {
      const name = loadFromLocalStorage('d1ee921859')?.first_name;

      if (!name) {
         meta().then((res) => {
            saveToLocalStorage('d1ee921859', res);
            return res.first_name;
         });
      } else {
         return name;
      }
   };

   const handleLogout = async () => {
      login(false);
      handleCloseUserMenu();
      clearLocalStorage();
      await logout();
      goToPage(definedPages.login);
   };

   const handleRemoveList = async () => {
      try {
         const id = currentPage.split('/').at(-1);
         await removeList(id);
         goToPage(definedPages.listOfSharedTodos);
         handleCloseUserMenu();
      } catch (error) {
         handleCloseUserMenu();
         console.log(error);
      }
   };

   return (
      <AppBar position="static" sx={{ backgroundColor: '#002E94' }}>
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <FormatListNumberedOutlinedIcon
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
               />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}>
                  DIS TODO
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit">
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}>
                     {pages.map((page) => (
                        <MenuItem
                           key={page}
                           onClick={() => handleGoToPage(page)}>
                           <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <FormatListNumberedOutlinedIcon
                  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
               />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}>
                  DIS TODO
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                     <Button
                        key={page}
                        onClick={() => handleGoToPage(page)}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                        {page}
                     </Button>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  {isLoggedIn && (
                     <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Avatar
                              alt={getAvatarName()}
                              src="/static/images/avatar/2.jpg"
                           />
                        </IconButton>
                     </Tooltip>
                  )}
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}>
                     {settings.map((setting) => (
                        <MenuItem
                           key={setting}
                           onClick={
                              setting === 'Logout'
                                 ? handleLogout
                                 : setting === 'Delete List'
                                 ? handleRemoveList
                                 : handleCloseUserMenu
                           }>
                           <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default ResponsiveAppBar;
