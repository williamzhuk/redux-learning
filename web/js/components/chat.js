import React from "react";
import {connect} from "react-redux";
import * as actions from "../data/actions";
import {getChatMessages} from "../data/chatReducer"

const Chat = ({messages, onSend, onHistory}) => {
    let input;
    const onSubmit = (e) => {
        e.preventDefault();
        onSend(input.value);
        input.value = "";
    };
    const onHistoryClick = (e) => {
        e.preventDefault();
        onHistory();
    };
    return <div>
        <button type="button" onClick={onHistoryClick}>Load more</button>
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
    messages: getChatMessages(state)
}), {
    onSend: actions.chatSend,
    onHistory: actions.chatHistory
})(Chat);