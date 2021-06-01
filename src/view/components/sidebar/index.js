



import React from 'react';
import {Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import { FaCalendarCheck, FaHandHoldingUsd, FaHotel, FaUserCheck } from 'react-icons/fa';
import logo from '../../../assets/logo.png'
import {FaUsers,FaPaste,FaLaptop,FaWhatsapp,FaSignOutAlt,FaAngleUp,FaAngleDown} from 'react-icons/fa';
import { MenuItem ,MenuList,AppBar,Toolbar,IconButton,Typography,Drawer,
         Divider,List,ListItem,ListItemText,ListItemIcon,Collapse } from '@material-ui/core';
import { MdMenu }from 'react-icons/md';

import {deslogar} from '../../../store/actions/auth.action';
import {useSelector,useDispatch} from 'react-redux'

const Sidebar = (props) =>{
  const dispatch = useDispatch();

  const [state,setSatate] = React.useState({
    open:false
  });

  const [collapse,setCollapse] = React.useState({
        relatorio:false
  });
  
    return (
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
           <sidebar className="col-2 h-100">
           <img src={logo} className="img-fluid" />
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
                     
                     <ListItem>
                        teste@gmail.com
                     </ListItem>

                     <Divider className="mt-2 mb-3" />
                     
                     <ListItem>
                       <Link to="/biddings" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Licitacões"/>
                        </Link>
                     </ListItem>

                     <ListItem>
                       <Link to="/register" style={{display:'flex'}}>
                        <ListItemIcon>
                        <FaPaste /> 
                        </ListItemIcon>
                        <ListItemText primary="Usuario"/>
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
    )
}
export default withRouter(Sidebar);