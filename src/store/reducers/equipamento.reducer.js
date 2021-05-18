import {actionTypes} from '../actions/equipamento.action';

const initialState = {
    equipamentos:{
        data:[]
    },
    equipamento:{
      
    },
    success:false,
    error:{},
 
    status:[],
    
}


export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.INDEX:
      
        return { ...state, ...payload }

      
    case actionTypes.CHANGE:
        return{ 
            ...state,
             equipamento:{
                 ...state.equipamento,
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
