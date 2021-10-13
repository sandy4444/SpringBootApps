import axios from "axios";
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
     console.log("Error Details : ",error); 
    const expectedError = error.response && error.response.status >= 400 && error.response.status<500;
    if(expectedError){
        toast('Something went wrong', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    return  Promise.reject(error);
});


export default {
    get: axios.get,
    put: axios.put,
    delete: axios.delete,
    post: axios.post
}

