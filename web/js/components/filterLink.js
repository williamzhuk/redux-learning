import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";

let FilterLink = (({setVisibilityFilter, ownFilter, currentFilter, children}) => {

    const onClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setVisibilityFilter(ownFilter);
    };

    return (
        ownFilter == currentFilter
            ? <span>{children}</span>
            : <a href='#' onClick={onClick}>{children}</a>
    );

});

export default connect((state, ownProps)=> {
    return {
        currentFilter: state.visibilityFilter,
        ownFilter: ownProps.filter
    };
}, actions)(FilterLink);

// export default connect((state)=> {
//     return {todos: state.todos};
// }, (dispatch) => {
//     return {
//         onAddTodo(text){
//             dispatch(addTodo(text))
//         },
//         onToggleTodo(id){
//             dispatch(toggleTodo(id))
//         }
//     }
// })(TodoApp);