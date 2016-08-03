import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";

let Checkbox = ({checked, onChecked}) => {
    const onCheckboxChange = (e) => {
        onChecked(e.target.checked);
    };

    return <input type="checkbox" value="on" checked={checked} onChange={onCheckboxChange}/>

};

Checkbox = connect((state, ownProps) => ({
    checked: state.checked
}), {
    onChecked: actions.check
})(Checkbox);

export default Checkbox;