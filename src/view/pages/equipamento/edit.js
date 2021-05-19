import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,cep,show,update} from '../../../store/actions/equipamento.action';
import {changeNotify} from '../../../store/actions/notify.action';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,TextField,InputAdornment,Button} from '@material-ui/core';
import  MaskedInput from 'react-text-mask';
import { FaSave } from 'react-icons/fa';

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
           
            dispatch(show(equipamento_id)).then(res =>{
                if(res){
                    if(res.payload.equipamento === null) {
                       
                        window.location.replace('/equipamento');
                    };
                    setState({...state,isLoading:false});
                   
                  
                }
               

            })
            
           
        }else{
            setState({...state,isLoading:false});
        }

       
    }


    return (
        <>
       
        <div className="container-fluid h-100 ">
            <div className="row h-100">
            {(data.success) && <Redirect to={`/equipamentos`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                         
                        {/*Card Localização*/}
                        <h3 className="font-weight-normal mb-4">Equipamento</h3>
                         
                        {/* cep e bairro*/}
                        <div className="card card-body  mb-4">
                            <div className="row">
                               <div className="col-md-4 form-group">
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
                                       <strong className="text-danger">{data.error.cep}</strong>
                                    }
                               </div>
                           
                                <div className="col-md-8 form-group">
                                <label className="label-custom">Bairro</label>
                                <TextField 
                                  error ={(data.error.bairro) && true}
                                  disabled
                                  value={data.equipamento.bairro || ''}
                                />
                                {(data.error.bairro) && 
                                   <strong className="text-danger">{data.error.bairro}</strong>
                                    
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
                                   <strong className="text-danger">{data.error.logradouro}</strong>
                                    
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
                                   <strong className="text-danger">{data.error.numero}</strong>
                                    
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
                                   <strong className="text-danger">{data.error.localidade.localidade}</strong>
                                    
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
                                   <strong className="text-danger">{data.error.uf.uf}</strong>
                                    
                                }
                                </div>
                            </div>

                        </div>

                         {/*Card Dados*/}
                        
                         
                         {/* Nome e Responsavel*/}
                         <div className="card card-body  mb-4">
                         
                            <div className="row">
                                <div className="col-md-6 form-group">
                                        <label className="label-custom">Nome</label>
                                        <TextField 
                                        error ={(data.error.nome) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                nome:text.target.value
                                            }))

                                            if(data.error.nome) {
                                                delete data.error.nome
                                            }
                                        }}
                                        value={data.equipamento.nome || ''}
                                        />
                                        {(data.error.nome) && 
                                        <strong className="text-danger">{data.error.nome}</strong> 
                                        }
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="label-custom">Responsavel</label>
                                        <TextField 
                                        error ={(data.error.responsavel) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                responsavel:text.target.value
                                            }))

                                            if(data.error.responsavel) {
                                                delete data.error.responsavel
                                            }
                                        }}
                                        value={data.equipamento.responsavel || ''}
                                        />
                                        {(data.error.responsavel) && 
                                        <strong className="text-danger">{data.error.responsavel}</strong> 
                                        }
                                </div>
                            </div>

                            {/* Sobre*/}
                            <div className="row">
                                <div className="col-md-12 form-group">
                                <label className="label-custom  mb-1">Sobre </label>
                             
                                        <TextField 
                                            error ={(data.error.sobre) && true}
                                            
                                            onChange={text => {
                                                dispatch(change({
                                                    sobre:text.target.value
                                                }))

                                                if(data.error.sobre) {
                                                    delete data.error.sobre
                                                }
                                            }}
                                            value={data.equipamento.sobre || ''}
                                            multiline
                                                rows={10}
                                                rowsMax={30}
                                            />
                                            {(data.error.sobre) && 
                                            <strong className="text-danger">{data.error.sobre}</strong>
                                                
                                            }
                                </div>
                            </div>

                             {/* Observacçao*/}
                             <div className="row">
                                <div className="col-md-12 form-group">
                                <label className="label-custom  mb-1">Observacao </label>
                             
                                        <TextField 
                                            error ={(data.error.observacao) && true}
                                            
                                            onChange={text => {
                                                dispatch(change({
                                                    observacao:text.target.value
                                                }))

                                                if(data.error.observacao) {
                                                    delete data.error.observacao
                                                }
                                            }}
                                            value={data.equipamento.observacao || ''}
                                            multiline
                                                rows={10}
                                                rowsMax={30}
                                            />
                                            {(data.error.observacao) && 
                                            <strong className="text-danger">{data.error.observacao}</strong>
                                                
                                            }
                                </div>
                            </div>

                                {/* Botao*/}
                                <div className="d-flex mt-4 pb-4 ">
                                    <Link to="/login" style={{marginRight:"1em"}}>
                                        <Button variant="contained" size="large">Voltar</Button>
                                    </Link>
                                    {(equipamento_id)?
                                        <Button onClick={() =>dispatch(update(data.equipamento))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Atualizar
                                        </Button>
                                    :
                                        <Button onClick={() =>dispatch(store(data.equipamento))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Salva
                                        </Button>
                                    }
                                    
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