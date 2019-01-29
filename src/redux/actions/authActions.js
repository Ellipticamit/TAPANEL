import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from '../types';

// Login user 
export const loginUser = (data, history) => dispatch =>{
    axios
        .post('https://api.prontoitlabs.com/api/v1/user/login', data)
        .then(response => {
            const { token, user } = response.data.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            dispatch(setCurrentUser(user));
            history.push('/dashboard');
        })
        .catch((error) => {
            let err = { unauthorized: error.response.data.errorMessage };
            dispatch({
              type: GET_ERRORS,
              payload: err
            }); 
        });
} 

//Register user
export const registerUser = (data, history) => dispatch => {
    axios
      .post(`https://api.prontoitlabs.com/api/v1/user`, data)
      .then(response => {
        history.push('/')
      })
      .catch((error) => {
          let err = { exist: error.response.data.errorMessage};
          dispatch({
            type: GET_ERRORS,
            payload: err
          }); 
      });
}

//set Current User
export const setCurrentUser = data => {
    return {
        type: SET_CURRENT_USER,
        payload: data
    };  
}

//Logout User
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

//Verify Token
export const verifyToken = token => dispatch => {
    setAuthToken(token);
    axios
        .post('https://api.prontoitlabs.com/api/v1/user/verify-token', {})
        .then(response => {
            dispatch(setCurrentUser(response.data.data));
        })
        .catch(error => console.log(error.response)
        );
}
