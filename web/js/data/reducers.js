import {combineReducers} from "redux";
import {v4} from "node-uuid";
import {createSelector} from "reselect";
import gridReducer from "./gridReducer";
import authReducer from "./authReducer";

// Reducers

const todosItems = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_TODO_SUCCESS':
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
        case 'FETCH_TODO_SUCCESS':
            return action.payload;
        case 'PUSH_TODO':
            return [...state, action.payload];
        default:
            return state;
    }
};

const todosError = (state = null, action) => {
    switch (action.type) {
        case 'SAVE_TODO_LOADING':
        case 'FETCH_TODO_LOADING':
        case 'SAVE_TODO_SUCCESS':
        case 'FETCH_TODO_SUCCESS':
            return null;
        case 'SAVE_TODO_ERROR':
        case 'FETCH_TODO_ERROR':
            return action.payload;
        default:
            return state;
    }
};

const todosLoading = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_TODO_LOADING':
            return true;
        case 'FETCH_TODO_SUCCESS':
        case 'FETCH_TODO_ERROR':
            return false;
        default:
            return state;
    }
};

const todosLoadingSave = (state = false, action) => {
    switch (action.type) {
        case 'SAVE_TODO_LOADING':
            return true;
        case 'SAVE_TODO_SUCCESS':
        case 'SAVE_TODO_ERROR':
            return false;
        default:
            return state;
    }
};

const todosEdits = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case 'EDIT_TODO':
            return {...state, [action.todo.id]: true};
        case 'CANCEL_EDIT_TODO':
            delete newState[action.todo.id];
            return newState;
        case 'SAVE_TODO_SUCCESS':
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

export const getTodoEditTextById = (state, id) => state.todos.edits[id];
export const getTodosByFilter = createSelector(
    [
        (state, filter) => state.todos.items,
        (state, filter) => filter
    ],
    (items, filter) => items.filter(filterFn(filter))
);

// Main Reducer

export default combineReducers({
    check: checkReducer,
    todos: combineReducers({ //TODO Make separate file
        edits: todosEdits,
        items: todosItems,
        error: todosError,
        fetched: todosLoading,
        loading: todosLoading,
        loadingSave: todosLoadingSave
    }),
    grid: gridReducer,
    auth: authReducer
});