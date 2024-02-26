import * as React from 'react';
import ReactDOM from 'react-dom'
import { Fab, Grid,Stack,TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { serverURL, getData, postData } from "../services/fetchdjangoservices";
import InputAdornment from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import BackupSharpIcon from '@mui/icons-material/BackupSharp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import image from '../assets/pass.jpg'




const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100vh",
    // backgroundImage: `url(${image})`,
    background:'#c7ecee',

    display: "flex",
    justifyContent:"center",
    alignItems:"center"
    
    
  },
  box: {
    // width: "80%",
    // height:'auto' ,
    // background: "#ecf0f1",
    // borderRadius: 10,
    // padding: 15,
    // margin:'10%'
    // // display:'flex',
    // // justifyContent:'center',
    // // alignContent:'center'
    width: "76vw",
    height:'auto' ,
    background: "#ecf0f1",
    borderRadius: 10,
    padding: 10,
    // margin:'5%',
    marginTop:'5%',
    display: "flex",
    justifyContent:"center",
    alignItems:"center"

    
    
    },
}));

export default function Password(props) {
  var navigate=useNavigate()
  const [URL,setURL]=useState("");
  const [Username,setusername]=useState("");
  const [Password,setPassword]=useState("");
  const [note,setnote]=useState("");
  const [formError, setFormError] = useState({});

  const handleGoto=(event)=>{
    navigate('/displaypassword')
  }


  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }));

    console.log("Error", formError);
  };

  const isError = () => {
    var error = false;
    if (URL.length == 0) {
      handleError("url  Should Not Be Blank", "URL");
      error = true;
    }

    if (Username.length == 0) {
      handleError(" username", "Username");
      error = true;
    }
    if (Password.length == 0) {
      handleError("please enter password", "Password");
      error = true;
    }
    if (note.length == 0) {
      handleError("Pls input note", "note");
      error = true;
    }
    

    return error;
  };
  


  const handleReset=()=>{
    setURL("")
    setusername("")
    setPassword("")
    setnote("")
  }

  


  const handleSubmit = async () => {
    if (!isError()) {
      var formData = new FormData();
      formData.append("URL", URL);
      formData.append("username", Username);
      formData.append("password", Password);
      formData.append("note", note);
     
      var result = await postData("passwordsubmit", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 200,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 200,
        });
      }
    }
  };


  
  var classes = useStyles();
  return (
    <div >
      
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
           <TextField 
           error={formError.URL}
           onFocus={() => handleError("", "URL")}
           value={URL}
           type="URL"
           label='site URL'
           onChange={(event)=>setURL(event.target.value)}
           helperText={formError.URL}
           variant="standard"


           fullWidth />
          </Grid>

          <Grid item xs={12} >
          <TextField
              error={formError.Username}
              onFocus={() => handleError("", "Username")}
              onChange={(event) => setusername(event.target.value)}
              label="User Name"
              value={Username}
              helperText={formError.Username}
              fullWidth
              variant="standard"

              />
          </Grid>

          <Grid item xs={12} >
           <TextField 
           error={formError.Password}
           onFocus={() => handleError("", "Password")}
           value={Password}
           label='Password'
           onChange={(event)=>setPassword(event.target.value)}
           helperText={formError.Password}
           variant="standard"

           


           fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
            error={formError.note}
            onFocus={() => handleError("", "note")}
            value={note}
            label='Note'
            onChange={(event)=>setnote(event.target.value)}
            helperText={formError.note}
            multiline
            variant="standard"

            fullWidth>

            </TextField>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={2}>
           <Fab variant='extended' colour='primary' onClick={handleSubmit}><BackupSharpIcon sx={{mr:1}}/> Submit</Fab> 

          </Grid>
          <Grid item xs={6}>
          <Fab variant='extended' colour='secondary' onClick={handleReset} ><RestartAltIcon sx={{mr:1}}/> Reset</Fab> 

          </Grid>
      
          

          
        </Grid>
      </div>     
 
    </div>
  );
}

