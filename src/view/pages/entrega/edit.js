import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,show,update,indexResponse} from '../../../store/actions/entrega.action';
import {pessoacombeneficio as showResponsavel} from '../../../store/actions/pessoa.action';
import {changeNotify} from '../../../store/actions/notify.action';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,TextField,Button, Select, MenuItem} from '@material-ui/core';
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

const Entrega = (props) =>{

    const dispatch = useDispatch();
    const data = useSelector(state =>state.entregaReducers);
    const dataResponsavel = useSelector(state =>state.pessoaReducers);
    const [state,setState] = React.useState({
        isLoading:true,
        isLoadingCep:false,
        isDeleted:null,
        redirect:false,
        tips:0,
        confirmEl:null,
        
    })


    const pessoa_id = (props.match.params.id) ? props.match.params.id : null;
    

    const entrega_id = (props.match.params.identrega) ? props.match.params.identrega : null;

    React.useEffect(()=>{
        index();
        
        
       
    },[dispatch])
   
    React.useEffect(()=>{
        return () =>{
          
             dispatch(indexResponse({success:false}))
            
        }
        

     },[])


    const index = () =>{
  
        dispatch(showResponsavel(pessoa_id)).then(res =>{
            
            if(res.payload.pessoa){
                if(entrega_id){
           
                    dispatch(show(entrega_id)).then(res =>{
                        if(res){
                            if(res.payload.beneficio === null) {
                               
                                window.location.replace('/beneficio');
                            };
                            setState({...state,isLoading:false});
                          
                        }
                       
        
                    })
                    
                   
                }else{
                    setState({...state,isLoading:false});
                }
            }
            else{
                alert("Pessoa não existe")
                window.location.replace('/familias');
            }
           

        })

       
    }


    return (
        <>
       
        <div className="container-fluid h-100 ">
            <div className="row h-100">
                {console.log(data)}
            {(data.success) && <Redirect to={`/entregas/${pessoa_id}`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                         
                        {/*Card Dados*/}
                        <h3 className="font-weight-normal mb-4">Entrega de Benefício</h3>
                         
                        
                        <h3 style={{fontSize:"1.5rem",textTransform: 'uppercase'}} className="font-weight-normal mb-4">{dataResponsavel.pessoa.nome} CPF: {dataResponsavel.pessoa.cpf}</h3>
                       
                    
                   
                         
                         {/*Codito da pessoa*/}
                         <div className="card card-body  mb-4">
                         <div className="row   mb-2">
                               

                                    <div className="col-md-3 form-group">
                                        <label className="label-custom">Beneficios</label>
                                        <Select
                                        error ={(data.error.beneficios_id) && true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.entrega.beneficios_id}
                                        onChange={text => {
                                            dispatch(change({
                                                beneficios_id:text.target.value
                                            }))

                                            if(data.error.beneficios_id) {
                                                delete data.error.beneficios_id
                                            }
                                        }}
                                        
                                        >
                                      {dataResponsavel.pessoa.beneficios.map(beneficio=>(
                                        <MenuItem  value={beneficio.id}>{beneficio.nome}</MenuItem>
                                        ))}
                                     
                                    
                                       
                                    </Select>
                                    {(data.error.beneficios_id) && 
                                        <strong className="text-danger">{data.error.beneficios_id}</strong> 
                                    }
                                    </div>


                                    <div className="col-md-6 form-group">
                                        <label className="label-custom">Quantidade</label>
                                        <TextField 
                                        error ={(data.error.quantidade) && true}
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                                        onChange={text => {
                                            dispatch(change({
                                                quantidade:text.target.value
                                            }))

                                            if(data.error.quantidade) {
                                                delete data.error.quantidade
                                            }
                                        }}
                                        value={data.entrega.quantidade || ''}
                                        />
                                        {(data.error.quantidade) && 
                                        <strong className="text-danger">{data.error.quantidade}</strong> 
                                        }
                                    </div>

                                  
                            </div>

                          

                            {/* Sobre*/}
                            <div className="row  mb-2">
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
                                            value={data.entrega.observacao || ''}
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
                                    <Link to="/beneficios" style={{marginRight:"1em"}}>
                                        <Button variant="contained" size="large">Voltar</Button>
                                    </Link>
                                    {(entrega_id)?
                                        <Button onClick={() =>dispatch(update(data.entrega,dataResponsavel.pessoa.id))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Atualizar
                                        </Button>
                                    :
                                        <Button onClick={() =>dispatch(store(data.entrega,dataResponsavel.pessoa.id))} variant="contained" color="primary" size="large">
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

export default Entrega;