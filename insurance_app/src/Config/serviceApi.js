import url from "./config.json";
import { toast } from 'react-toastify';
export default function serverCall(service , info){
   let status = 201;
    return fetch(url.urlEndpoint + service + '/', {
    method: 'POST', // or 'PUT'
    //mode: "no-cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info),
}).then(response => //status= response.status; console.log(response.json());
   response.json())
  .then(data => {    
    if(status === 417){
      toast.error(data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }   
    console.log("Data: ", data); 
    //data.json()
  })
  .catch((error) => {
    console.error('Error:', error);
  });

};