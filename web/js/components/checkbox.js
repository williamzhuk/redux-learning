import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import Popup from "./popup";

let Checkbox = ({check, onChecked}) => {
    const onCheckboxChange = (e) => {
        onChecked(e.target.checked);
    };

    const input = <input type="checkbox" value="on" checked={check} onChange={onCheckboxChange}/>;


    return check ?
        <Popup>
            <div className="panel"><h1>Uncheck me</h1>{input}</div>
        </Popup> :
        input;

};

Checkbox = connect((state, ownProps) => ({
    check: state.check
}), {
    onChecked: actions.check
})(Checkbox);

export default Checkbox;