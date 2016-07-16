import React, {Component} from "react";
import {Link, withRouter} from 'react-router';

let FilterLink = (({filter, children, params}) => (

    <Link
        to={filter === 'all' ? '/' : filter}
        activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
    >
        {children}
    </Link>


));

export default withRouter(FilterLink);

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