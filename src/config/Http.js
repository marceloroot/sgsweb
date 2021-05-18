import Axios from 'axios';
import {rootUrl,apiUrl} from './App.js';

export const Http = Axios.create({
    baseURL:rootUrl
})

export const HttpAuth = Axios.create({
    baseURL:apiUrl
})



HttpAuth.interceptors.request.use(
 
    async (config) =>{
       
    
        config.headers = { 
            'Content-Type': 'application/json',
            'x-access-token': await localStorage.getItem('visa_token'),
          }
          
       
        return config;
    }
)

HttpAuth.interceptors.response.use(response =>{
    return response;
},error =>{
  
 if(error.response){
     if(error.response.status === 401){
         localStorage.removeItem('visa_token');
         window.location.replace('/login');
     }
 }
})