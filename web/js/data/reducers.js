import {combineReducers} from "redux";
import {v4} from 'node-uuid';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: v4(),
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            );
        default:
            return state;
    }
};

const initialState = {
    items: [],
    loading: false,
    error: null
};

const createApiListReducer = (prefix) => {
    return (state = initialState, action) => {
        switch (action.type) {
            case `${prefix}_LOADING`:
                return {...state, loading: true};
            case `${prefix}_SUCCESS`:
                return {...state, loading: false, items: action.payload};
            case `${prefix}_ERROR`:
                return {...state, loading: false, error: action.payload};
            default:
                return state;
        }
    };
};

const apiTodos = createApiListReducer('FETCH_TODO_API');

export default combineReducers({
    todos: todos,
    apiTodos: apiTodos
});