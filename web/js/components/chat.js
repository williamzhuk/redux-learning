import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import {getChat} from "../data/chatReducer"

const Chat = ({messages, onSend}) => {
    let input;
    const onSubmit = (e) => {
        e.preventDefault();
        onSend(input.value);
        input.value = "";
    };

    return <div>
        {messages.map((msg, i) => (
            <div key={i}>{msg}</div>
        ))}
        <form onSubmit={onSubmit}>
            <input ref={(node) => {
                input = node
            }}/>
            <button type="submit">Send</button>
        </form>
    </div>
};

export default connect((state) => ({
    messages: getChat(state)
}), {onSend: actions.chatSend})(Chat);