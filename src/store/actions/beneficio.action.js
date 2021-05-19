import { Http, HttpAuth } from '../../config/Http'
import { changeAlert } from './alert.action'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'
import axios from 'axios';
export const actionTypes  = {
    INDEX:"BENEFICIO_INDEX",
    CHANGE:"BENEFICIO_CHANGE",
    ERROR:"BENEFICIO_ERROR",
    SUCCESS:"BENEFICIO_SUCCESS",
    SHOW:'BENEFICIO_SHOW',
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
    return HttpAuth.get('/beneficio/')
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}

export const show = (id) => dispatch => {
    return HttpAuth.get('/beneficio/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}



export const store = (data) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Cadastrando Inscricao'
    }))
  
    return HttpAuth.post('/beneficio/', data)
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




