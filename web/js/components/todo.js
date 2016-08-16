import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import * as reducers from "../data/reducers";
import * as bl from "../data/businessLayer";

export function Todo({
    todo,
    isEdit,
    onSaveTodo,
    onToggleTodo,
    onEditTodo,
    onCancelEditTodo
}) {

    let input;

    const onClick = (e) => {
        onToggleTodo(todo);
    };

    const onEdit = (e) => {
        onEditTodo(todo);
    };

    const onSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveTodo({
            ...todo,
            text: input.value
        });
    };

    const onFinish = () => {
        onCancelEditTodo(todo);
    };

    return <li>
        {isEdit ?
            <form onSubmit={onSave}>
                <input type="text" ref={node => {
                    if (node && !node.value) node.value = todo.text;
                    input = node;
                }}/>
                <button type="submit">Save</button>
                <button type="button" onClick={onFinish}>Cancel</button>
            </form> :
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
                    <button type="button" onClick={onEdit}>Edit</button> :
                    null}
            </div>
        }
    </li>;

}

let TodoWrapped = connect((state, ownProps) => ({
    isEdit: reducers.getTodoEditTextById(state, ownProps.todo.id)
}), {
    onToggleTodo: actions.toggleTodo,
    onEditTodo: actions.editTodo,
    onSaveTodo: actions.saveTodo,
    onCancelEditTodo: actions.cancelEditTodo
})(Todo);

export default TodoWrapped;