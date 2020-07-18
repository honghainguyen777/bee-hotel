import { LOGIN_FORM_SUBMIT } from '../actions/types';

export default function(state= null, action) {
    switch (action.type) {
        case LOGIN_FORM_SUBMIT:
            return action.payload;
        default:
            return state;
    }
};