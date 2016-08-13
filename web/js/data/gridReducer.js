import {createSelector} from "reselect";
import {combineReducers} from "redux";

const gridItemsReducer = (state = [], action) => {
    return state;
};

const gridRoleReducer = (state = 0, {type, payload}) => {
    switch (type) {
        case 'SET_ROLE_ID':
            return payload;
        default:
            return state;
    }
};

const gridFilterReducer = (state = "", {type, payload}) => {
    switch (type) {
        case 'SET_FILTER':
            return payload;
        default:
            return state;
    }
};

const gridSortReducer = (state = {by: "firstName", reverse: false}, {type, payload}) => {
    switch (type) {
        case 'SET_SORT':
            return payload;
        default:
            return state;
    }
};

const gridPaginationReducer = (state = {page: 1, perPage: 5}, {type, payload}) => {
    switch (type) {
        case 'SET_FILTER':
        case 'SET_ROLE_ID':
            return {...state, page: 1};
        case 'SET_PER_PAGE':
            return {...state, page: 1, perPage: payload};
        case 'SET_PAGE':
            return {...state, page: payload};
        default:
            return state;
    }
};

export const getItems = state => state.grid.items;
export const getRoleId = state => state.grid.roleId;
export const getFilter = state => state.grid.filter;
export const getSort = state => state.grid.sort;
export const getPagination = state => state.grid.pagination;
export const getTotal = state => getItems(state).length;
export const getFilteredTotal = state => getFilteredItems(state).length;

const compareByRoles = (a, b) => {
    if (!a.roles.length) return 1;
    if (!b.roles.length) return -1;
    return a.roles[0].id - b.roles[0].id;
};

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

const createRegexp = createSelector(
    (filter) => filter,
    (filter) => (
        new RegExp(
            '(' +
            filter
                .trim()
                .split(' ')
                .map(f => '(?:' + escapeRegExp(f) + ')')
                .join('|') +
            ')',
            'igm'
        )
    )
);

export const matchFn = (str, filter) => (
    createRegexp(filter).test(str)
);

export const replaceFn = (filter) => (str) => (
    filter ? str.replace(createRegexp(filter), '<strong>$1</strong>') : str
);

const filterFn = (roleId, filter) => (item) => (
    (!roleId || ~item.roleIds.indexOf(roleId)) &&
    (!filter || (
        matchFn(item.firstName, filter) || matchFn(item.lastName, filter)
    ))
);

const sortFn = ({by, reverse}) => (a, b) => (
    (
        (by == 'firstName' ? a.firstName.localeCompare(b.firstName) : 0) ||
        (by == 'lastName' ? a.lastName.localeCompare(b.lastName) : 0) ||
        (by == 'roles' ? compareByRoles(a, b) : 0) ||
        0
    ) * (reverse ? -1 : 1)
);

export const getFilteredItems = createSelector(
    [
        (state) => getItems(state),
        (state) => getRoleId(state),
        (state) => getFilter(state)
    ],
    (items, roleId, filter) => items.filter(filterFn(roleId, filter))
);


export const getProcessedItems = createSelector(
    [
        (state) => getFilteredItems(state),
        (state) => getSort(state),
        (state) => getPagination(state)
    ],
    (filteredItems, sort, pagination) => filteredItems
        .sort(sortFn(sort))
        .slice(
            (pagination.page - 1) * pagination.perPage,
            pagination.page * pagination.perPage
        )
);


export default combineReducers({
    items: gridItemsReducer,
    roleId: gridRoleReducer,
    filter: gridFilterReducer,
    sort: gridSortReducer,
    pagination: gridPaginationReducer
});
