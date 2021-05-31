import {combineReducers} from 'redux';
import  loadinReducers from './loading.reducer';
import  notifyReducers from './notify.reducer';
import  alertReducers from './alert.reducer';
import  equipamentoReducers from './equipamento.reducer';
import  beneficioReducers from './beneficio.reducer';
import usuarioReducers from './usuario.reducer';
import permissaoReducers from './permissao.reducer'
import pessoaReducers from './pessoa.reducer'
import authReducers from './auth.reducer'
import entregaReducers from './entrega.reducer'


const rootReducer = combineReducers({
    loadinReducers,
    notifyReducers,
    alertReducers,
    equipamentoReducers,
    beneficioReducers,
    usuarioReducers,
    permissaoReducers,
    pessoaReducers,
    authReducers,
    entregaReducers,
})

export default rootReducer;