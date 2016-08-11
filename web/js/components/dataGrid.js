import React from "react";
import {connect} from "react-redux";
import * as gridReducer from "../data/gridReducer";
import data from "../data/userList.json";
import * as actions from "../data/actions";

const roles = Object.keys(data.roles).map(i => data.roles[i]);

let Th = ({onSetSort, currentSort, ownSort, children, ...props}) => {
    const isCurrent = currentSort.by == ownSort;
    const onSortChange = (e) => {
        onSetSort(ownSort, isCurrent ? !currentSort.reverse : false);
    };
    const arrow = isCurrent ? <span>{currentSort.reverse ? "/\\" : "\\/"}</span> : null;
    return <th onClick={onSortChange} {...props}>
        {children}
        &nbsp;
        {arrow}
    </th>;
};

let Paginator = ({page, perPage, total, filteredTotal, onSetPage, onSetPerPage}) => {
    const onChange = (e) => {
        onSetPerPage(parseInt(e.target.value, 10));
    };

    const numPages = Math.ceil(filteredTotal / perPage);
    let array = [];
    for (let i = 1; i <= numPages; ++i) {
        array.push(<button onClick={onSetPage.bind(null, i)} disabled={page == i} key={i}>{i}</button>)
    }

    return <span>
        Showing {perPage > filteredTotal ? filteredTotal : perPage} of {filteredTotal} filtered, {total} total
        {' '}
        {array}
        {' '}
        <select value={perPage} onChange={onChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </span>
};

let DataGrid = ({
    users,
    roleId,
    filter,
    sort,
    total,
    filteredTotal,
    pagination,
    onSetSort,
    onSetRoleId,
    onSetFilter,
    onSetPage,
    onSetPerPage
}) => {
    const onSelectChange = (e) => {
        onSetRoleId(parseInt(e.target.value), 10);
    };
    const onInputChange = (e) => {
        onSetFilter(e.target.value);
    };
    const replaceFn = gridReducer.replaceFn(filter);

    return <div>
        <input onChange={onInputChange} value={filter}/>
        <select onChange={onSelectChange} value={roleId}>
            <option value="0">Choose role</option>
            {roles.map(role => (<option key={role.id} value={role.id}>{role.name}</option>))}
        </select>

        <table>
            <thead>
            <tr>
                <Th onSetSort={onSetSort} ownSort="firstName" currentSort={sort}>First Name</Th>
                <Th onSetSort={onSetSort} ownSort="lastName" currentSort={sort}>Last Name</Th>
                <Th onSetSort={onSetSort} ownSort="roles" currentSort={sort}>Roles</Th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td dangerouslySetInnerHTML={{__html: replaceFn(user.firstName)}}/>
                    <td dangerouslySetInnerHTML={{__html: replaceFn(user.lastName)}}/>
                    <td>{user.roles.map((role, i) => (<span key={i}>{role.name}&nbsp;</span>))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <div>
            <Paginator
                filteredTotal={filteredTotal}
                total={total}
                page={pagination.page}
                perPage={pagination.perPage}
                onSetPage={onSetPage}
                onSetPerPage={onSetPerPage}/>
        </div>


    </div>
};

DataGrid = connect(state => ({
    users: gridReducer.getProcessedItems(state),
    roleId: gridReducer.getRoleId(state),
    filter: gridReducer.getFilter(state),
    sort: gridReducer.getSort(state),
    pagination: gridReducer.getPagination(state),
    total: gridReducer.getTotal(state),
    filteredTotal: gridReducer.getFilteredTotal(state)
}), {
    onSetRoleId: actions.setRoleId,
    onSetFilter: actions.setFilter,
    onSetSort: actions.setSort,
    onSetPage: actions.setPage,
    onSetPerPage: actions.setPerPage
})(DataGrid);

export default DataGrid;