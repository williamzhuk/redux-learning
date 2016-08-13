import * as api from "./api";

let saveTodo = api.save('/api/todo');


export const check = (checked) => ({type: 'CHECK', checked});

//TODOS
export const toggleTodoAPI = (todo) => (
    saveTodoAPI({...todo, completed: !todo.completed})
);
export const fetchTodoAPI = () => ({
    type: 'FETCH_TODO_API', payload: api.list('/api/todo')
});
export const saveTodoAPI = (todo) => ({
    type: 'SAVE_TODO_API', payload: saveTodo(todo)
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
