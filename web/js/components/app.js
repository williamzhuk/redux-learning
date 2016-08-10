import React, {Component} from "react";
import FilterLink from "./filterLink";
import ApiTodos from "./apiTodos";
import Checkbox from "./checkbox";
import DataGrid from "./dataGrid";

let TodoApp = () => {

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
            <Checkbox/>
            <hr/>
            <DataGrid users={[]}/>
        </div>
    );

};

export default TodoApp;
