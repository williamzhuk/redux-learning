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
