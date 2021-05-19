import {actionTypes} from '../actions/beneficio.action';

const initialState = {
    beneficios:{
        data:[]
    },
    beneficio:{
      
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
            beneficio:{
                 ...state.beneficio,
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
