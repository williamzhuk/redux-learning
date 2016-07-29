import React, {Component} from "react";
import {Link, withRouter} from 'react-router';

let FilterLink = (({filter, children, params}) => {
    params.filter = params.filter || "all";
    return params.filter == filter ?
        <span>{children}</span> :
        <Link to={filter === 'all' ? '/' : filter}>{children}</Link>;

});

FilterLink = withRouter(FilterLink);
export default FilterLink;