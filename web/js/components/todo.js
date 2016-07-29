import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import * as reducers from "../data/reducers";
import * as bl from "../data/businessLayer";

export function Todo({
    todo,
    text,
    onSaveTodo,
    onToggleTodo,
    onEditTodo,
    onEditUpdateTodo,
    onCancelEditTodo
}) {

    let input;

    let onClick = (e) => {
        onToggleTodo(todo);
    };

    let onEdit = (e) => {
        onEditTodo(todo);
    };

    let onSave = () => {
        onSaveTodo({
            ...todo,
            text
        });
    };

    let onFinish = () => {
        onCancelEditTodo(todo);
    };

    let onChange = () => {
        onEditUpdateTodo(todo, input.value);
    };
    console.log("todo item", todo, text);
    return <li>
        {text ?
            <div>
                <input type="text" ref={node => {
                    input = node;
                }} value={text} onChange={onChange}/>
                <button onClick={onSave}>Save</button>
                <button onClick={onFinish}>Cancel</button>
            </div> :
            <div>
                <span onClick={onClick}
                      style={{
                          textDecoration: todo.completed ?
                              'line-through' :
                              'none'
                      }}>
                {todo.text}
                </span>
                {bl.isTodoEditable(todo) ?
                    <button onClick={onEdit}>Edit</button> :
                    null}
            </div>
        }
    </li>;

}

let TodoWrapped = connect((state, ownProps) => ({
    text: reducers.getTodoEditTextById(state, ownProps.todo.id)
}), {
    onToggleTodo: actions.toggleTodoAPI,
    onEditTodo: actions.editTodo,
    onSaveTodo: actions.saveTodoAPI,
    onCancelEditTodo: actions.cancelEditTodo,
    onEditUpdateTodo: actions.editTodoUpdate
})(Todo);

export default TodoWrapped;