



import React from 'react';
import {Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import { FaCalendarCheck, FaHandHoldingUsd, FaHotel, FaUserCheck } from 'react-icons/fa';
import logo from '../../../assets/logo.png'
import {FaUsers,FaPaste,FaLaptop,FaWhatsapp,FaSignOutAlt,FaAngleUp,FaAngleDown} from 'react-icons/fa';
import { MenuItem ,MenuList,AppBar,Toolbar,IconButton,Typography,Drawer,
         Divider,List,ListItem,ListItemText,ListItemIcon,Collapse, CircularProgress } from '@material-ui/core';
import { MdMenu }from 'react-icons/md';

import {deslogar} from '../../../store/actions/auth.action';

import {usuariologado} from '../../../store/actions/auth.action'
import {useSelector,useDispatch} from 'react-redux'

const Sidebar = (props) =>{
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = React.useState(true);
  const [state,setSatate] = React.useState({
    open:false
  });

  const [collapse,setCollapse] = React.useState({
        relatorio:false
  });

  const data = useSelector(state =>state.authReducers);

  React.useEffect(()=>{
       dispatch(usuariologado()).then(res =>{
        setIsLoading(false);
       })
  },[])
  
    return (
      <>
        {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> :
        <>
       
         {(window.innerWidth < 577) ? 
            <AppBar position="fixed">
            <Toolbar>
              <IconButton edge="start"  color="inherit" aria-label="menu" onClick={() => setSatate({open:true})}>
                <MdMenu />
              </IconButton>
              <Typography variant="h6" >
                {props.title}
              </Typography>
              {props.button}
            </Toolbar>
          </AppBar>
           :
           <sidebar className="col-2 h-100" style={{height:"100%"}}>
           <img src={logo} className="img-fluid" />
           <h6 style={{textTransform: "uppercase"}}>{data.usuario.nome.split(" ")[0]}</h6>
           <ul className="p-0 m-0"> 
               <li>
                   <Link to="/usuarios" className={props.location.pathname === '/Equipamento' ? 'active' :''}>
                   <FaUserCheck />
                   <text>Operador</text>
                   </Link>
               </li>
               <li>
               <Link to="/familias"  className={props.location.pathname === '/login' ? 'active' :''} >
                   <FaUsers />
                   <text>Familia</text>
                   </Link>
               </li>
               <li>
               <Link to="/equipamentos" className={props.location.pathname === '/equipamentos' ? 'active' :''}>
                   <FaHotel />
                   <text>Entidade</text>
                   </Link>
               </li>
               <li>
               <Link to="/beneficios" className={props.location.pathname === '/beneficios' ? 'active' :''}>
                   <FaHandHoldingUsd />
                   <text>Beneficio</text>
                   </Link>
               </li>
               <li>
               <Link to="/familias">
                   <FaCalendarCheck />
                   <text>Atendimento</text>
                   </Link>
               </li>
           </ul>
       </sidebar>
         }

         <Drawer anchor="left" open={state.open} onClose={() => setSatate({open:false})}>
             <div style={{width:320, maxWidth:window.innerWidth - 70}}>
               <List component="nav" className="menu-mobile">
                     <ListItem>
                     <img className="img-fluid logo-mobile" src={logo} alt="LOGO" />
                     </ListItem>
                     
                     <ListItem style={{textTransform: "uppercase"}}>
                     {data.usuario.nome.split(" ")[0]}
                     </ListItem>

                     <Divider className="mt-2 mb-3" />
                     
                     <ListItem>
                       <Link to="/usuarios"style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Operador"/>
                        </Link>
                     </ListItem>

                     <ListItem>
                       <Link to="/familias" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Familia"/>
                        </Link>
                     </ListItem>

                     <ListItem>
                       <Link to="/equipamentos" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Entidade"/>
                        </Link>
                     </ListItem>

                     
                     <ListItem>
                       <Link to="/beneficios" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Beneficio"/>
                        </Link>
                     </ListItem>

                     <ListItem>
                       <Link to="/familias" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Atendimento"/>
                        </Link>
                     </ListItem>

                 
                     
                     <ListItem button onClick={() => setCollapse({relatorio: (collapse.relatorio) ? false : true})}>
                        <ListItemIcon>
                        <FaLaptop /> 
                        </ListItemIcon>
                        <ListItemText primary="Relatorio"/>
                        {(collapse.relatorio) ? <FaAngleUp /> : <FaAngleDown />}
                     </ListItem>

                     <Collapse in={collapse.relatorio} timeout="auto" unmountOnExit>
                       <List component="div" disablePadding>
                           <ListItem>
                             <ListItemText className="pl-5" primary="Relatorio 1" />
                           </ListItem>
                           <ListItem>
                             <ListItemText className="pl-5" primary="Relatorio 2" />
                           </ListItem>
                           <ListItem>
                             <ListItemText className="pl-5" primary="Relatorio 3" />
                           </ListItem>
                           <ListItem>
                             <ListItemText className="pl-5" primary="Relatorio 4" />
                           </ListItem>
                       </List>
                     </Collapse>

                     <ListItem>
                        <ListItemIcon>
                        <FaWhatsapp /> 
                        </ListItemIcon>
                        <ListItemText primary="Ajuda"/>
                     </ListItem>

                     <Divider className="mt-2 mb-2" />

                     <ListItem onClick={() => dispatch(deslogar())}>
                        <ListItemIcon>
                        <FaSignOutAlt /> 
                        </ListItemIcon>
                        <ListItemText primary="Sair"/>
                     </ListItem>
                     
               </List>
             </div>
         </Drawer>
        </>
       }
     </>
    )
}
export default withRouter(Sidebar);