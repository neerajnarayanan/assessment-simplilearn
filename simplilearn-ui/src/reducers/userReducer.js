import { Types } from '../constants/actionTypes';

const initialState = {
  isError: false,
  errMessage:'',
  successMsg:'',
  isSuccess: false,
};

const reducer = (state = initialState, action) => {
  console.log( action.payload);

  switch (action.type) {
    case Types.LOGIN:
    console.log('login reducer', action.payload.user)
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
    default:
      return state;
  }
}

export default reducer;