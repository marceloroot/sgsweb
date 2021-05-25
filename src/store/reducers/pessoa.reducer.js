import {actionTypes} from '../actions/pessoa.action';

const initialState = {
    pessoas:{
        data:[]
    },
    pessoa:{
      
    },
    success:false,
    error:{},
 
    status:[],
    responsavel:{},
    
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.INDEX:
      
        return { ...state, ...payload }

    case actionTypes.SHOW:
      
        return { ...state, ...payload }

    case actionTypes.SHOWRESPONSAVEL:
      
        return { ...state, ...payload }
      
    case actionTypes.CHANGE:
        return{ 
            ...state,
             pessoa:{
                 ...state.pessoa,
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
