import { combineReducers } from 'redux';
import authModalReducer from './authModalReducer';

export default combineReducers({
    authModal: authModalReducer
})