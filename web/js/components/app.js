import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import FilterLink from "./filterLink";
import ApiTodos from "./apiTodos";
import { withRouter } from 'react-router';

const filterFn = (filter = 'all') => {
    return (item) => {
        if (filter == 'all') return true;
        return ((filter == 'active' && !item.completed) ||
            (filter == 'completed' && item.completed));
    };
};

let TodoApp = ({addTodo, toggleTodo, todos, filter}) => {

    let input;
    const onClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
    };

    return (
        <div>
            <form onSubmit={onClick}>
                <input ref={node => {input = node;}}/>
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.filter(filterFn(filter)).map(todo =>
                    <li key={todo.id}
                        onClick={toggleTodo.bind(null, todo.id)}
                        style={{
                            textDecoration:
                            todo.completed ?
                            'line-through' :
                               'none'
                            }}>
                        {todo.text}
                    </li>
                )}
            </ul>
            <div>
                <FilterLink filter="all">All</FilterLink>
                <FilterLink filter="active">Active</FilterLink>
                <FilterLink filter="completed">Completed</FilterLink>
            </div>
            <hr/>
            <ApiTodos/>
        </div>
    );

};

TodoApp = connect((state, ownProps)=> ({
    todos: state.todos,
    filter: ownProps.params.filter
}), actions)(TodoApp);

TodoApp = withRouter(TodoApp);

export default TodoApp;

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