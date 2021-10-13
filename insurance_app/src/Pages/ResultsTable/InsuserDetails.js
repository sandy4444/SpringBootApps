import React, {useState, useEffect} from "react";
import { DataGrid } from '@material-ui/data-grid';
import url from "../../Config/config.json";
import '../../App.css'

const columns = [
  { field: 'planId', headerName: 'ID', width: 150 },
  { field: 'insurer', headerName: 'INSURER', width: 200 },
  { field: 'idv', headerName: 'IDV', type: 'number', width: 200 },
  {
    field: 'premium',
    headerName: 'PREMIUM',
    type: 'number',
    width: 200,
  },  
];

export default function DataGridDemo(props) {
  const {onSelect} = props;

  const [rows, setRows] = useState([{ id : ""  }]);

  React.useEffect(() => getInsurerDetails(),[]);

  const getInsurerDetails = async e =>{

   await fetch(url.urlEndpoint + 'insurerDetails/', {
      method: 'POST',       
      headers: {
        'Content-Type': 'application/json'
      },
     }).then(response => response.json())
    .then(data => {     
          console.log("Insurer Details  1: ", data);
          setRows(data);
       }).catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div style={{ height: 400, wplanIdth: '100%' }}>
      <DataGrid rows={rows} hideFooter={true} columns={columns} onRowSelected={(row,event)=>{
          console.log("First: ",row.data);
          onSelect(row.data.planId);
           }} />
    </div>
  );
}
