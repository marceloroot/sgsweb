import { Http, HttpAuth } from '../../config/Http'
import { changeAlert } from './alert.action'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'
import axios from 'axios';

export const actionTypes  = {
    INDEX:"ENTREGA_INDEX",
    CHANGE:"ENTREGA_CHANGE",
    ERROR:"ENTREGA_ERROR",
    SUCCESS:"ENTREGA_SUCCESS",
    SHOW:'ENTREGA_SHOW',
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

//INDEX

export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload
})

export const showResponse =(payload) => ({
    type: actionTypes.SHOW,
    payload,
})


export const index = (id) => dispatch => {
    return HttpAuth.get('/entrega/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}

export const show = (id) => dispatch => {
    return HttpAuth.get('/entrega/show/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}



export const store = (data,pessoaid) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Cadastrando Inscricao'
    }))
  
    return HttpAuth.post('/entrega/'+pessoaid, data)
    .then(res =>{
       
        dispatch(changeLoading({open:false}) );
        if(typeof res !== 'undefined'){
            
             if(res.data.error){
                console.log(res.data.error);
                 dispatch(success(false));
                 dispatch(error(res.data.error));
             }

        else if(res.status === 201){
             dispatch(success(true));
             dispatch(changeNotify({open:true,msg:res.data.msg}));
             window.open(`/emissao/${res.data.data.id}`, '_blank');
         }
        }
   })

}


export const update = (data) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando Beneficio'
    }))

    return HttpAuth.put('/beneficio/'+data.id,data)
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


export const mudastatus = (id,pessoaid) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando Status'
    }))
 
    return HttpAuth.put('/entrega/'+id)
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
                          dispatch(index(pessoaid));
                         
                      }
                 }
           })
}











