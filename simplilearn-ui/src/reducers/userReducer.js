import { Types } from '../constants/actionTypes';

const initialState = {
  isError: false,
  errMessage:'',
  successMsg:'',
  isSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        ...action.payload.user,
        isError: false,
        formSubmitted: false // after update user formsubmition reset
      }
    case Types.API_FAILURE:
          return {
            ...state,
            isError: true,
            errMessage:  action.payload?.error?.message, 
            formSubmitted: false // after update user formsubmition reset
          }
    case Types.ADD_USER:
      return {
        ...state,
        ...action.payload.user,
        successMsg: `USER REG SUCCESS`,
        isSuccess: true,
        formSubmitted: false // after update user formsubmition reset
      }
    case Types.CLEAR_USER_INFO:
    return {
      ...initialState
    }
    default:
      return state;
  }
}

export default reducer;