import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,show,update} from '../../../store/actions/usuario.action';
import {index} from '../../../store/actions/equipamento.action';
import {changeNotify} from '../../../store/actions/notify.action';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,TextField,InputAdornment,Button, Select, MenuItem} from '@material-ui/core';

import { FaSave } from 'react-icons/fa';



const Usuario = (props) =>{

    const dispatch = useDispatch();
    const data = useSelector(state =>state.usuarioReducers);
    const dataEquipamento = useSelector(state =>state.equipamentoReducers);

    const [state,setState] = React.useState({
        isLoading:true,
        isLoadingCep:false,
        isDeleted:null,
        redirect:false,
        tips:0,
        confirmEl:null,
        
    })


    const usuario_id = (props.match.params.id) ? props.match.params.id : null;
    
    React.useEffect(()=>{

        dispatch(index()).then(res=>{
            if(res){
            _index();
        }
        })
        
       
        
       
    },[dispatch])



    const _index = () =>{
   
        if(usuario_id){
           
            dispatch(show(usuario_id)).then(res =>{
                if(res){
                    if(res.payload.usuario === null) {
                       
                        window.location.replace('/usuario');
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
            {(data.success) && <Redirect to={`/usuarios`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                        
                        {/*Card Dados*/}
                        <h3 className="font-weight-normal mb-4">Usuario</h3>
                         
                        
                       
                    
                        
                         
                         {/* Nome e email*/}
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
                                        value={data.usuario.nome || ''}
                                        />
                                        {(data.error.nome) && 
                                        <strong className="text-danger">{data.error.nome}</strong> 
                                        }
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="label-custom">Email</label>
                                        <TextField 
                                        error ={(data.error.email) && true}
                                        type="email"
                                        onChange={text => {
                                            dispatch(change({
                                                email:text.target.value
                                            }))

                                            if(data.error.email) {
                                                delete data.error.email
                                            }
                                        }}
                                        value={data.usuario.email || ''}
                                        
                                        />
                                        {(data.error.email) && 
                                        <strong className="text-danger">{data.error.email}</strong> 
                                        }
                                </div>
                            </div>

                            {/* Password*/}
                            <div className="row">
                                <div className="col-md-6 form-group">
                                <label className="label-custom  mb-1">Senha </label>
                             
                                        <TextField 
                                            error ={(data.error.senha) && true}
                                            
                                            onChange={text => {
                                                dispatch(change({
                                                    senha:text.target.value
                                                }))

                                                if(data.error.senha) {
                                                    delete data.error.senha
                                                }
                                            }}
                                            value={data.usuario.senha || ''}
                                            
                                            />
                                            {(data.error.senha) && 
                                            <strong className="text-danger">{data.error.senha}</strong>
                                                
                                            }
                                            {console.log(data.error.nome)}
                                </div>

                                
                                <div className="col-md-6 form-group">
                                        <label className="label-custom">Telefone</label>
                                        <TextField 
                                        error ={(data.error.telefone) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                telefone:text.target.value
                                            }))

                                            if(data.error.telefone) {
                                                delete data.error.telefone
                                            }
                                        }}
                                        value={data.usuario.telefone || ''}
                                        
                                        />
                                        {(data.error.telefone) && 
                                        <strong className="text-danger">{data.error.telefone}</strong> 
                                        }
                                </div>
                            
                                <div className="col-md-6 form-group">
                                <label className="label-custom">Equipamento</label>
                                    <Select
                                        error ={(data.error.equipamento_id) && true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.usuario.equipamento_id}
                                        onChange={text => {
                                            dispatch(change({
                                                equipamento_id:text.target.value
                                            }))

                                            if(data.error.equipamento_id) {
                                                delete data.error.equipamento_id
                                            }
                                        }}
                                        
                                        >
                                      { dataEquipamento.equipamentos.map(equipamento=>{
                                          return(
                                          (data.usuario.equipamento_id == equipamento.id) ? <MenuItem  value={equipamento.id}>{equipamento.nome}</MenuItem>: <MenuItem value={equipamento.id}>{equipamento.nome}</MenuItem>
                                         
                                          )
                                        })}
                                        
                                       
                                    </Select>
                                    {(data.error.equipamento_id) && 
                                        <strong className="text-danger">{data.error.equipamento_id}</strong> 
                                        }
                                </div>

                                
                            </div>

                         

                                {/* Botao*/}
                                <div className="d-flex mt-4 pb-4 ">
                                    <Link to="/usuarios" style={{marginRight:"1em"}}>
                                        <Button variant="contained" size="large">Voltar</Button>
                                    </Link>
                                    {(usuario_id)?
                                        <Button onClick={() =>dispatch(update(data.usuario))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Atualizar
                                        </Button>
                                    :
                                        <Button onClick={() =>dispatch(store(data.usuario))} variant="contained" color="primary" size="large">
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

export default Usuario;