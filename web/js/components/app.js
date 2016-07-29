import React, {Component} from "react";
import {connect} from "react-redux";
import FilterLink from "./filterLink";
import ApiTodos from "./apiTodos";
import * as actions from "../data/actions";

let TodoApp = ({checked, onChecked}) => {

    const onCheckboxChange = (e) => {
        onChecked(e.target.checked);
    };

    return (
        <div>
            <div>
                <FilterLink filter="all">All</FilterLink><br/>
                <FilterLink filter="active">Active</FilterLink><br/>
                <FilterLink filter="completed">Completed</FilterLink>
            </div>
            <hr/>
            <ApiTodos/>
            <hr/>
            <input type="checkbox" value="on" checked={checked} onChange={onCheckboxChange}/>
        </div>
    );

};

//TODO Make a component for checkbox so that App itself will not have to access state
TodoApp = connect((state, ownProps) => ({
    checked: state.checked
}), {
    onChecked: actions.check
})(TodoApp);

export default TodoApp;
