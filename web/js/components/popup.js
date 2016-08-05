import React, {Component} from "react";
import Overlay from "./overlay";

export default function Popup({children, ...props}) {

    return <Overlay>
        <div className="popup">
            {children}
        </div>
    </Overlay>;

}