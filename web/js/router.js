import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, Redirect, hashHistory} from 'react-router';
import App from './components/app';
import {Provider} from "react-redux";
import createStore from "./data/createStore";
import storeHandler from "./data/storeHandler";

import '../css/style.less';

let store = storeHandler(createStore());

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/(:filter)" component={App}/>
        </Router>
    </Provider>
), document.getElementById('app'));
