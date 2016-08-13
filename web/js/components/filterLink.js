import React, {Component} from "react";
import {Link, withRouter} from 'react-router';

let FilterLink = (({filter, children, location: { query }}) => {
    query.filter = query.filter || "all";
    return query.filter == filter ?
        <span>{children}</span> :
        <Link to={filter === 'all' ? '/' : '?filter=' + filter}>{children}</Link>;

});

FilterLink = withRouter(FilterLink);
export default FilterLink;