import React from "react";
import {Router, Route, hashHistory} from "react-router";
import App from "./components/app";

export default <Router history={hashHistory}>
    <Route path="/(:filter)" component={App}/>
</Router>;
