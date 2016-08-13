import React from "react";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from "./components/app";
import LoggedInWrapper from './layouts/loggedInWrapper';
import LoggedOutWrapper from './layouts/loggedOutWrapper';
import Login from './components/login';

const Pass = ({children}) => (children);

//

export default <Router history={hashHistory}>
    <Route path="/" component={Pass}>
        <Route component={LoggedInWrapper}>
            <IndexRoute component={App}/>
        </Route>
        <Route component={LoggedOutWrapper}>
            <Route path="login" component={Login}/>
        </Route>
    </Route>
</Router>;
