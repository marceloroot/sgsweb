import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FaCalendarCheck, FaHandHoldingUsd, FaHotel, FaUserCheck, FaUsers } from 'react-icons/fa';
import logo from '../../../assets/logo.png'
const Sidebar = (props) =>{
    return(
       <sidebar className="col-2 h-100">
           <img src={logo} className="img-fluid" />
           <ul className="p-0 m-0"> 
               <li>
                   <Link to="/Equipamento" className={props.location.pathname === '/Equipamento' ? 'active' :''}>
                   <FaUserCheck />
                   <text>Operador</text>
                   </Link>
               </li>
               <li>
               <Link to="/login"  className={props.location.pathname === '/login' ? 'active' :''} >
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
               <Link to="/login">
                   <FaCalendarCheck />
                   <text>Atendimento</text>
                   </Link>
               </li>
           </ul>
       </sidebar>
    )
}

export default withRouter(Sidebar);