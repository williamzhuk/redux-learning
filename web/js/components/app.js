import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import FilterLink from "./filterLink";

const filterFn = (filter) => {
    return (item) => {
        if (filter == 'all') return true;
        return ((filter == 'active' && !item.completed) ||
            (filter == 'completed' && item.completed));
    };
};

let TodoApp = (({addTodo, toggleTodo, todos, visibilityFilter}) => {

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
                {todos.filter(filterFn(visibilityFilter)).map(todo =>
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
        </div>
    );

});

export default connect((state)=> {
    return {
        todos: state.todos,
        visibilityFilter: state.visibilityFilter
    };
}, actions)(TodoApp);

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