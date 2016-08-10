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


let DataGrid = ({users, roleId, filter, sort, onSetSort, onSetRoleId, onSetFilter}) => {
    const onSelectChange = (e) => {
        onSetRoleId(parseInt(e.target.value), 10);
    };
    const onInputChange = (e) => {
        onSetFilter(e.target.value);
    };

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
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.roles.map((role, i) => (<span key={i}>{role.name}&nbsp;</span>))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
};

DataGrid = connect(state => ({
    users: gridReducer.getProcessedItems(state),
    roleId: gridReducer.getRoleId(state),
    filter: gridReducer.getFilter(state),
    sort: gridReducer.getSort(state)
}), {
    onSetRoleId: actions.setRoleId,
    onSetFilter: actions.setFilter,
    onSetSort: actions.setSort
})(DataGrid);

export default DataGrid;