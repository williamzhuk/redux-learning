import {createStore, applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import loggerMiddleware from "redux-logger";
import todoApp from "./reducers";
import throttle from 'lodash/throttle';
import data from "../data/userList.json";

const assignRolesToUsers = (roles, users) => users.map(user => ({
    ...user,
    roles: user.roleIds.map(id => roles[id])
}));

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};

export default function () {
    var store = createStore(
        todoApp,
        {
            ...loadState(),
            grid: {
                items: assignRolesToUsers(data.roles, data.users)
            }
        },
        applyMiddleware(
            promiseMiddleware({
                promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
            }),
            loggerMiddleware({
                collapsed: true
            })
        )
    );
    store.subscribe(throttle(() => {
        saveState({
            todos: store.getState().todos
        })
    }), 1000);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};