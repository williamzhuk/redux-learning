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

const fetchReducer = createApiListReducer('FETCH_TODO_API');

const apiTodos = (state = initialState, action) => {
    let prefix = 'SAVE_TODO_API';
    switch (action.type) {
        case `${prefix}_LOADING`:
            return fetchReducer(state, {...action, type: 'FETCH_TODO_API_LOADING'});
        case `${prefix}_SUCCESS`:
            let found = false;
            let items = state.items.map((item) => {
                let isSame = item.id == action.payload.id;
                if (isSame) {
                    found = true;
                    return action.payload;
                }
                return item;
            });
            if (!found) {
                items.push(action.payload);
            }
            return {...state, loading: false, items: items};
        case `${prefix}_ERROR`:
            return fetchReducer(state, {...action, type: 'FETCH_TODO_API_ERROR'});
        default:
            return fetchReducer(state, action);
    }
};

const apiTodosItems = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_TODO_API_SUCCESS':
            let found = false;
            let items = state.map((item) => {
                let isSame = item.id == action.payload.id;
                if (isSame) {
                    found = true;
                    return action.payload;
                }
                return item;
            });
            if (!found) {
                items.push(action.payload);
            }
            return items;
        case 'FETCH_TODO_API_SUCCESS':
            return action.payload;
        default:
            return state;
    }
};

const apiTodosError = (state = null, action) => {
    switch (action.type) {
        case 'SAVE_TODO_API_LOADING':
        case 'FETCH_TODO_API_LOADING':
        case 'SAVE_TODO_API_SUCCESS':
        case 'FETCH_TODO_API_SUCCESS':
            return null;
        case 'SAVE_TODO_API_ERROR':
        case 'FETCH_TODO_API_ERROR':
            return action.payload;
        default:
            return state;
    }
};
const apiTodosLoading = (state = false, action) => {
    switch (action.type) {
        case 'SAVE_TODO_API_LOADING':
        case 'FETCH_TODO_API_LOADING':
            return true;
        case 'SAVE_TODO_API_SUCCESS':
        case 'FETCH_TODO_API_SUCCESS':
        case 'SAVE_TODO_API_ERROR':
        case 'FETCH_TODO_API_ERROR':
            return false;
        default:
            return state;
    }
};

export default combineReducers({
    todos: todos,
    //apiTodos: apiTodos //TODO Use combine
    apiTodos: combineReducers({
        items: apiTodosItems,
        error: apiTodosError,
        loading: apiTodosLoading,
    })
});