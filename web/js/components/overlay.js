import React, {Component} from "react";
import {render, unmountComponentAtNode} from "react-dom";

export default class Overlay extends Component {

    overlay;

    render(){
        return null;
    }

    componentDidMount(){
        this.renderOverlay();
    }

    componentDidUpdate(){
        this.renderOverlay();
    }

    renderOverlay(){
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'overlay';
            document.body.appendChild(this.overlay);
        }
        render(this.props.children, this.overlay);
    }

    componentWillUnmount(){
        unmountComponentAtNode(this.overlay);
        document.body.removeChild(this.overlay);
    }

}