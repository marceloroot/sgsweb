import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,cep} from '../../../store/actions/equipamento.action';
import {changeNotify} from '../../../store/actions/notify.action';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,TextField,InputAdornment,Select,MenuItem,Switch,Button} from '@material-ui/core';
import  MaskedInput from 'react-text-mask';

const TextMaskedCustom = (props) =>{
    const {inputRef,...other} = props;
    let mask = [/[0-9]/, /\d/, /\d/, /\d/,/\d/, '-' ,/\d/,/\d/,/\d/];
    return(
        <MaskedInput
           {...other}
           ref={ref=>{ 
               inputRef(ref?ref.inputElement:null)
           }}
           mask={mask}
           guide={false}
        />
    )

}

const Equipamento = (props) =>{

    const dispatch = useDispatch();
    const data = useSelector(state =>state.equipamentoReducers);
    
    const [state,setState] = React.useState({
        isLoading:true,
        isLoadingCep:false,
        isDeleted:null,
        redirect:false,
        tips:0,
        confirmEl:null,
        
    })


    const equipamento_id = (props.match.params.id) ? props.match.params.id : null;
    
    React.useEffect(()=>{
        index();
        
        
       
    },[dispatch])



    const index = () =>{
  
        if(equipamento_id){
           
            dispatch(store(equipamento_id)).then(res =>{
               
                if(res){
                    setState({...state,isLoading:false});
                   
                  
                }

            })
            
           
        }else{
            setState({...state,isLoading:false});
        }

       
    }


    return (
        <>
        {console.log(data)}
        <div className="container-fluid h-100 ">
            <div className="row h-100">
            {(data.success) && <Redirect to={`/login`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                         {/*AQUI VAI CONTEDUO*/}
                            {/*Card Localização*/}
                            <h3 className="font-weight-normal mb-4">Equipamento</h3>
                           


                        <div className="card card-body  mb-4">
                            <div className="row">
                               <div className="col-md-7 form-group">
                                    <label className="label-custom">CEP</label>
                                    <TextField 
                                      style={(state.isLoadingCep) ?{opacity:0.5}:{}}
                                      error={(data.error.cep) && true}
                                      type="tel"
                                      InputProps={{
                                          inputComponent:TextMaskedCustom,
                                          value:data.equipamento.cep,
                                          onChange:text=>{
                                                 dispatch(change({ cep:text.target.value }));
                                                 if(text.target.value.length >8){
                                                      setState({...state,isLoadingCep:true})
                                                      dispatch(cep(text.target.value)).then(res=>{
                                                        setState({...state,isLoadingCep:false})
                                                        if(!res){
                                                            dispatch(changeNotify({open:true,class:'error',msg:'CEP invalido'}));
                                                            dispatch(change({numero:''}))
                                                            dispatch(change({cep:''}))
                                                            dispatch(change({uf:''}))
                                                            dispatch(change({logradouro:''}))
                                                            dispatch(change({localidade:''}))
                                                            dispatch(change({bairro:''}))
                                                        }

                                                      })
                                                    
                                                      if(data.error.cep){
                                                          delete data.error.cep;
                                                          delete data.error.uf;
                                                          delete data.error.logradouro;
                                                          delete data.error.localidade;
                                                          delete data.error.bairro;
                                                          
                                                          
                                                      } 
                                                }
                                          },
                                          endAdornment:(
                                                <InputAdornment position="start">
                                                    {(state.isLoadingCep) ? <CircularProgress size={32} />:<></>
                                                    }
                                                </InputAdornment>
                                          )
                                      }}
                                    />
                                    {(data.error.cep) && 
                                       <strong className="text-danger">{data.error.cep.cep[0]}</strong>
                                    }
                               </div>
                            </div>

                             
                                {/*Rua numero*/}
                              <div className="row">
                                <div className="col-md-9 form-group">
                                <label className="label-custom">Rua</label>
                                <TextField 
                                  error ={(data.error.logradouro) && true}
                                  disabled
                                  value={data.equipamento.logradouro || ''}
                                />
                                {(data.error.logradouro) && 
                                   <strong className="text-danger">{data.error.logradouro.logradouro[0]}</strong>
                                    
                                }
                                </div>
                                <div className="col-md-3 form-group">
                                <label className="label-custom">Numero</label>
                                <TextField 
                                  error ={(data.error.numero) && true}
                                  onChange={text => {
                                      dispatch(change({
                                        numero:text.target.value
                                      }))
                                      if(data.error.numero) {
                                        delete data.error.numero
                                    }
                                  }}
                                  value={data.equipamento.numero || ''}
                                />
                                {(data.error.numero) && 
                                   <strong className="text-danger">{data.error.numero.numero[0]}</strong>
                                    
                                }
                                </div>
                            </div>



                             {/*bairro*/}
                             <div className="row">
                                <div className="col-md-12 form-group">
                                <label className="label-custom">Bairro</label>
                                <TextField 
                                  error ={(data.error.bairro) && true}
                                  disabled
                                  value={data.equipamento.bairro || ''}
                                />
                                {(data.error.bairro) && 
                                   <strong className="text-danger">{data.error.bairro.bairro[0]}</strong>
                                    
                                }
                                </div>
                               
                            </div>


                            {/*cidade e uf*/}
                            <div className="row">
                                <div className="col-md-9 form-group">
                                <label className="label-custom">Cidade</label>
                                <TextField 
                                  error ={(data.error.localidade) && true}
                                  disabled
                                  value={data.equipamento.localidade || ''}
                                />
                                {(data.error.localidade) && 
                                   <strong className="text-danger">{data.error.localidade.localidade[0]}</strong>
                                    
                                }
                                </div>
                                <div className="col-md-3 form-group">
                                <label className="label-custom">UF</label>
                                <TextField 
                                  error ={(data.error.uf) && true}
                                  disabled
                                  value={data.equipamento.uf || ''}
                                />
                                {(data.error.uf) && 
                                   <strong className="text-danger">{data.error.uf.uf[0]}</strong>
                                    
                                }
                                </div>
                            </div>

                        </div>


                           
                         </>
                       
                      

                      }

                   
                  
                 
       
              </div>
            </div>
        </div>
      
        </>
    )
}

export default Equipamento;