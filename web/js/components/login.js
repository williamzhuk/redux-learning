import React from "react";
import {connect} from "react-redux";
import {login} from '../data/actions';

const Login = ({login}) => {
    const onSubmitLogin = (e) => {
        e.preventDefault();
        login({username: username.value, password: password.value});
    };

    let username, password;

    return <form onSubmit={onSubmitLogin}>
        <input placeholder="username" ref={(node) => {
            username = node;
        }}/>
        <input placeholder="password" ref={(node) => {
            password = node;
        }}/>
        <button type="submit">submit</button>
    </form>

};

export default connect((state) => ({}), {
    login: login
})(Login);
