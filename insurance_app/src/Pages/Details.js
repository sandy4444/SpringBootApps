import React, {useState , useEffect, useLayoutEffect } from "react";
import { useHistory, Redirect} from "react-router-dom";
import url from "../Config/config.json";
import {
  Typography,
  Paper,
  makeStyles,
  Button,
  Checkbox,Box
} from "@material-ui/core";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
} from "@material-ui/core";
import { MenuItem, InputLabel, Select, Input } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
 paper: {
    padding: 30,
    height: "auto",
    margin: "20px auto",
    width: "65%",
  },

  textfields: {
    padding: 15,
    margin: "5px auto",
  },
  formControl: {
    margin: 10,
    Width: 120,
  },
  errorMsg : {
    color: "#cc0000",
    marginBottom: "12px",
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 4,
      width: 250,
    },
  },
};

export default function Details(props) {
  const {data,Onchange} = props; 
  const [value, setValue] = useState(data);
  const{vehicle,pac,city,manufacture,model,year,personId,errors} = value;
  console.log("Errors : ", errors);
  const classes = useStyles();
  let history = useHistory();
 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("personId");
    if (loggedInUser) {
      setValue({...value,personId : loggedInUser}) 
    }else{
      toast.error("Please login again", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      history.push("/login");
    }

  }, []);

  useEffect(()=>{Onchange(value)},[value]);
  
  const handleChange = (event) => {
    console.log(event.target);
    if(event.target.name !== "pac")
    setValue({...value,[event.target.name] : event.target.value});
    else
    setValue({...value,[event.target.name] : event.target.checked});
  };

  const validateForm = () => {
    let errors = {}
    let formIsValid = true
  if (!vehicle) {
      formIsValid = false
      errors['vehicle'] = '*Please select your Vechicle'
    }
  
  if (!city) {
      formIsValid = false
      errors['city'] = '*Please select City'
    }
  if (!manufacture) {
        formIsValid = false
        errors['manufacture'] = '*Please select Manufacturer'
    }
  if (!model) {
      formIsValid = false
      errors['model'] = '*Please select Model'
    }
  if (!year) {
        formIsValid = false
        errors['year'] = '*Please select Year'
    }
  setValue({...value, errors : errors });
  return formIsValid
  };


  const handleContinue = (e) => {
    if(validateForm())
      history.push("/results");
  };
  

 return (
    <React.Fragment>
     <Paper elevation={3} className={classes.paper}>
     <Box boxShadow={1} bgcolor="background.paper" m={1} p={1} style= {{backgroundColor: "lightgreen"}}
        >
          <Typography variant="h4" align="center">
            Details
          </Typography>
      </Box>
          <FormControl component="fieldset" style={{ display: "inline" }}>
            <FormLabel component="div">Vehicle Insurance</FormLabel>
            <RadioGroup
              aria-label="Vehicle"
              name="vehicle"
              value={vehicle}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="Car" control={<Radio />} label="Car" />
              <FormControlLabel
                value="Bike"
                control={<Radio />}
                label="Two Wheeler"
              />
            </RadioGroup>
            <div className={classes.errorMsg}>{errors.vehicle}</div>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="span">Personal Accident Cover</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pac}
                    onChange={handleChange}
                    name="pac"
                  />
                }
              />
            </FormGroup>
            <div className={classes.errorMsg}>{errors.pac}</div>
          </FormControl>
          <FormControl className={classes.formControl} autoWidth>
            <InputLabel id="city">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="city"
              value={city}
              onChange={handleChange}
              autoWidth
            >
              {["Mumbai", "Delhi", "Kolkata", "Chennai", "Bengaluru"].map(
                (x, y) => (
                  <MenuItem map={y} value={x}>
                    {x}
                  </MenuItem>
                )
              )}
            </Select>
            <div className={classes.errorMsg}>{errors.city}</div> 
          </FormControl>
          <FormControl className={classes.formControl} autoWidth>
            <InputLabel id="manufacture">Manufacture</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={manufacture}
              onChange={handleChange}
              name="manufacture"
              autoWidth
            >
              {["Hero", "Maruti", "Tesla", "Toyota"].map((x, y) => (
                <MenuItem map={y} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
            <div className={classes.errorMsg}>{errors.manufacture}</div>
          </FormControl>
          <FormControl className={classes.formControl} autoWidth>
            <InputLabel id="model">Model</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model}
              onChange={handleChange}
              autoWidth
              name="model"
            >
              {["Apache", "Activa", "Splendor", "Pulsar"].map((x, y) => (
                <MenuItem map={y} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
            <div className={classes.errorMsg}>{errors.model}</div>
          </FormControl>
          <FormControl className={classes.formControl} autoWidth>
            <InputLabel id="year">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              name="year"
              onChange={handleChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {["2021", "2020", "2019", "2018", "2017", "2016", "2015"].map(
                (x, y) => (
                  <MenuItem map={y} value={x}>
                    {x}
                  </MenuItem>
                )
              )}
            </Select>
            <div className={classes.errorMsg}>{errors.year}</div>
          </FormControl>
          <Button type='button' align='center' color='primary' variant="outline" style = {{marginLeft : "10px", marginRight : "10px"}} >Reset</Button>
          <Button type='button' color='default' variant="contained"   onClick={handleContinue} >Continue</Button>
        </Paper>
       </React.Fragment>
  );
}
