import { GET_ALL_USERS, GET_USERS } from '../types';

const initialState = {
    getalluser: {},
    getuser: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                getalluser: action.payload
            }
        case GET_USERS:
            return {
                ...state,
                getuser: action.payload
            }
        default: 
            return state
    }
}