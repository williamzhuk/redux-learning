import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";

let Todo = ({todo, toggleTodoAPI}) => {
    let onClick = (e) => {
        toggleTodoAPI(todo);
    };
    return <li onClick={onClick}
               style={{
                   textDecoration: todo.completed ?
                       'line-through' :
                       'none'
               }}>
        {todo.text}
    </li>
};

Todo = connect(null, actions)(Todo);

export default Todo;