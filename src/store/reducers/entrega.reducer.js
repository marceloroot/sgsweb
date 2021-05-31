import {actionTypes} from '../actions/entrega.action';

const initialState = {
    entregas:{
        data:[]
    },
    entrega:{
      
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
            entrega:{
                 ...state.entrega,
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
