

import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { FaEdit, FaFilePdf,FaThumbsDown, FaSearch,FaThumbsUp, FaSave, FaComments, FaAudible, } from 'react-icons/fa';
import { Link,Redirect } from 'react-router-dom';
import { Button, CircularProgress, IconButton, Input, InputAdornment } from '@material-ui/core';
import {index} from '../../../store/actions/equipamento.action'



import Header from "../../components/header"
import Sidebar from "../../components/sidebar";

import {useSelector,useDispatch} from 'react-redux';
import { indexResponse } from '../../../store/actions/usuario.action';

const columns = [
  { id: 'codigo', label: 'Codigo', minWidth: 130 },
  { id: 'nome', label: 'Nome', minWidth: 200 },
  { id: 'responsavel', label: 'Responsavel', minWidth: 200 },
  {
    id: 'editar',
    label: 'Editar',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },


];



const editIcon = (id) => (
  
  <Link to={`/equipamento/${id}`} className="mr-2">
  <IconButton color="primary">
        <FaEdit size="0.8em" className="mr-2" /> 
  </IconButton>
  </Link>
);  


const useStyles = makeStyles({
    root: {
      width: '100%',
      marginTop:'20px'
    },
    container: {
      maxHeight: '100%',
    },
  });

const Equipamentos = (props) =>{

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tamanho,setTamanho] =React.useState(null);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [isLoading,setIsLoading] = React.useState(true);
    const [isLoadingMore,setIsLoadingMore] = React.useState(true);



    const [amount, setAmount] = React.useState('');
  
    const dispatch = useDispatch();
    const data = useSelector(state => state.equipamentoReducers.equipamentos);


    React.useEffect(()=>{
  
        _index(); 
   
       },[amount])
  
     
       
    const _index = () => {
     
        dispatch(index()).then(res => {
            
            if(res.payload){
                setIsLoading(false)
                if(isLoadingMore && setIsLoadingMore(false));  
  
            }
            
        })
    }
   
   //MONTA TABELA
   

    return (


        <>
          <div className="container-fluid h-100 ">
            <div className="row h-100">
            {(data.success) && <Redirect to={`/login`} />}
              <Header />
              <Sidebar />
              <div className="col p-5 overflow-auto h-100">
                
                      
                     {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> : 
                         <>
                        {/*Bot??o Nove*/}
                        <div style={{display:'flex',alignItems:'flex-end', justifyContent:'flex-end'}}>
                                <Link to="/equipamento">
                                        <Button  variant="contained"  color="primary" size="large">
                                            <FaSave size="1.5rem"  className="mr-3" style={{marginRight:'1em'}}/>
                                                <strong>NOVO</strong>
                                        </Button>
                                </Link>
                        </div>

                        {/*MONTA TABEL*/}
                        <Paper className={classes.root}>
                            <Input
                                    id="standard-adornment-amount"
                                    value={amount}
                                    onChange={text => {
                                    setAmount(text.target.value)
                                }}
                                    startAdornment={<InputAdornment position="start">
                                        <IconButton>
                                            <FaSearch size="0.7em" className="mr-2" /> 
                                    </IconButton>

                                    </InputAdornment>}
                                />
                                
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                
                                    {data.filter(row => row.nome.toLocaleString().includes(amount)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                
                                    const dados ={  
                                            codigo:row.id,
                                            nome:row.nome,
                                            responsavel:row.responsavel,
                                            editar:editIcon(row.id),
                                        
                                            
                                    }
                                    
                                    
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={dados.codigo}>
                                        {columns.map((column) => {
                                            const value = dados[column.id];
                                            return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                            );
                                        })}
                                        </TableRow>
                                    );
                                    })}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="tabelaPagination">
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                
                            />
                            </div>
                            </Paper>





                         </>
                     }

               </div>
            </div>
        </div>
      
        </>
    )
}

export default Equipamentos;