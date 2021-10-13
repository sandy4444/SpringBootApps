import React, { useState} from 'react';
import { Router,Route , Switch} from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Details from './Pages/Details'
import Results from './Pages/Results'
import Payments from './Pages/Payment'
import FooterCompoent from './Components/FooterComponent';
import {Paper,makeStyles} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  main_paper: {
    background: "lavender",
    width: "100%",
    height: "100%",
    padding: "1px",
  }
});
function App() {

  const [details, setDetails] = useState({
    personId : "",
    planId : "",
    vehicle : "",
    pac : "",
    city: "",
    manufacture: "",
    model:"",
    year: "",
    errors: {},
  });

  const [log, setLog] = useState(false);

 const classes = useStyles();
  return (
    <React.Fragment>
      <Navbar Details ={details} Log ={log} SetLog ={setLog}></Navbar>
      <Paper elevation={0} className={classes.main_paper}>
        <ToastContainer/>
       <Switch>
            <Route path="/login" render={props => <Login data={details} Onchange={setDetails} Log ={log} SetLog ={setLog} />} exact></Route>
            <Route path="/signup" render={props => <Signup data={details} Onchange={setDetails} Log ={log} SetLog ={setLog} />} exact></Route>
            <Route path="/details" render={props => <Details data={details} Onchange={setDetails} />} exact></Route>
            <Route path="/results" render={props => <Results data={details} Onchange={setDetails} />} exact></Route>
            <Route path="/payments" render={props => <Payments data={details} Onchange={setDetails} />} exact></Route>
            <Route path="/" render={props => <Login data={details} Onchange={setDetails} />} exact></Route>
          </Switch>
        
      </Paper>
      <FooterCompoent />
    </React.Fragment>
  );
}

export default App;
