import axios from 'axios';
import { ActionCreators } from '../actions/actionCreators';



export const addUser = userDetails => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/auth/signup`, userDetails);
        if (response?.data?.status === 'success') {
            dispatch(ActionCreators.addProfile(response.data));
        }
    } catch (error) {
        dispatch(ActionCreators.errorHandler(error.response.data.error));
    }
}

export const loginUser = (userloginDetails, history) => async dispatch => {
    try {
        console.log('loginuser-->', userloginDetails);
        const response = await axios.post(`http://localhost:8000/auth/login`, userloginDetails);
        console.log('here1,',response);
        if (response?.data?.status == 'success') {
            console.log('inside success api respose', response);
            dispatch(ActionCreators.login(response.data));
            if (response.data?.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/user-profile');
                // window.location.reload();
            }
           

        }
    } catch (error) {

        dispatch(ActionCreators.errorHandler(true));
    }
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };