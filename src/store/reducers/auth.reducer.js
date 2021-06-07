import {actionTypes} from '../actions/auth.action';

const initialState = {
  credentials:{
    email:'',
    password:''
  },
  success: false,
  usuario:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.CHANGE:
        return {
             ...state,
              credentials: {
                  ...state.credentials,
                  ...payload
              },
            }

      case actionTypes.SUCCESS:
        return {
             ...state,
              success: payload
            }

       case actionTypes.INDEX:
        return { ...state, ...payload }

       case actionTypes.SHOW:
        return { ...state, ...payload }

    default:
        return state
    }
}
