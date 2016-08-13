import React from "react";
import {connect} from "react-redux";
import {getAuthUser} from "../data/authReducer";
import {goToIndex} from '../data/actions';

const loggedOutWrapper = ({user, goToIndex, children}) => {
    if (user) {
        goToIndex();
        return null;
    }

    return <div>
        <h1> YOU ARE NOT LOGGED IN </h1>
        <div>
            {children}
        </div>
    </div>

};

export default connect((state) => ({
    user: getAuthUser(state)
}), {
    goToIndex: goToIndex
})(loggedOutWrapper);
