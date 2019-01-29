import { combineReducers } from 'redux';
import authReducers from './authReducers';
import errorReducer from './errorReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducers,
    error: errorReducer,
    getallusers: usersReducer
});