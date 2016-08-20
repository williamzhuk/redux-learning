import * as api from "./api";
import History from "./history";
import {publish}  from './pubnub'

console.log(History);

let apiSaveTodo = api.save('/api/todo');

export const check = (checked) => ({type: 'CHECK', checked});

//TODOS
export const toggleTodo = (todo) => (
    saveTodo({...todo, completed: !todo.completed})
);
export const fetchTodo = () => ({
    type: 'FETCH_TODO', payload: api.list('/api/todo')
});
export const saveTodo = (todo) => ({
    type: 'SAVE_TODO', payload: apiSaveTodo(todo)
});
export const editTodo = (todo) => ({type: 'EDIT_TODO', todo});
export const cancelEditTodo = (todo) => ({type: 'CANCEL_EDIT_TODO', todo});

//TODO We may also use optimistic update and reload the entire list
export const pushTodo = (todo) => ({type: 'PUSH_TODO', payload: todo});

//GRID
export const setRoleId = (roleId) => ({type: 'SET_ROLE_ID', payload: roleId});
export const setFilter = (filter) => ({type: 'SET_FILTER', payload: filter});
export const setSort = (by, reverse) => ({
    type: 'SET_SORT', payload: {by, reverse}
});
export const setPage = (page) => ({type: 'SET_PAGE', payload: page});
export const setPerPage = (perPage) => ({type: 'SET_PER_PAGE', payload: perPage});


//AUTH
const delay = (cb) => (dispatch, ...args) => {
    setTimeout(() => {
        cb(dispatch, ...args);
    }, 1);
    return (dispatch) => {
    };
};

export const login = (user) => ({type: 'LOGIN_SUCCESS', payload: user});
export const logout = () => ({type: 'LOGOUT_SUCCESS'});
export const goToLogin = delay(() => {
    History.push('/login');
});
export const goToIndex = delay(() => {
    History.push('/');
});

export const chatReceive = (message) => ({type: 'CHAT_RECEIVE', payload: message});

export const chatSend = (message) => {
    publish(message);
    return {type: 'CHAT_SEND', payload: message};
};