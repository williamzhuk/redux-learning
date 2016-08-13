import {combineReducers} from "redux";

// Selectors

export const getAuth = (state) => state.auth;
export const getAuthUser = (state) => getAuth(state).user;
export const getAuthError = (state) => getAuth(state).error;

// Reducers

const authUserReducer = (state = null, {type, payload, error}) => {
    switch (type) {
        case 'LOGIN_SUCCESS':
            return payload;
        case 'LOGIN_ERROR':
        case 'LOGOUT_SUCCESS':
            return null;
        default:
            return state;

    }
};

const authErrorReducer = (state = null, {type, payload, error}) => {
    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'LOGOUT_SUCCESS':
            return null;
        case 'LOGIN_ERROR':
            return payload.message;
        default:
            return state;
    }
};

export default combineReducers({
    user: authUserReducer,
    error: authErrorReducer
});

//TODO: KIll all non-api todo stuff