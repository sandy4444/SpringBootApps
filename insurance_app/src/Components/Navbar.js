import React, {useState} from 'react';
import { AppBar , Typography, Button, Toolbar, makeStyles } from '@material-ui/core';
import { useHistory} from "react-router-dom";

const useStyles = makeStyles({
    header :{
        backgroundColor : "black",
        color : "white"
         }
});

const Navbar = (props) => {
    const [u,setU] = useState(1);
    let history = useHistory();
    const {Details,Log, SetLog} = props; 
    
    
    const onSignUp = () =>{
        SetLog(false);
        history.push("/signUp");
    }

    const onLogin = () =>{
        SetLog(false);
        history.push("/login");
        
    }

    const onLogout = () =>{
        SetLog(false);
        history.push("/login");
    }
    const classes = useStyles();
    return ( 
        <React.Fragment>
            <AppBar position="static" className = {classes.header}>
            <Toolbar>
            <Typography variant="h5" style = {{WebkitTextStroke : "thin"}}>
                Deloitte
            </Typography>
            <Typography variant="h5" style = {{WebkitTextStroke : "thick", color : "greenyellow", marginLeft : "4px", marginRight : "20px" }}>
                 .
            </Typography>
            <div>{ Log ===  false ?
                <Button variant="contained" color="primary" style = {{marginLeft : "10px", marginRight : "10px"}} disableElevation onClick= {onLogin}>Login</Button> :
                <Button variant="contained" color="primary" style = {{marginLeft : "10px", marginRight : "10px"}} disableElevation onClick= {onLogout}>Logout</Button> 
            }
            <Button variant="contained" color="primary" style = {{marginLeft : "10px", marginRight : "10px"}} disableElevation onClick={onSignUp}>Sign Up</Button>
            </div>
            </Toolbar>
        </AppBar>
      </React.Fragment> 
     );
}
 
export default Navbar;