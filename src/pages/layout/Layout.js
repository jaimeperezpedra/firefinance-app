import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Drawer, Box, AppBar, Toolbar,
  List, ListItem,ListItemIcon, ListItemText , Typography, Divider, IconButton, Badge } from '@mui/material';
import  * as Icon  from '@mui/icons-material/'
import { Outlet, Link } from "react-router-dom";
import PropTypes from 'prop-types';

const drawerWidth = 240;

const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MuiDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const listMenu = [
  {
    url: '/',
    icon: <Icon.Euro />,
    title: 'Expenses'
  },
  {
    url: '/config',
    icon: <Icon.Settings />,
    title: 'Config'
  },
  {
    url: '/profile',
    icon: <Icon.Person />,
    title: 'Profile'
  },
  {
    url: '/income',
    icon: <Icon.AccountBalance />,
    title: 'Income'
  }
]


export const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (value = !open) => {
    setOpen(value);
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MuiAppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Icon.Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Icon.Notifications />
              </Badge>
            </IconButton>
          </Toolbar>
        </MuiAppBar>
        <MuiDrawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={() => toggleDrawer(false)}>
              <Icon.ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {listMenu.map((menu) => <ListLink key={menu.url} menu={menu} toggleDrawer={() => toggleDrawer(false)} />
            )}
          </List>
          <Divider />
        </MuiDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

const ListLink = React.forwardRef((props, ref) => (
  <Link key={ref} to={props.menu.url} onClick={props.toggleDrawer} >
    <ListItem button>
      <ListItemIcon>
        {props.menu.icon}
      </ListItemIcon>
      <ListItemText primary={props.menu.title} />
    </ListItem>
  </Link>
));

ListLink.displayName = 'ListLink';


ListLink.propTypes = {
  menu: PropTypes.object,
  toggleDrawer: PropTypes.func,
}