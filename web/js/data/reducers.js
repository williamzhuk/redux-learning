import {combineReducers} from "redux";
import {v4} from "node-uuid";
import {createSelector} from "reselect";
import gridReducer from "./gridReducer";
import authReducer from "./authReducer";

// Reducers

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
        case 'PUSH_TODO':
            return [...state, action.payload];
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
        case 'FETCH_TODO_API_LOADING':
            return true;
        case 'FETCH_TODO_API_SUCCESS':
        case 'FETCH_TODO_API_ERROR':
            return false;
        default:
            return state;
    }
};

const apiTodosLoadingSave = (state = false, action) => {
    switch (action.type) {
        case 'SAVE_TODO_API_LOADING':
            return true;
        case 'SAVE_TODO_API_SUCCESS':
        case 'SAVE_TODO_API_ERROR':
            return false;
        default:
            return state;
    }
};

const apiTodosEdits = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case 'EDIT_TODO':
            return {...state, [action.todo.id]: true};
        case 'CANCEL_EDIT_TODO':
            delete newState[action.todo.id];
            return newState;
        case 'SAVE_TODO_API_SUCCESS':
            delete newState[action.payload.id];
            return newState;
        //TODO Handle save error
        default:
            return state;
    }
};

const checkReducer = (state = false, action) => {
    if (action.type == 'CHECK')
        return action.checked;
    return state;
};

// Selectors

const filterFn = (filter = 'all') => {
    return (item) => {
        if (filter == 'all') return true;
        return ((filter == 'active' && !item.completed) ||
                (filter == 'completed' && item.completed));
    };
};

export const getTodoEditTextById = (state, id) => state.apiTodos.edits[id];
export const getTodosByFilter = createSelector(
    [
        (state, filter) => state.apiTodos.items,
        (state, filter) => filter
    ],
    (items, filter) => items.filter(filterFn(filter))
);

// Main Reducer

export default combineReducers({
    check: checkReducer,
    apiTodos: combineReducers({ //TODO Make separate file
        edits: apiTodosEdits,
        items: apiTodosItems,
        error: apiTodosError,
        fetched: apiTodosLoading,
        loading: apiTodosLoading,
        loadingSave: apiTodosLoadingSave
    }),
    grid: gridReducer,
    auth: authReducer
});