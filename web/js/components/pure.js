import React, {Component} from "react";
import shallowCompare from "react-addons-shallow-compare";

export default class Pure extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
}