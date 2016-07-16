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
