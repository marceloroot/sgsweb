import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import {Button,CircularProgress,IconButton,Menu,MenuItem,Slide,Fade} from '@material-ui/core'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print';
import {useDispatch,useSelector} from 'react-redux';
import {show} from '../../../store/actions/entrega.action'


export class ComponentToPrint extends React.PureComponent {
    
    constructor(props) {
        super(props)
      
        this.state = props.dados;
      }
      
    render() {
    const {
            id,
            quantidade,
            datacadastro,
            observacao,
            status
          } = this.state.entrega;
     
     const {
       
         cpf,
         nome,
         localidade,
         logradouro,
         uf,
         numero,
         bairro,
         telefone

     } = this.state.entrega.pessoa;
     
     const{
        nome : nomebeneficio
     } =this.state.entrega.beneficio

     const{
        nome : nomeentidade
     } = this.state.entrega.equipamento;

     const{
        nome : nomeusuario
     } = this.state.entrega.usuario;


     const{
        nome : nomelogado
     } = this.state.data;


     
      return (
     <div className="container">
        <div className="row">
         <div className="col-md-12">
               <div className="d-flex justify-content-center align-center mt-3">
                <img className="align-center mr-2" style={{width: '2.5em',marginRight:"1rem"}} src="http://pregao.alfenas.mg.gov.br/Arquivo/mg-alfenas-brasao.png" alt="logo" />
                <h3 className="text-center" style={{fontSize: '1.3rem'}}>PREFEITURA MUNICIPAL DE ALFENAS</h3>
              </div>
          </div>
         <div className="col-md-12 ml-3">
            <div className="d-flex justify-content-center align-center">
            <h5 className="text-center">SGS - Sistema de Gestão Social</h5>
           </div>
        </div>
         
       </div>
       <h6 className="text-center">Nº de protocolo {id}</h6>
     

       <h6 className="text-center">Recibo de Atendimento Social</h6>
       <div className="row"  className="d-flex justify-content-center" >
         <div className="col-8" style={{border: "2px solid black"}}>
         
                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem", marginTop:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Nº de protocolo: {id}</p>
                    <p style={{marginRight:"1rem" , marginTop:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}> </p>
                    </div>

                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>NOME DA ENTIDADE: {nomeentidade}</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Atendente: {nomeusuario} </p>
                    </div>
                    
                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Quantidade: {quantidade}</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Benefício: {nomebeneficio} </p>
                    </div>

                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Usuário: {nome}</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>CPF: {cpf} </p>
                    </div>

                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>LOGRADOURO: {logradouro}</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>NÚMERO: {numero} </p>
                    </div>

                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>BAIRRO: {bairro}</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>telefone: {telefone} </p>
                    </div>
                    <div  className="d-flex justify-content-between" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Data Atendimento: {moment(datacadastro).format('DD/MM/YYYY') }</p>
                    <p style={{marginRight:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Status: {(status === "A") ? "Deferido" : "Indeferido" }</p>
                    
                    </div>

                    <div  className="d-flex justify-content-between mb-5" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase"}}>Observação: {observacao}</p>
                   
                    </div>

                    <div  className="d-flex justify-content-center  mt-5 " >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase",textAlign:"center"}}>____________________________________________________________________________</p>
                    </div>

                    <div  className="d-flex justify-content-center   mb-3" >
                    <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"14px",textTransform: "uppercase",textAlign:"center"}}>{nome}</p>
                    </div>

                      <div  className="d-flex justify-content-center" >
                       <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"12px",textTransform: "uppercase",textAlign:"center"}}>Impresso por: {nomelogado}</p>
                      </div>   
                      <div  className="d-flex justify-content-center" >
                       <p style={{marginLeft:"1rem",fontWeight:"bold",fontSize:"11px",textTransform: "uppercase",textAlign:"center"}}>Impressão em: {moment().format('DD/MM/YYYY')} as {moment().format('h:mm:ss a')}</p>
                      </div> 
           

           

          </div>



       </div>
     </div>
       
      );
    }
  }





export default function Expemple(props) {

    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const reponsavel_id = (props.match.params.id) ? props.match.params.id : null;
    const dispatch = useDispatch();
    const data = useSelector(state =>state.entregaReducers);
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        index();
      
     
       
    },[dispatch,reponsavel_id])

    const index = () =>{
      
        if(reponsavel_id){
           
            dispatch(show(reponsavel_id)).then(res =>{
               
                if(res){
                    
                   setIsLoading(false);
                }

            })
           
        }
    }


    //console.log(data.responsavel);

    return (
       
      <div>
           {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> :
           <>
             {console.log(data.entrega)}
             <ComponentToPrint ref={componentRef} dados={data} />
             <div  className="d-flex justify-content-center align-center mt-3 mb-4">
             <button onClick={handlePrint}>Imprimir</button>
             </div>
            
            </>
          }
      </div>
       
    );
};