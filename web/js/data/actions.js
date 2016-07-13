export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text: text || 'Test'
    };
}
export function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
}
export function setVisibilityFilter(filter){
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
}