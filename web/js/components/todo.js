import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import Pure from "./pure";

export default class Todo extends Pure {
    constructor(props, context) {
        super(props, context);
        this.state = {
            edit: false,
            text: ''
        };
    }

    onClick(e) {
        this.props.toggleTodoAPI(this.props.todo);
    }

    onEdit() {
        this.setState({
            edit: true,
            text: this.props.todo.text
        });
    }

    onSave() {
        this.props
            .saveTodoAPI({
                ...this.props.todo,
                text: this.state.text
            });
    }

    onFinish() {
        this.setState({edit: false, text: ''});
    }

    onChange() {
        this.setState({text: this.refs.text.value});
    }

    render() {
        let todo = this.props.todo;
        return <li>
            {this.state.edit ?
                <div>
                    <input type="text" ref="text" value={this.state.text} onChange={::this.onChange}/>
                    <button onClick={::this.onSave}>Save</button>
                    <button onClick={::this.onFinish}>Cancel</button>
                </div> :
                <div>
                    <span onClick={::this.onClick}
                          style={{
                              textDecoration: todo.completed ?
                                  'line-through' :
                                  'none'
                          }}>
                    {todo.text}
                    </span>
                    <button onClick={::this.onEdit}>Edit</button>
                </div>
            }
        </li>;
    }
}

Todo = connect(null, actions)(Todo);

export default Todo;