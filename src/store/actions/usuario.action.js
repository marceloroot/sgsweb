import { Http, HttpAuth } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionTypes = {
    CHANGE: 'USUARIO_CHANGE',
    ERROR: 'USUARIO_ERROR',
    SUCCESS: 'USUARIO_SUCCESS'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const errors = (payload) => ({
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
                    dispatch(errors(res.data));
                    
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
                dispatch(errors(error.response.data.errors))
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
                          dispatch(errors(res.data.error));
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









