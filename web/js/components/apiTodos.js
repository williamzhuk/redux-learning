import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import {withRouter} from 'react-router';

const filterFn = (filter = 'all') => {
    return (item) => {
        if (filter == 'all') return true;
        return ((filter == 'active' && !item.completed) ||
        (filter == 'completed' && item.completed));
    };
};

class ApiTodos extends React.Component {
    onTodoClick(e) {
        e.stopPropagation();
        e.preventDefault();
        // addTodo(input.value);
        // input.value = '';
    }

    componentWillMount() {
        this.props.fetchTodoAPI();
    }

    onAddTodo(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.saveTodoAPI({text: this.refs.input.value});
        this.refs.input.value = '';
    }

    onToggleTodo(todo) {
        this.props.toggleTodoAPI(todo);
    }

    render() {
        let {items, loading, error} = this.props;
        if (loading) return <div>Loading</div>;
        if (error) return <div>ERROR!!! {error.message || error}</div>;

        let input;

        return (
            <div>
                <form onSubmit={::this.onAddTodo}>
                    <input ref="input"/>
                    <button type="submit">Add Todo</button>
                </form>
                <ul>
                    {/*TODO Create a function component here*/}
                    {items.map(todo =>
                        <li key={todo.id}
                            onClick={this.onToggleTodo.bind(this, todo)}
                            style={{
                                textDecoration: todo.completed ?
                                    'line-through' :
                                    'none'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>

            </div>
        );
    }
}

ApiTodos = connect((state, ownProps)=> ({
    ...state.apiTodos
}), actions)(ApiTodos);

ApiTodos = withRouter(ApiTodos);

export default ApiTodos;