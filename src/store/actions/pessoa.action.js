import { Http, HttpAuth } from '../../config/Http'
import { changeAlert } from './alert.action'
import { changeLoading } from './loading.action'
import { changeNotify } from './notify.action'
import axios from 'axios';
export const actionTypes  = {
    INDEX:"PESSOA_INDEX",
    CHANGE:"PESSOA_CHANGE",
    ERROR:"PESSOA_ERROR",
    SUCCESS:"PESSOA_SUCCESS",
    SHOW:'PESSOA_SHOW',
    SHOWRESPONSAVEL:'PESSOA_SHOWRESPONSAVEL',
    
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

export const showResponseResponsavel =(payload) => ({
    type: actionTypes.SHOWRESPONSAVEL,
    payload,
})


export const index = (id) => dispatch => {
    if(id){
        return HttpAuth.get('/familiar/'+id)
        .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
    }
    else{
        return HttpAuth.get('/pessoa/')
        .then(res => typeof res !== 'undefined' && dispatch(indexResponse(res.data)))
    }
}

export const show = (id) => dispatch => {
   
    return HttpAuth.get('/pessoa/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponse(res.data)))
    
}


export const showResponsavel = (id) => dispatch => {
   
    return HttpAuth.get('/familiar/show/'+id)
    .then(res => typeof res !== 'undefined' && dispatch(showResponseResponsavel(res.data)))
    
}



export const store = (data,id) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Cadastrando Familia'
    }))
    //fazer isso pegar do usuario logado
    
    if(id){
        
        return HttpAuth.post('/familiar/'+id, data)
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
    else{
    return HttpAuth.post('/pessoa/', data)
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

}


export const update = (data,id) => dispatch =>{
    dispatch(changeLoading({
        open:true,
        msg:'Atualizando PESSOA'
    }))
    if(id){
     
        return HttpAuth.put('/familiar/'+data.id+'/chefe/'+id,data)
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
    else{
    return HttpAuth.put('/pessoa/'+data.id,data)
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


export const cpf = (cpf) => dispatch =>{
   
    if(!validacpf(cpf)){
       
       return false;
       
    }
    else{
       return true;
       
    }

}

const validacpf = (cpf) => {
    const isRepeatingNumber = str => /^(\d)(\1){10}$/.test(str);
	 cpf = cpf.replace(/\D/g, '');

	if (
		cpf === '' ||
		cpf.length !== 11 ||
		!/^\d{11}$/.test(cpf) ||
		isRepeatingNumber(cpf)
	) {
		return false;
	}

	const digits = cpf.split('').map(x => parseInt(x));

	for (let j = 0; j < 2; j++) {
		let sum = 0;

		for (let i = 0; i < 9 + j; i++) {
			sum += digits[i] * (10 + j - i);
		}

		let checkDigit = 11 - (sum % 11);

		if (checkDigit === 10 || checkDigit === 11) {
			checkDigit = 0;
		}

		if (checkDigit !== digits[9 + j]) {
			return false;
		}
	}

	return true;
};

