import React from "react";
import {connect} from "react-redux";
import {getAuthUser} from "../data/authReducer";
import {goToLogin, logout} from '../data/actions';

const loggedInWrapper = ({user, goToLogin, logout, children}) => {

    if (!user) {
        goToLogin();
        return null;
    }

    const onClickLogout = (e) => {
        logout();
    };

    return <div>
        <div>
            <button onClick={onClickLogout}>Log Out</button>
            &nbsp;
            {user.username}
        </div>
        <div>
            {children}
        </div>
    </div>

};

export default connect((state) => ({
    user: getAuthUser(state)
}), {
    goToLogin: goToLogin,
    logout: logout
})(loggedInWrapper);
