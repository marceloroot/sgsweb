import Axios from 'axios';
import {rootUrl,apiUrl} from './App.js';
import { changeNotify } from '../store/actions/notify.action';


export const Http = Axios.create({
    baseURL:rootUrl
})

export const HttpAuth = Axios.create({
    baseURL:apiUrl
})


export const disp = (msg) => dispatch=>{

    dispatch(changeNotify({
        open:true,
        class:'error',
        msg:'E-mail ou senha incorreto '
      }))
}

HttpAuth.interceptors.request.use(
 
    async (config) =>{
       
    
        config.headers = { 
            'Content-Type': 'application/json',
            'x-access-token': await localStorage.getItem('sgs_token'),
          }
          
       
        return config;
    }
)

HttpAuth.interceptors.response.use(response =>{
    
  
    if(response.data.auth){
       
        alert(response.data.message)
        window.location.replace('/familias');
    }
    return response;
},error =>{

 if(error.response){
     if(error.response.status === 401){
         localStorage.removeItem('sgs_token');
         window.location.replace('/login');
     }
 }
})