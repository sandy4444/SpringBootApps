import React, {useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import url from "../Config/config.json";
import { ToastContainer, toast } from "react-toastify";
import {
  Typography,
  Paper,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import VehicleDetails from './ResultsTable/VehicleDetails'
import InsuserDetails from './ResultsTable/InsuserDetails'
import axios from "axios";


const useStyles = makeStyles({
 paper: {
    padding: 30,
    height: "auto",
    margin: "20px auto",
    width: "65%",
  },
});

export default function Details(props) {
  const classes = useStyles();

  const {data,Onchange} = props; 
  const [value, setValue] = useState(data);
  const{planId,vehicle,PAC,city,manufacture,model,year} = value;
  
  useEffect(()=>{Onchange(value)},[value]);
  useEffect(()=>{Onchange(data)},[]);
  
  let history = useHistory();
  const handleContinue = (e) => {
    if(planId == "" || planId == 0){
      toast.error("Please select a plan form table", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      var status = 0;
      fetch(url.urlEndpoint + 'updateVechile/', {
        method: 'POST',       
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(value),
       }).then(response => {
        status = response.status;
        return response.json()})
        .then(data1 => {
            setValue(data1);
            history.push("/payments");
          }).catch((error) => {
          console.error('Error:', error);
        });
    
      e.preventDefault(); 
     
    }
    };
  

  const handleBack = (e)=>{
    history.push("/details");
  }

  const onSelectHandler = (id) =>{
    setValue({...value,planId:id});
  }; 

  
  return (
    <React.Fragment>
      <Paper elevation={3} className={classes.paper}>
        <Box boxShadow={1} bgcolor="background.paper" m={1} p={1} style= {{backgroundColor: "lightgreen"}}
        >
          <Typography variant="h4" align="center">
            Results
          </Typography>
        </Box>

        <VehicleDetails data={value}/>

        <div style= {{paddingTop:'40px', paddingBottom : '10px'}}>
        <Typography variant="p" align="center" color="secondary" style= {{WebkitTextStroke : "thin"}}>
            Your IDV(Insured's Declared Value) is the maximum amount payable by the insurer 
            in the event of  claim for  total loss/theft
          </Typography>
        </div>

        <InsuserDetails  onSelect={onSelectHandler}/>

        <Button type="button"  align="center" color="primary" variant="contained" onClick = {handleBack} style = {{marginLeft : "10px", marginRight : "10px"}}>
          Back
        </Button>
        <Button type="button" color="default" align="center" variant="contained" onClick={handleContinue}>
          Continue
        </Button>
      </Paper>
    </React.Fragment>
  );
}
