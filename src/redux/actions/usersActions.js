import axios from 'axios';
import { GET_ALL_USERS, GET_USERS } from '../types';

export const getUsers = (page, pageSize) => dispatch => {
    axios
        .get(`https://api.prontoitlabs.com/api/v1/user?page=${page}&size=${pageSize}`)
        .then(response => {
            dispatch({
                type: GET_USERS,
                payload: response.data.data
            })
        })
        .catch(err => console.log(err.response));
}

export const getAllUsers = () => dispatch => {
    axios
        .get('https://api.prontoitlabs.com/api/v1/user?page=1&size=2')
        .then(response => {
            dispatch(getUserData(response.data.data.totalElements)); 
        })
        .catch(err => console.log(err.response));
}

const getUserData = pageSize => dispatch => {
    axios
    .get(`https://api.prontoitlabs.com/api/v1/user?page=0&size=${pageSize}`)
    .then(response => {
        dispatch({
            type: GET_ALL_USERS,
            payload: response.data.data
        });
    })
    .catch(err => console.log(err.response));
}