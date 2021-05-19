import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,cep,show,update} from '../../../store/actions/beneficio.action';
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

const Beneficio = (props) =>{

    const dispatch = useDispatch();
    const data = useSelector(state =>state.beneficioReducers);
    
    const [state,setState] = React.useState({
        isLoading:true,
        isLoadingCep:false,
        isDeleted:null,
        redirect:false,
        tips:0,
        confirmEl:null,
        
    })


    const beneficio_id = (props.match.params.id) ? props.match.params.id : null;
    
    React.useEffect(()=>{
        index();
        
        
       
    },[dispatch])



    const index = () =>{
  
        if(beneficio_id){
           
            dispatch(show(beneficio_id)).then(res =>{
                if(res){
                    if(res.payload.beneficio === null) {
                       
                        window.location.replace('/beneficio');
                    };
                    setState({...state,isLoading:false});
                   console.log("entrou")
                  
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
            {(data.success) && <Redirect to={`/beneficios`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                         
                        {/*Card Dados*/}
                        <h3 className="font-weight-normal mb-4">Benefício</h3>
                         
                        
                       
                    
                        
                         
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
                                        value={data.beneficio.nome || ''}
                                        />
                                        {(data.error.nome) && 
                                        <strong className="text-danger">{data.error.nome}</strong> 
                                        }
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="label-custom">Categoria</label>
                                        <TextField 
                                        error ={(data.error.categoria) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                categoria:text.target.value
                                            }))

                                            if(data.error.categoria) {
                                                delete data.error.categoria
                                            }
                                        }}
                                        value={data.beneficio.categoria || ''}
                                        />
                                        {(data.error.categoria) && 
                                        <strong className="text-danger">{data.error.categoria}</strong> 
                                        }
                                </div>
                            </div>

                            {/* Sobre*/}
                            <div className="row">
                                <div className="col-md-12 form-group">
                                <label className="label-custom  mb-1">Descricao </label>
                             
                                        <TextField 
                                            error ={(data.error.descricao) && true}
                                            
                                            onChange={text => {
                                                dispatch(change({
                                                    descricao:text.target.value
                                                }))

                                                if(data.error.descricao) {
                                                    delete data.error.descricao
                                                }
                                            }}
                                            value={data.beneficio.descricao || ''}
                                            multiline
                                                rows={10}
                                                rowsMax={30}
                                            />
                                            {(data.error.descricao) && 
                                            <strong className="text-danger">{data.error.descricao}</strong>
                                                
                                            }
                                </div>
                            </div>

                         

                                {/* Botao*/}
                                <div className="d-flex mt-4 pb-4 ">
                                    <Link to="/beneficios" style={{marginRight:"1em"}}>
                                        <Button variant="contained" size="large">Voltar</Button>
                                    </Link>
                                    {(beneficio_id)?
                                        <Button onClick={() =>dispatch(update(data.beneficio))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Atualizar
                                        </Button>
                                    :
                                        <Button onClick={() =>dispatch(store(data.beneficio))} variant="contained" color="primary" size="large">
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

export default Beneficio;