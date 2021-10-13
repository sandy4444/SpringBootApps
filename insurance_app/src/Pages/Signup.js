import React, { useState } from "react";
import url from "../Config/config.json";
import { useHistory} from "react-router-dom";

import { Grid, Paper, makeStyles, TextField , Button, Typography, Box} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css'
const useStyles = makeStyles({
  paper: {
    padding: 30,
    height: "auto",
    margin: "20px auto",
    width: 330,
  },

  textfields: {
    padding: 15,
    margin : "5px auto"
  },

  errorMsg : {
    color: "#cc0000",
    marginBottom: "12px",
  }
});

const Signup = (props) => {
  const classes = useStyles();
  let history =  useHistory();

  let {data,Onchange, Log, SetLog} = props; 
 const [state, setState] = useState({firstName : "",lastName : "" , dob : "", emailId : "", password : "", vechicleNo: "", errors: {},});

 const onChangeHandler = (e) => {
    setState({...state, [e.target.name] : e.target.value });
    
 }

 const handleSubmit = async (event) =>{
  event.preventDefault();
  var status = 100;
 
  if(validateForm()){
        
    await fetch(url.urlEndpoint + 'create/', {
      method: 'POST',       
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(state)
     }).then(response => {
      status = response.status;
      return response.json()})
      .then(data1 => {
        
        if(status === 417){
          toast.error(data1.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }else{
          data = {...data, personId : data1.id}
          SetLog(true);
          Onchange(data);
          localStorage.setItem('emailId', data1.emailId);
          localStorage.setItem('personId',data1.id)
          history.push("/details");
        }
       }).catch((error) => {
        SetLog(false);
        console.error('Error:', error);
      });
  }
    event.preventDefault();
 };

const validateForm = () => {
  let errors = {}
  let formIsValid = true
if (!state.firstName) {
    formIsValid = false
    errors['firstName'] = '*Please enter your firstName'
  }
if (state.firstName) {
    if (!state.firstName.match(/^\w+$/)) {
      formIsValid = false
      errors['firstName'] = '*Please use alphanumeric characters only'
    }
  }
if (!state.emailId) {
    formIsValid = false
    errors['emailId'] = '*Please enter your email'
  }
if (state.emailId) {
    //regular expression for email validation
    let pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(state.emailId)) {
      formIsValid = false
      errors['emailId'] = '*Please enter valid email'
    }
  }
if (!state.password) {
    formIsValid = false
    errors['password'] = '*Please enter your password'
  }
if (state.password) {
    if (!state.password.match(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/)) {
      formIsValid = false
      errors['password'] = '*Please enter secure and strong password'
    }
  }
setState({...state, errors : errors });
return formIsValid
};

  return (
    <React.Fragment>
      <Grid alignContent="center" direction="column">
        <Paper elevation={3} className={classes.paper}>
          <Grid alignContent="center" alignItems = "center">
            <Grid container className={classes.textfields}>
            <Box boxShadow={1} bgcolor="background.paper" m={1} p={1} style= {{backgroundColor: "aquamarine"
            }}>
          <Typography variant="h4" align="center">
            New User Registration
          </Typography>
        </Box>
            </Grid>
            <form onSubmit = {handleSubmit}>
            <Grid alignItems="stretch" justify="space-between" className={classes.textfields}>
            <TextField
                name = "firstName"
                label="First Name"
                variant="outlined"
                placeholder="Enter First Name"
                type="text"
                onChange={onChangeHandler}
              ></TextField>
              <div className={classes.errorMsg}>{state.errors.firstName}</div>
              <TextField
                 name = "lastName"
                label="Last Name"
                variant="outlined"
                placeholder="Enter Last Name"
                type="text"
                onChange={onChangeHandler}
              ></TextField>
              <div className={classes.errorMsg}>{state.errors.lastName}</div>
               <TextField
                name = "dob"
                label="Birthday"
                variant="outlined"
                defaultValue = "mm/dd/yyyy"
                placeholder="Enter Birthday"
                type="date"
                required
                onChange={onChangeHandler}
              />
             <TextField
              name = "emailId"
                label="Email Id"
                variant="outlined"
                placeholder="Enter Email Id"
                type="Email"
                onChange={onChangeHandler}
              ></TextField>
              <div className={classes.errorMsg}>{state.errors.emailId}</div>
              <TextField
               name = "password"
                label="Password"
                variant="outlined"
                placeholder="Enter Password"
                type="Password"
                required onChange={onChangeHandler}
              />
              <div className={classes.errorMsg}>{state.errors.password}</div>
              <TextField
               name = "vechicleNo"
                label="Vehicle No"
                variant="outlined"
                placeholder="Enter Vehicle No"
                type="number"
                required onChange={onChangeHandler}
              />
              <Button type='submit' color='primary' variant="contained"  fullWidth onClick={(event)=> handleSubmit}>Sign in</Button>
              </Grid>
              </form>
          </Grid>
        </Paper>
      </Grid>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </React.Fragment>
  );
};

export default Signup;
