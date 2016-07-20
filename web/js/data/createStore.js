import {createStore, applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import loggerMiddleware from "redux-logger";
import todoApp from "./reducers";
import throttle from 'lodash/throttle';

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
        loadState(),
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
    return store;
};