import { Http, HttpAuth } from '../../config/Http'
import { changeAlert } from './alert.action'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'
import axios from 'axios';
export const actionTypes  = {
    INDEX:"EQUIPAMENTO_INDEX",
    CHANGE:"EQUIPAMENTO_CHANGE",
    ERROR:"EQUIPAMENTO_ERROR",
    SUCCESS:"EQUIPAMENTO_SUCCESS",
    SHOW:'EQUIPAMENTO_SHOW',
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
    return HttpAuth.get('/registration/index/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(indexResponse({inscricaos:[res.data]})))
}

export const show = (id) => dispatch => {
    return HttpAuth.get('/equipamento/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
}



export const store = (data) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Cadastrando Inscricao'
    }))
  
    return HttpAuth.post('/equipamento/', data)
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
        msg:'Atualizando Equipamento'
    }))

    return HttpAuth.put('/equipamento/'+data.id,data)
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




export const cep =(cep) => dispatch =>{
    if(cep.length >8){
        var cep3 = cep;
    
          var cepUrl = 'https://viacep.com.br/ws/' + cep3 + '/json/';
        
         // return axios.get(cepUrl).then(res => typeof res !== 'undefined' && dispatch(change(res.data)));

    

          return axios.get(cepUrl).then(res => {
       
              if(!res.data.erro){
                let enderco = {
                   "cep" :res.data.cep,
                   "uf" :res.data.uf,
                   "logradouro":res.data.logradouro,
                   "localidade" : res.data.localidade,
                   "bairro" :res.data.bairro

                  }
                
                 dispatch(change(enderco))
                 return true
                }
                return false
            
          });
    }
}
