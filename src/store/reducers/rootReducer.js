import {combineReducers} from 'redux';
import  loadinReducers from './loading.reducer';
import  notifyReducers from './notify.reducer';
import  alertReducers from './alert.reducer';
import  equipamentoReducers from './equipamento.reducer';
const rootReducer = combineReducers({
    loadinReducers,
    notifyReducers,
    alertReducers,
    equipamentoReducers,
})

export default rootReducer;