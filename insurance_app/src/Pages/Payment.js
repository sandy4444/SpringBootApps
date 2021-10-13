import React, {useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import {
  Typography,Grid,
  Paper,
  makeStyles,
  Button,
  Box,
  TextField
} from "@material-ui/core";


const useStyles = makeStyles({
 paper: {
    padding: 30,
    height: "auto",
    margin: "20px auto",
    width: "45%",
  },

  errorMsg : {
    color: "#cc0000",
    marginBottom: "12px",
  }
});



export default function Payment(props) {
  const classes = useStyles();

  const {data,Onchange} = props; 
  const [value, setValue] = useState({
      name : "",
      cardNum : "",
      cvv : "",
      mm : "",
      yy : "",
      errors: {}
  });

  const handleChange = (event) => {
    setValue({...value,[event.target.name] : event.target.value});    
    };
  const{planId,vehicle,PAC,city,manufacture,model,year} = value;
  
 //useEffect(()=>{Onchange(value)},[value]);
  
  let history = useHistory();
  
  const handlePayment = (e) => {
    if(validateForm()){
      toast.success("Payment done successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  const handleCancel = (e)=>{
    setValue({
        name : "",
        cardNum : "",
        cvv : "",
        mm : "",
        yy : "",
        errors: {}
    });
  }

  const validateForm = () => {
    let errors = {}
    let formIsValid = true
  if (!value.name) {
      formIsValid = false
      errors['name'] = '*Please enter your Name'
    }
  
  if (!value.cardNum) {
      formIsValid = false
      errors['cardNum'] = '*Please enter your Card Number'
    }
  
  if (!value.cvv) {
      formIsValid = false
      errors['cvv'] = '*Please enter your CVV'
    }

    if (!value.mm) {
      formIsValid = false
      errors['mm'] = '*Please enter your Expiration Date'
    }
    if (!value.yy) {
      formIsValid = false
      errors['yy'] = '*Please enter your Expiration Date'
    }
  
      setValue({...value, errors : errors });
      return formIsValid
  };

  return (
    <React.Fragment>
      <Paper elevation={3} className={classes.paper}>
        <Box boxShadow={1} bgcolor="background.paper" m={1} p={1} style= {{backgroundColor: "lightgreen"}}
        >
          <Typography variant="h4" align="center">
            Transaction Details
          </Typography>
        </Box>

        <TextField
          required
          name = "name"
          variant="outlined"
          label="Name on the Card"
          onChange={handleChange}
          value={value.name}
          
        />
        <div className={classes.errorMsg}>{value.errors.name}</div>

        <TextField
          error= {false}
          name = "cardNum"
          required
          id="outlined-required"
          variant="outlined"
          label="Card Number"
          value={value.cardNum}
          onChange={handleChange}
          />
        <div className={classes.errorMsg}>{value.errors.cardNum}</div>
<Grid container spacing={4}>
<Grid justify = "flex-start" container  direction="row" item md={3}>
<Grid >
    <TextField
            error={false}
            variant ="outlined"
            name = "cvv"
            size="small"
            label="CVV No:"
            type="number"
            value = {value.cvv}
            onChange={handleChange}
            inputProps={{ maxLength: 3 }} />
            <div className={classes.errorMsg}>{value.errors.cvv}</div>

  </Grid>
  </Grid>
  <Grid justify="center" container  direction="row" item xs={8}>
            <Grid item md={3}>
                <TextField
                        error={false}
                        name= "mm"
                        variant ="outlined"
                        size="small"
                        label="MM"
                        type="number"
                        value={value.mm}
                        helperText="Expiration"
                        onChange={handleChange}
                        inputProps={{ maxLength: 2 }} />
                <div className={classes.errorMsg}>{value.errors.mm}</div>
            </Grid>
            <Grid item md={3}>
                <TextField
                        error={false}
                        variant ="outlined"
                        name="yy"
                        size="small"
                        label="YY"
                        type="text"
                        onChange={handleChange}
                        helperText="Date"
                        value={value.yy}
                        inputProps={{ maxLength: 2 }} />
                        <div className={classes.errorMsg}>{value.errors.yy}</div>
            </Grid>
  </Grid>
  </Grid>    
    <br/>
    <Grid container spacing={2} direction="row" justify ="center">
        <Button type="button"  align="center" color="default" variant="contained" onClick = {handleCancel}  style = {{marginLeft : "10px", marginRight : "10px"}}>
          Cancel
        </Button>
        <Button type="button" color="inherit" align="center" variant="contained" onClick={handlePayment} style = {{backgroundColor:"lightblue"}}>
          Pay
        </Button>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
