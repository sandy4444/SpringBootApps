import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(cell1, cell2) {
  return { cell1, cell2};
}
const useStyles = makeStyles({
  table: {
    Width: 50,
  },
});

export default function CustomizedTables(data) {
    const{vehicle,PAC,city,manufacture,model,year} = data.data;
    console.log(vehicle,PAC,city,manufacture,model,year);
    const rows = [
        createData('CITY : ' + (city != undefined ? city.toString().toUpperCase() : "" ), 'MANUFACTURER : '+ (manufacture !== undefined ? manufacture.toString().toUpperCase() : "")),
        createData('MODEL : '+ (model != undefined ? model.toString().toUpperCase(): "") ,'YEAR : '+ (year != undefined ? year : "")),
        ];

    
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style = {{
        width: 'inherit',
        margin: 'auto',
    }}>
      <Table className={classes.table} aria-label="customized table">
      <TableHead>
          <TableCell align="center" colSpan={2} style={{fontSize: 15, fontWeight: 'bold'}}>
              Your Vechile Details
            </TableCell>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index} style={{width:"5px"}}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.cell1}
              </StyledTableCell>
              <StyledTableCell align="center">{row.cell2}</StyledTableCell>
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
