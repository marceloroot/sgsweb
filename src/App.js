import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {Button,Input,TextField  } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import { Loading,Alert,Notify, } from './view/components';
import './global.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4ABDAC",
    },
    secondary: {
      main: "#FC4A1A",
    },
    tertiary: {
      main: "#F7B733",
    },
  },

  props: {
    // Nome do componente ⚛️
    MuiTextField: {
      // As propriedades padrão para mudar
      variant: "outlined",
      fullWidth:true
    },
    MuiSelect:{
      variant: "outlined",
      fullWidth:true
    },
    MuiInput:{
      variant: "outlined",
      fullWidth:true
    },
  },
});


const App =() =>{
  return(
    <Provider store={store}>   
    <ThemeProvider theme={theme}>
      <Loading/>
      <Alert/>
      <Notify/>


      <Routes />
    
    </ThemeProvider>
    </Provider>

   
  )
}

export default App;