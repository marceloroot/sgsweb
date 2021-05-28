import React from 'react';
import {change,login} from '../../../store/actions/auth.action';
import {Redirect} from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { Typography,TextField,Button, CircularProgress } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux'

export default function Auth() {
    const dispatch = useDispatch();
    const {credentials,success} = useSelector(state=>state.authReducers);
    const [isLoading,setIsLoading] = React.useState(true);
     React.useEffect(()=>{
      if(localStorage.length !==0){
        window.location.replace('/familias');
        setIsLoading(false);
      }
      setIsLoading(false);
    
     },[])
    return (
        <div className="d-flex bg-white h-100">
         
            <div className=" container mt-5">
            {(isLoading) ? <div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div> :
                <div className="row justify-content-center">
                    <div className="col-md-4">
                       <div className="form-group text-center">
                           <img src={logo} alt="visa logo" height="80"/>
                           <Typography className="mt-3" variant="h6" component="h1">Login</Typography>
                       </div>

                       <TextField 
                         label="Email"
                         type="email"
                         autoComplete="email"
                         margin="normal"
                         value={credentials.email}
                         onChange={text => dispatch( change({email:text.target.value}) )}
                       />

                    
                      <TextField 
                         label="Senha"
                         type="password"
                         margin="normal"
                         value={credentials.password}
                         onChange={text => dispatch( change({password:text.target.value}) )}
                       />

                       <Button
                         variant="contained"
                         color="primary"
                         fullWidth
                         size="large"
                         className="mt-4 mb-4"
                         onClick={() =>dispatch( login(credentials) )}
                       >
                           Entrar
                       </Button>

                       {(success) &&
                          <Redirect to="/Familias"/>
                       }
                       
                    </div>
                </div>
                    }
            </div>
       
        </div>
    )
}
