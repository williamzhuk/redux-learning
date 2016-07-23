import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";

export default function Todo({saveTodoAPI, toggleTodoAPI, todo, text, editTodo, editTodoUpdate, cancelEditTodo}) {

    let input;

    let onClick = (e) => {
        toggleTodoAPI(todo);
    };

    let onEdit = (e) => {
        editTodo(todo);
    };

    let onSave = () => {
        saveTodoAPI({
            ...todo,
            text
        });
    };

    let onFinish = () => {
        cancelEditTodo(todo);
    };

    let onChange = () => {
        editTodoUpdate(todo, input.value);
    };

    return <li>
        {text ?
            <div>
                <input type="text" ref={node => { input = node; }} value={text} onChange={onChange}/>
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
                <button onClick={onEdit}>Edit</button>
            </div>
        }
    </li>;

}


Todo = connect((state, ownProps) => ({
    text: state.apiTodos.edits[ownProps.todo.id]
}), actions)(Todo);

export default Todo;