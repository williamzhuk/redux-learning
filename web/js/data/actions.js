import * as api from "./api";

let saveTodo = api.save('/api/todo');

export const check = (checked) => ({
    type: 'CHECK',
    checked
});
export const editTodo = (todo) => ({
    type: 'EDIT_TODO',
    todo
});
export const cancelEditTodo = (todo) => ({
    type: 'CANCEL_EDIT_TODO',
    todo
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