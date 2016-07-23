import * as api from "./api";

let saveTodo = api.save('/api/todo');

export const addTodo = (text = 'Test') => ({
    type: 'ADD_TODO',
    text
});
export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});
export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const fetchTodoAPI = () => {
    return  {
        type: 'FETCH_TODO_API',
        payload: api.list('/api/todo')
    };
};

export const saveTodoAPI = (todo) => {
    return {
        type: 'SAVE_TODO_API',
        payload: saveTodo(todo)
    }
};

export const toggleTodoAPI = (todo) => {
    return saveTodoAPI({...todo, completed: !todo.completed});
};

//TODO We may also use optimistic update and reload the entire list
export const pushTodo = (todo) => ({
    type: 'PUSH_TODO',
    payload: todo
});

// this requires redux-thunk only
export function promiseThunk(param) {
    return (dispatch) => {
        dispatch({type: 'PT_REQUEST', param: param});
        return fetch(`http://foo/${param}`)
            .then(r => r.json())
            .then(r => {
                dispatch({type: 'PT_SUCCESS', param: param, response: r});
                return r;
            })
            .catch(e => {
                dispatch({type: 'PT_ERROR', param: param, error: e});
                throw e;
            })
    };
}
// this requires redux-promise-middleware
export function promiseAction(param) {
    return fetch(`http://foo/${param}`).then(r => r.json());
}
