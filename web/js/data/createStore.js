import {createStore, applyMiddleware, compose} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import loggerMiddleware from "redux-logger";
import todoApp from "./reducers";
import throttle from "lodash/throttle";
import data from "../data/userList.json";

const localStorageKey = 'web-store';

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
                loggerMiddleware({
                    collapsed: true
                })
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f
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