import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import * as reducers from "../data/reducers";
import {withRouter} from 'react-router';
import Todo from "./todo";

class ApiTodos extends React.Component {

    componentWillMount() {
        this.props.onTodoFetch();
    }

    onAddTodo(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.onTodoSave({text: this.refs.input.value});
        this.refs.input.value = '';
    }

    render() {

        let {items, loading, error} = this.props;
        if (loading) return <div>Loading</div>;
        if (error) return <div>ERROR!!! {error.message || error}</div>;

        //console.log('ApiTodos', items.length);

        return (
            <div>
                <form onSubmit={::this.onAddTodo}>
                    <input ref="input"/>
                    <button type="submit">Add Todo</button>
                </form>
                <ul>
                    {/*TODO Create a function component here*/}
                    {items.map(todo =>
                        <Todo key={todo.id} todo={todo}/>
                    )}
                </ul>

            </div>
        );
    }
}

ApiTodos = connect((state, ownProps) => ({
    loading: state.todos.loading,
    error: state.todos.error,
    items: reducers.getTodosByFilter(state, ownProps.params.filter)
}), {
    onTodoSave: actions.saveTodo,
    onTodoFetch: actions.fetchTodo
})(ApiTodos);

ApiTodos = withRouter(ApiTodos);

export default ApiTodos;