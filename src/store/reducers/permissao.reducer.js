import {actionTypes} from '../actions/permissao.action';

const initialState = {
    permissoes:{
        data:[]
    },
    permissao:{
      
    },
    success:false,
    error:{},
 
    status:[],
    
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.INDEX:
      
        return { ...state, ...payload }

    case actionTypes.SHOW:
      
        return { ...state, ...payload }
      
    case actionTypes.CHANGE:
        return{ 
            ...state,
            permissao:{
                 ...state.permissao,
                 ...payload
             }
        }
    case actionTypes.SUCCESS:
        return{ 
            ...state, 
            success: payload
         }
    case actionTypes.ERROR:
        return{
            ...state,
            error: payload
        }
    default:
        return state
    }
}
