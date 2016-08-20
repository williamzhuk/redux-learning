import React from "react";
import FilterLink from "./filterLink";
import ApiTodos from "./apiTodos";
import Checkbox from "./checkbox";
import DataGrid from "./dataGrid";
import Chat from './chat';

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
            <hr/>
            <Chat/>
        </div>
    );

};

export default TodoApp;
