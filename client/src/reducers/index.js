import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import sigupReducer from './signupReducer';

export default combineReducers({
    loginForm: loginReducer,
    sigupForm: sigupReducer
});