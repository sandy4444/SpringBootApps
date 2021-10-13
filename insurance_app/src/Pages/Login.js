import React, {useState , useEffect } from "react";
import { Grid, Paper, makeStyles, TextField , Button} from "@material-ui/core";
import { useHistory} from "react-router-dom";
import url from "../Config/config.json";
import { toast } from 'react-toastify';

import './Login.css'
const useStyles = makeStyles({
  paper: {
    padding: 30,
    height: "auto",
    margin: "20px auto",
    width: 280,
  },

  textfields: {
    padding: 15,
    margin : "5px auto"
  },

  errorMsg : {
    color: "#cc0000",
    marginBottom: "12px",
  },
});

export default function Login(props){

  const [state, setState] = useState({id : "" , firstName : "",lastName : "" , dob : "", emailId : "", password : "", vechicleNo: "", errors: {},});
  
  let {data,Onchange, Log, SetLog} = props; 
  const [value, setValue] = useState(data);
  useEffect(()=>{ localStorage.clear(); SetLog(false);},[]);

    useEffect(()=>{ console.log("Onchange: ",value)
    Onchange(value);},[value]);  

  const onChangeHandler = (e) => {
    setState({...state, [e.target.name] : e.target.value });    
  }

  const validateForm = () => {
    let errors = {}
    let formIsValid = true
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
  
  setState({...state, errors : errors });
  return formIsValid
  };
  
  let history = useHistory();
  
  const   handleOnClick = async (e) => {
    let dummyState = {...state};
    delete dummyState.errors;
    var status = 100;
    var status1 = 0;
    if(validateForm()){
         await fetch(url.urlEndpoint + 'validate/', {
              method: 'POST', // or 'PUT'
              //mode: "no-cors",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dummyState),
          }).then(response => {
            status = response.status;
            return response.json()})
            .then(data1 => {
              
              if(status === 417){
                toast.error(data1.message, {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }else{
                
                setValue({...value, personId : data1.id});
                localStorage.setItem('emailId', data1.emailId);
                localStorage.setItem('personId',data1.id)
                data = {...data, personId : data1.id}
                fetch(url.urlEndpoint + 'vehicleDetails/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(response => { 
                  status1 =  response.status;
                  return response.json()})
                  .then(data1 => { 
                        console.log("Vechile Onchange next?")
                        if(status1 !== 417){
                          data1.errors = {};
                          setValue(data1); 
                        }
                        console.log("DB vechile data :", data1, "State: ", value);
                        toast.success("Login was successfull", {
                          position: "bottom-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          });
                          console.log("Vechicle status : ",status1);
                          if(status1 !== 0){
                            SetLog(true);
                            history.push("/details");
                          }    
                })
                  .catch((error) => {
                    console.error('Error:', error);
                  });
                  
               }
              
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          }    
    };
        
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid alignContent="center" direction="column">
        <Paper elevation={3} className={classes.paper}>
          <Grid alignContent="center" alignItems = "center">
            <Grid container className={classes.textfields}>
              Login Form
            </Grid>
            <Grid alignItems="stretch" justify="space-between" className={classes.textfields}>
              <TextField
                label="Email Id"
                name="emailId"
                variant="outlined"
                placeholder="Enter Email Id"
                type="Email"
                required
                onChange={onChangeHandler}
              ></TextField>
              <div className={classes.errorMsg}>{state.errors.emailId}</div>
              <TextField
                label="Password"
                name="password"
                variant="outlined"
                placeholder="Enter Password"
                type="Password"
                required
                onChange={onChangeHandler}
              />
              <div className={classes.errorMsg}>{state.errors.password}</div>
              <Button type='submit' color='primary' variant="contained"  fullWidth onClick= {handleOnClick}>Sign in</Button>
              </Grid>
          </Grid>
        </Paper>
      </Grid>
      {//console.clear()
      }
    </React.Fragment>
    
  );
};

//export default Login;
