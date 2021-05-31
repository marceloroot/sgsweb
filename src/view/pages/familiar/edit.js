import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {store,change,cep,show,update,cpf, showResponsavel,indexResponse} from '../../../store/actions/pessoa.action';
import {changeNotify} from '../../../store/actions/notify.action';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";
import {useSelector,useDispatch} from 'react-redux';

import {CircularProgress,TextField,InputAdornment,Button, Select, MenuItem,Switch} from '@material-ui/core';
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


const TextMaskedCpf = (props) =>{
    const {inputRef,...other} = props;
    let mask = [/[0-9]/,/\d/,/\d/,'.',/\d/,/\d/,/\d/, '.' ,/\d/,/\d/,/\d/,'-',/\d/,/\d/];
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


const Pessoa = (props) =>{

    const dispatch = useDispatch();
    const data = useSelector(state =>state.pessoaReducers);
    
    const [state,setState] = React.useState({
        isLoading:true,
        isLoadingCep:false,
        isDeleted:null,
        redirect:false,
        tips:0,
        confirmEl:null,
        isLoadingCpf:false,
        
    })


    const pessoa_id = (props.match.params.id) ? props.match.params.id : null;
    const chefe_id = (props.match.params.idchefe) ? props.match.params.idchefe : null;

    React.useEffect(()=>{
        index();
        
        
       
    },[dispatch])
    
    React.useEffect(()=>{
        return () =>{
             dispatch(indexResponse({success:false}))
           
        }
        

     },[])


    const index = () =>{
           
        dispatch(showResponsavel(chefe_id)).then(res =>{
            if(res){
             }
           
        })
        if(pessoa_id){
           
            dispatch(show(pessoa_id)).then(res =>{
                if(res){
                    if(res.payload.pessoa === null) {
                       
                        window.location.replace('/familias');
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
            {(data.success) && <Redirect to={`/familiares/${chefe_id}`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(state.isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                       
                         {/*Card Dados*/}
                         <h3 style={{fontSize:"1.5rem"}} className="font-weight-normal mb-4">Responsavel: {data.responsavel.nome}</h3>
                         <h3 style={{fontSize:"1.3rem"}} className="font-weight-normal mb-4">CPF: {data.responsavel.cpf}</h3>
                         {/* Nome e pessoa*/}
                         <div className="card card-body  mb-4">
                         
                            <div className="row">
                                <div className="col-md-6 form-group">
                                        <label className="label-custom">Nome do Familiar</label>
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
                                        value={data.pessoa.nome || ''}
                                        />
                                        {(data.error.nome) && 
                                        <strong className="text-danger">{data.error.nome}</strong> 
                                        }
                                    </div>
                                    

                                    <div className="col-md-3 form-group">           
                                    <label className="label-custom">CPF</label>
                                                 <TextField 
                                                        style={(state.isLoadingCpf) ?{opacity:0.5}:{}}
                                                            error ={(data.error.cpf) && true}
                                                            
                                                            type="tel"
                                                            InputProps={{
                                                                inputComponent:TextMaskedCpf,
                                                                value:data.pessoa.cpf,
                                                                onChange:text=>{
                                                                        dispatch(change({ cpf:text.target.value }));
                                                                        if(data.error.cpf) {
                                                                            delete data.error.cpf
                                                                        }
                                                                        if(text.target.value.length > 13){
                                                                    
                                                                            setState({...state,isLoadingCpf:true})
                                                                        if(dispatch(cpf(text.target.value))){
                                                                            dispatch(changeNotify({open:true,class:'success',msg:'CPF valido'}))
                                                                            setState({...state,isLoadingCpf:false})
                                                                            
                                                                        }
                                                                        else{
                                                                            dispatch(changeNotify({open:true,class:'error',msg:'CPF Invalido'}))
                                                                           
                                                                            dispatch(change({cpf:''}))
                                                                            setState({...state,isLoadingCpf:false})
                                                                          

                                                                        }}
                                                                },
                                                                endAdornment:(
                                                                        <InputAdornment position="start">
                                                                            {(state.isLoadingCpf) ? <CircularProgress size={32} />:<></>
                                                                            }
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                    />
                                    
                              
                             
                                        {(data.error.cpf) && 
                                        <strong className="text-danger">{data.error.cpf}</strong>
                                            
                                        }

                                    </div>
                                    
                                    <div className="col-md-3 form-group">
                                        <label className="label-custom">Sexo</label>
                                        <Select
                                        error ={(data.error.sexo) && true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.pessoa.sexo}
                                        onChange={text => {
                                            dispatch(change({
                                                sexo:text.target.value
                                            }))

                                            if(data.error.sexo) {
                                                delete data.error.sexo
                                            }
                                        }}
                                        
                                        >
                                     <MenuItem  value={"M"}>Masculino</MenuItem>
                                     <MenuItem  value={"F"}>Feminino</MenuItem>
                                       
                                    </Select>
                                    {(data.error.sexo) && 
                                        <strong className="text-danger">{data.error.sexo}</strong> 
                                    }
                                    </div>

                            </div>

                            {/* datanasc rg telefone escolaridade*/}
                            <div className="row mt-3">

                                <div className="col-md-3 form-group">
                                <label className="label-custom  ">Data Nascimento </label>
                               
                                <TextField 
                                    error ={(data.error.datanascimento) && true}
                                    
                                    onChange={text => {
                                        dispatch(change({
                                            datanascimento:text.target.value
                                        }))

                                        if(data.error.datanascimento) {
                                            delete data.error.datanascimento
                                        }
                                    }}
                                    value={data.pessoa.datanascimento || ''}
                                        type="date"
                                        
                                    
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                />
                                    {(data.error.datanascimento) && 
                                    <strong className="text-danger">{data.error.datanascimento}</strong>
                                        
                                    }
                                </div>
                           
                                <div className="col-md-3 form-group">
                                        <label className="label-custom">RG</label>
                                        <TextField 
                                        error ={(data.error.rg) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                rg:text.target.value
                                            }))

                                            if(data.error.rg) {
                                                delete data.error.rg
                                            }
                                        }}
                                        value={data.pessoa.rg || ''}
                                        />
                                        {(data.error.rg) && 
                                        <strong className="text-danger">{data.error.rg}</strong> 
                                        }
                                    </div>
                            
                                <div className="col-md-3 form-group">
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
                                   value={data.pessoa.telefone || ''}
                                />
                                  {(data.error.telefone) && 
                                        <strong className="text-danger">{data.error.telefone}</strong> 
                                  }             
                                
                                </div>                        
                             
                                <div className="col-md-3 form-group">
                                        <label className="label-custom">Escolaridade</label>
                                        <Select
                                        error ={(data.error.escolaridade) && true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.pessoa.escolaridade}
                                        onChange={text => {
                                            dispatch(change({
                                                escolaridade:text.target.value
                                            }))

                                            if(data.error.escolaridade) {
                                                delete data.error.escolaridade
                                            }
                                        }}
                                        
                                        >
                                     <MenuItem  value={"Educação básica"}>Educação básica</MenuItem>
                                     <MenuItem  value={"Educação infantil"}>Educação infantil</MenuItem>
                                     <MenuItem  value={"Ensino fundamental"}>Ensino fundamental</MenuItem>
                                     <MenuItem  value={"Ensino superior"}>Ensino superior</MenuItem>
                                     <MenuItem  value={"Pós-graduação"}>Pós-graduação</MenuItem>
                                     <MenuItem  value={"Mestrado"}>Pós-graduação</MenuItem>
                                     <MenuItem  value={"Doutorado"}>Doutorado</MenuItem>

                                    </Select>
                                    {(data.error.escolaridade) && 
                                        <strong className="text-danger">{data.error.escolaridade}</strong> 
                                    }
                                    </div>
 

   
                            </div>
                             

                             {/* estado civil renda */}
                            <div className="row mt-3">
                                              
                                {/* estado civil */}
                                <div className="col-md-3 form-group">
                                    <label className="label-custom">Estado Civíl</label>
                                    <Select
                                        error ={(data.error.estadocivil) && true}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.pessoa.estadocivil}
                                        onChange={text => {
                                        dispatch(change({
                                            estadocivil:text.target.value
                                        }))

                                        if(data.error.estadocivil) {
                                            delete data.error.estadocivil
                                        }
                                        }}
                                            
                                    >
                                        
                                        <MenuItem  value={"Solteiro(a)"}>Solteiro(a)</MenuItem>
                                        <MenuItem  value={"Casado(a)"}>Casado(a)</MenuItem>
                                        <MenuItem  value={"Divorciado(a)"}>Divorciado(a)</MenuItem>
                                        <MenuItem  value={"Viuvo(a)"}>Viuvo(a)</MenuItem>
                                        
                                        </Select>
                                        {(data.error.estadocivil) && 
                                            <strong className="text-danger">{data.error.estadocivil}</strong> 
                                        }
                                        </div>
                
                                        {/* Parantesco */}
                                        <div className="col-md-3 form-group">
                                            <label className="label-custom">Parentesco</label>
                                            <Select
                                                error ={(data.error.parentesco) && true}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={data.pessoa.parentesco}
                                                onChange={text => {
                                                dispatch(change({
                                                    parentesco:text.target.value
                                                }))

                                                if(data.error.parentesco) {
                                                    delete data.error.parentesco
                                                }
                                                }}
                                                    
                                            >
                                                
                                                <MenuItem  value={"Filho(a)"}>Filho(a)</MenuItem>
                                                <MenuItem  value={"Primo(a)"}>Primo(a)</MenuItem>
                                                <MenuItem  value={"Irmão(a)"}>Irmão(a)</MenuItem>
                                                <MenuItem  value={"Cunhado(a)"}>Cunhado(a)</MenuItem>
                                                <MenuItem  value={"Outros"}>Outros</MenuItem>

                                                </Select>
                                                {(data.error.parentesco) && 
                                                    <strong className="text-danger">{data.error.parentesco}</strong> 
                                                }
                                        </div>
                                

                                {/* Renda */}
                                <div className="col-md-3 form-group">
                                    <label className="label-custom">Renda</label>
                                    <TextField 
                                        error ={(data.error.renda) && true}
                                        type="number"
                                        onChange={text => {
                                            dispatch(change({
                                                renda:text.target.value
                                            }))
                                            if(data.error.renda) {
                                            delete data.error.renda
                                            }
                                        }}

                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        value={data.pessoa.renda || ''}
                                    />
                                    {(data.error.renda) && 
                                        <strong className="text-danger">{data.error.renda}</strong> 
                                    }
                                </div>

                                <div className="col-md-3 mt-5 form-group">
                                <label className="label-custom">CTP Assinada</label>
                                    <Switch
                                        checked={
                                            (data.pessoa.ctpsassinada == 1) ? true : false
                                        }
                                        error ={(data.error.ctpsassinada) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                ctpsassinada:text.target.checked
                                            }))

                                            if(data.error.ctpsassinada) {
                                                delete data.error.ctpsassinada
                                            }
                                        }}
                                        value={
                                            (data.pessoa.ctpsassinada) ? 1 : 0
                                        }
                                    />
                                    {(data.error.ctpsassinada) && 
                                    <strong className="text-danger">{data.error.ctpsassinada}</strong> 
                                    }
                                </div>


                                <div className="col-md-3 mt-5 form-group">
                                <label className="label-custom">PPCL</label>
                                    <Switch
                                        checked={
                                            (data.pessoa.ppcl == 1) ? true : false
                                        }
                                        error ={(data.error.ppcl) && true}
                                        onChange={text => {
                                            dispatch(change({
                                                ppcl:text.target.checked
                                            }))

                                            if(data.error.ppcl) {
                                                delete data.error.ppcl
                                            }
                                        }}
                                        value={
                                            (data.pessoa.ppcl) ? 1 : 0
                                        }
                                    />
                                    {(data.error.ppcl) && 
                                    <strong className="text-danger">{data.error.ppcl}</strong> 
                                    }
                                </div>
                            </div>


                             {/* Observacçao*/}
                             <div className="row mt-3">
                                <div className="col-md-6 form-group">
                                <label className="label-custom  mb-1">Observação </label>
                             
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
                                            value={data.pessoa.observacao || ''}
                                            multiline
                                                rows={6}
                                                rowsMax={20}
                                            />
                                            {(data.error.observacao) && 
                                            <strong className="text-danger">{data.error.observacao}</strong>
                                                
                                            }
                                </div>

                                <div className="col-md-6 form-group">
                                <label className="label-custom  mb-1">Observação Restrita </label>
                             
                                        <TextField 
                                            error ={(data.error.observacaorestrita) && true}
                                            
                                            onChange={text => {
                                                dispatch(change({
                                                    observacaorestrita:text.target.value
                                                }))

                                                if(data.error.observacaorestrita) {
                                                    delete data.error.observacaorestrita
                                                }
                                            }}
                                            value={data.pessoa.observacaorestrita || ''}
                                            multiline
                                                rows={6}
                                                rowsMax={20}
                                            />
                                            {(data.error.observacaorestrita) && 
                                            <strong className="text-danger">{data.error.observacaorestrita}</strong>
                                                
                                            }
                                </div>

                         

                    
                            </div>
                           
                                {/* Botao*/}
                                <div className="d-flex mt-4 pb-4 ">
                                    <Link to="/login" style={{marginRight:"1em"}}>
                                        <Button variant="contained" size="large">Voltar</Button>
                                    </Link>
                                    {(pessoa_id)?
                                        <Button onClick={() =>dispatch(update(data.pessoa,chefe_id))} variant="contained" color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3"/>
                                            Atualizar
                                        </Button>
                                    :
                                        <Button onClick={() =>dispatch(store(data.pessoa,chefe_id))} variant="contained" color="primary" size="large">
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

export default Pessoa;