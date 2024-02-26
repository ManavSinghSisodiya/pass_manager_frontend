import React, { Component }  from 'react';
import {useState,useEffect} from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditIcon from '@mui/icons-material/Edit';
import {Avatar,Button,Radio,RadioGroup,FormControlLabel,FormLabel,Grid,FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';


import MaterialTable from 'material-table';
import makeStyles from "@mui/styles/makeStyles";
 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import image from '../assets/pass.jpg'


import { serverURL, getData, postData,imageURL } from "../services/fetchdjangoservices";

const useStyles = makeStyles((theme) => ({
    rootcontainer: {
      width: "auto",
      height: "auto",
      
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rootbox: {
      width: "auto",
      height: "auto",
      background: "#fff",
      borderRadius: 10,
      padding: 15,
    },
    container: {
      width: "100%",
      height: "100vh",
      // backgroundImage:`url(${image})`,
      background:'#c7ecee',
      display: "flex",
      justifyContent:"center",
      alignItems:"center"
      
      
    },
    box: {
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

export default function DisplayPassword(){
  var classes=useStyles()
  var navigate=useNavigate()
  const [passwordList,setpasswordList]=useState([])
  const [open,setOpen]=useState(false)
  const [PasswordID,setPasswordID]=useState("");
  const [URL,setURL]=useState("");
  const [Username,setusername]=useState("");
  const [Password,setPassword]=useState("");
  const [note,setnote]=useState("");
  const [formError, setFormError] = useState({});
  
  
   const handleAdd=(event)=>{
     navigate('/Password')
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
  

  const handleSubmit = async () => {
    if (!isError()) {
    var  body= {"id":PasswordID,"URL":URL,"username":Username,
    "password":Password,"note":note}
    var result = await postData("passwordedit",body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer:2000,
        });
        fetchAllPassword()
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const fetchAllPassword=async()=>{
    var result=await getData('passwordList')
    setpasswordList(result)
    console.log(setpasswordList)
  }

  useEffect(function(){
    fetchAllPassword()
  },[])

  const handleClose=()=>{
    setOpen(false)
  }  

  const handleEdit=(rowData)=>{
    setURL(rowData.URL)
    setPassword(rowData.password)
    setusername(rowData.username)
    setnote(rowData.note)
    setPasswordID(rowData.id)
    setOpen(true)

  }

  const handleDelete=async(rowData)=>{
    Swal.fire({
      title:'do you want to save changes?',
      showDenyButton:true,
      conformButtonText:'delete',
      denyButtonText:'cancel'
    }).then(async(result)=>{
      if (result.isConfirmed) {
        var body={'id':rowData.id}
        var result=await postData('passworddelete',body)
        if(result.status)
        {
  
        Swal.fire('Deleted!', '', 'success')
        fetchAllPassword()
        }
        else
        {
          Swal.fire('Server Error!', '', 'error')
        }
      } else if (result.isDenied) {
        Swal.fire('Record not deleted', '', 'info')
      }
    })

  }

  const showPasswordEdit=()=>{
    return (
      <div className={classes.rootcontainer}>
        
        <div className={classes.rootbox}>
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
            <Grid item xs={2}></Grid>
           
              
            </Grid>     
  
            
  
            
        </div>     
   
      </div>
    );
    
  }

  const showPasswordDetails=()=>{
    return (
      <div>
        
        <Dialog
         open={open}
         keepMounted
         onClose={handleClose}
         maxWidth={'md'}
         >
         
          <DialogContent>
            {showPasswordEdit()}
          </DialogContent>
          <DialogActions>
          
            <Fab color="primary" aria-label="add" size='medium' >
              <SaveIcon
              onClick={handleSubmit} />
            </Fab>
            <Fab color="primary" aria-label="add" size='medium' >
              <CloseIcon             
              onClick={handleClose}
              
              />
            </Fab>
            
           
          </DialogActions>
        </Dialog>
      </div>
    );
  

  }


  function showPasswordList() {
    return (
      <Grid container spacing={3}> 
        <Grid item xs={8}>
          {/* <h2>Password Manager</h2> */}
        </Grid>
        {/* <Grid item xs={4}>
        <Fab variant='extended'color="primary" aria-label="add" size='medium' onClick={handleAdd}>
          <AddIcon sx={{ mr: 1 }}/>Add Password
        </Fab>
        </Grid> */}
        
        <Grid item xs={12}>
        <MaterialTable
          title='Password Manager'
          columns={[
            { title: 'Url',field: 'URL'},
            { title: 'username',field: 'username'},
            { title: 'password',field: 'password'},
            { title: 'Note', field:'note'},
            
          ]}
          data={passwordList}
          options={{
          paging:true,
          pageSize:6,
          emptyRowsWhenPaging:false,
          pageSizeOptions:[6],
        }}
          actions={[
            {
              icon:'edit',
              tooltip:'edit password',
              onClick:(event,rowData)=>handleEdit(rowData)
              
            },
            {
              icon:'delete',
              tooltip:'delete password',
              onClick: (event,rowData)=>handleDelete(rowData)
            }
          ]}
          />
        </Grid>

      </Grid>
    )
  }


  return(
    <div 
    // className={classes.container}
    >
      <div 
      className={classes.box}
      >
        {showPasswordList()}
      </div>
      {showPasswordDetails()}
    </div>

  )


}