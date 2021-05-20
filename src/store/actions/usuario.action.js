import { Http, HttpAuth } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionTypes = {
    CHANGE: 'USUARIO_CHANGE',
    ERROR: 'USUARIO_ERROR',
    SUCCESS: 'USUARIO_SUCCESS',
    SHOW:'USUARIO_SHOW',
    INDEX:'USUARIO_INDEX',
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})


export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload
})

export const showResponse =(payload) => ({
    type: actionTypes.SHOW,
    payload,
})

export const index = () => dispatch => {
    return HttpAuth.get('/usuario')
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}

export const setUserToken = token => dispatch => {
    localStorage.setItem('sgs_token', token);
    dispatch( change({
        nome: '',
        email: '',
        senha: '',
        telefone:'',
    }) )

    dispatch(success(true))
}

export const store = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Cadastrando usuário...'
    }));
  
    return HttpAuth.post('/usuario', data)
        .then(res => {
            
            dispatch( changeLoading({open: false}) )
            if(typeof res !== 'undefined'){
                if(res.data.error){
                    dispatch(success(false));
                    dispatch(error(res.data.error));
                }
   
                if(res.status === 201){
                    dispatch(success(true));
                    dispatch( changeNotify({
                        open: true,
                        class: 'success',
                        msg: res.data.msg
                    }) )
                   
                }
            }
        })
        .catch(error => {
        
            dispatch( changeLoading({open: false}) )

            if(error.response) {
                dispatch(error(error.response.data.error))
            }
        })
}

export const update = (data) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando Usuario'
    }))

    return HttpAuth.put('/usuario/'+data.id,data)
           .then(res =>{
              
                 dispatch(changeLoading({open:false}) );
                 if(typeof res !== 'undefined'){
                    if(res.data.error){
                        dispatch(success(false));
                        dispatch(error(res.data.error));
                    }

                      if(res.status === 201){
                          dispatch(success(true));
                          dispatch(changeNotify({open:true,msg:res.data.msg}));
                         
                      }
                 }
           })
}


export const show = (id) => dispatch => {
    return HttpAuth.get('/usuario/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}


export const mudastatus = (id) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando Status'
    }))
 
    return HttpAuth.put('usuario/mudastatus/'+id)
           .then(res =>{
              
                 
                 dispatch(changeLoading({open:false}) );
                 if(typeof res !== 'undefined'){
                      if(res.data.error){
                          dispatch(success(false));
                          dispatch(error(res.data.error));
                      }

                      if(res.status === 201){
                        dispatch(success(false));
                          dispatch(changeNotify({open:true,msg:res.data.msg}));
                          dispatch(index());
                         
                      }
                 }
           })
}




export const usuariocompermissao = (id) => dispatch => {
    return HttpAuth.get('/usuario/usuariocompermissao/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}






