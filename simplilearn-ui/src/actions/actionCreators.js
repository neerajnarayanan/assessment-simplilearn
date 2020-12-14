import { Types } from '../constants/actionTypes'; 

export const ActionCreators = {

  addProfile: (user) => ({ type: Types.ADD_USER, payload: { user } }),

  login: (user) => ({ type: Types.LOGIN, payload: { user } }),
  // successHandler: (success) => ({ type: Types.SUCCESS, payload: {success  } }),
  errorHandler: (error) => ({ type: Types.API_FAILURE, payload: {error  } }),
  clearUserData: () => ({ type: Types.CLEAR_USER_INFO})

}