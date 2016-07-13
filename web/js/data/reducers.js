import {combineReducers} from "redux";

let nextTodoId = 0;

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: ++nextTodoId,
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

const visibilityFilter = (state = 'all', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

export default combineReducers({
    todos: todos,
    visibilityFilter: visibilityFilter
});