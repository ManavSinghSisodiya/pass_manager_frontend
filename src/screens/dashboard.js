import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Routes,Route,useNavigate} from "react-router-dom"
import DisplayPassword from './displaypassword';
import Password from './password';
import axios from 'axios';
import { serverURL, getData, postData,imageURL } from "../services/fetchdjangoservices";
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';


// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PasswordIcon from '@mui/icons-material/Password';
import { Padding } from '@mui/icons-material';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/displaypassword">
password manager      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    var navigate=useNavigate()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [passwordCount, setPasswordCount] = useState("");

  const fetchAllPasswordCount=async()=>{
    var result=await getData('count')
    setPasswordCount(result)
    console.log(setPasswordCount)
  }

  useEffect(function(){
    fetchAllPasswordCount()
  },[])

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Button
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </Button>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Password Manager  
            </Typography>

            <IconButton color="inherit" >
              <Badge  color="secondary">
                <PasswordIcon />
              </Badge>
            </IconButton>
          
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton 
            onClick={toggleDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <nav aria-label="main mailbox folders">
           <List>
             <ListItem disablePadding>
               <ListItemButton onClick={()=>navigate('/dashboard/Password')}>
                 <ListItemIcon>
                  <LocalHospitalIcon />
                 </ListItemIcon>
                 <ListItemText primary="ADD password" />
               </ListItemButton>
             </ListItem>
             <ListItem disablePadding >
               <ListItemButton onClick={()=>navigate('/dashboard/displaypassword')}>
                 <ListItemIcon>
                   <PersonSearchIcon/>
                 </ListItemIcon>
                 <ListItemText primary="Dashboard" />
               </ListItemButton>
             </ListItem>
           </List>
         </nav>
        </Drawer>
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
            background:'#ecf0f1'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Routes>
              <Route element={<Password/>} path="/Password"/>          
              <Route element={<DisplayPassword/>} path="/displaypassword"/>
              </Routes>
              
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}





// import {IconButton, AppBar,Box,Toolbar,Paper,Grid } from "@mui/material";
// import LogoutRounded from '@mui/icons-material/LogoutRounded';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import {Routes,Route,useNavigate} from "react-router-dom"
// import adminimage from "../assets/pass.jpg"
// import DisplayPassword from './displaypassword';
// import Password from './password';
// export default function AdminDashboard()
// {
// var navigate=useNavigate()
//  function menuList() {
//   return (
//     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <nav aria-label="main mailbox folders">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton onClick={()=>navigate('/dashboard/Password')}>
//               <ListItemIcon>
//                 <LocalHospitalIcon />
//               </ListItemIcon>
//               <ListItemText primary="ADD password" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton onClick={()=>navigate('/dashboard/displaypassword')}>
//               <ListItemIcon>
//                 <PersonSearchIcon/>
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </nav>
//       <Divider />
//       <nav aria-label="secondary mailbox folders">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemText primary="Sign out" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </nav>
//     </Box>
//   );
// }



//  const appBar=()=>{
//   return(  
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//        <Toolbar>
        
//          <div style={{fontWeight:'bold',fontSize:26}}>Medassist</div>
//          <IconButton   style={{color:'#fff',marginLeft:'auto'}}>
//   <LogoutRounded />
// </IconButton>
//          </Toolbar>   
//       </AppBar>
//     </Box>
//   )
//  }   
//  const sideBar=()=>{
//   return(
//   <Grid container spacing={1}>
//     <Grid item xs={2}>
//      <Paper elevation={3} style={{width:200,margin:10,padding:10,display:'flex',flexDirection:'column',borderRadius:20,alignItems:'center'}}>
//        <div>
//         <img src={adminimage} style={{width:80,height:80,borderRadius:40}}/>
//        </div>
//        <div style={{fontWeight:14,fontWeight:'bold'}}>Thomas Cook</div>
//        <div style={{fontWeight:10,fontWeight:300}}>+919301123085</div> 
//        <div style={{fontWeight:10,fontWeight:300}}>thomascook@gmail.com</div>
//        <div>
//         {menuList()}
//         </div> 




//   </Paper>
//   </Grid>

//   <Grid item xs={10}>
 
//   <Routes>
//         <Route element={<Password/>} path="/Password"/>          
//         <Route element={<DisplayPassword/>} path="/displaypassword"/>   
//   </Routes>
//   </Grid>
//   </Grid>

//   )

//  }
//   return(<div>
//   {appBar()}
//   {sideBar()}

//   </div>)

// }