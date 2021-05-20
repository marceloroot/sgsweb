import { Http, HttpAuth } from '../../config/Http'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'

export const actionTypes = {
    CHANGE: 'PERMISSAO_CHANGE',
    ERROR: 'PERMISSAO_ERROR',
    SUCCESS: 'PERMISSAO_SUCCESS',
    SHOW:'PERMISSAO_SHOW',
    INDEX:'PERMISSAO_INDEX',
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
    return HttpAuth.get('/permissao')
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
}





export const show = (id) => dispatch => {
    return HttpAuth.get('/usuario/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}


export const mudastatus = (id,userid) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando Status'
    }))
 
    return HttpAuth.put('permissao/'+userid+'/editpermissao/'+id)
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
                        
                         
                      }
                 }
           })
}








