import {createStore, applyMiddleware, compose} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import todoApp from "./reducers";
import throttle from "lodash/throttle";
import data from "../data/userList.json";

const assignRolesToUsers = (roles, users) => users.map(user => ({
    ...user,
    roles: user.roleIds.map(id => roles[id])
}));

const localStorageKey = 'todos';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem(localStorageKey);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, serializedState);
    } catch (err) {
        // Ignore write errors.
    }
};

export default function() {
    var store = createStore(
        todoApp,
        {
            ...loadState(),
            grid: {
                items: assignRolesToUsers(data.roles, data.users)
            }
        },
        compose(
            applyMiddleware(
                promiseMiddleware({
                    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
                }),
                thunkMiddleware,
                loggerMiddleware({
                    collapsed: true
                })
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    store.subscribe(throttle(() => {
        const {auth} = store.getState();
        saveState({auth});
    }), 1000);
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};