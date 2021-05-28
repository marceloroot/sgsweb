import {Http, HttpAuth} from '../../config/Http';
import {changeLoading} from './loading.action';
import { changeNotify } from './notify.action';

export const actionTypes = {
    CHANGE: 'AUTH_CHANGE',
    SUCCESS: 'AUTH_SUCCESS',
    INDEX:'AUTH_INDEX',
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch =>{

    localStorage.setItem('sgs_token',token);
    dispatch( change({
        email:'',
        password:''
    }) );

    dispatch(success(true));



}


export const login = credentials => dispatch=>{

    dispatch(changeLoading({
       open:true,
       msg:'Autenticando usuário',
   }))
  

   return Http.post('usuario/authenticate',{
    email: credentials.email,
    password:credentials.password
   })
   .then(res => {
    dispatch(changeLoading({open:false}) );

       if(typeof res !== 'undefined'){
            if(res.data.access_token){
                dispatch(setUserToken(res.data.access_token))
            }
       }
   })
  .catch(error =>{
     
      dispatch(changeLoading({open:false}) );

      if(typeof error.response !== 'undefined'){
           if(error.response.status === 401 || error.response.status === 400){
                  dispatch(changeNotify({
                      open:true,
                      class:'error',
                      msg:'E-mail ou senha incorreto '
                    }))
           }
      }else{
        dispatch(changeNotify({
            open:true,
            class:'error',
            msg:'Erro ao se conectar ao servidor'
          }))
      }
   })

}


export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload
})
export const  usuarios = () =>dispatch =>{
    return HttpAuth.get('/usuarios')
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}

export  const deslogar= () => dispatch=>{
    localStorage.removeItem('sgs_token');
    window.location.replace('/login');
}

