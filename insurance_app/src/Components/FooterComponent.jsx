import { Container, Link, Typography } from "@material-ui/core";
import React from "react";
//import UXComponent from "../../UX/UXComponent/UXComponent";
//import { Phantom } from "../../UXComponents/SpacingComponent/SpaceCompoennt";
const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "absolute",
  left: "0",
 // bottom: "0",
  height: "60px",
  width: "100%",
};

export default function FooterCompoent(){

  const classes = style;

 return (
      <footer position="fixed">
        {/* <Phantom></Phantom> */}
        <Container style={classes}>
          <Container maxWidth="sm">
            <Typography variant="body1">Vehicle Insurance App</Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="mailto:sandbehera@deloitte.com">
                Deloitte
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Container>
      </footer>
    );
  }
