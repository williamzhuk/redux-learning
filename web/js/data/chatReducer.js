import {combineReducers} from "redux";

export const getChat = (state) => state.chat;
export const getChatMessages = (state) => getChat(state).messages;
export const getChatTimeStamp = (state) => getChat(state).timeStamp;

const timeStampReducer = (state = null, action) => {
    switch (action.type) {
        case 'CHAT_HISTORY':
            return action.payload.timestamp;
        default:
            return state;
    }
};


const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'CHAT_HISTORY':
            return [...action.payload.messages, ...state];
        case 'CHAT_RECEIVE':
            return [...state, action.payload];
        case 'CHAT_SEND':
        default:
            return state;
    }
};


export default combineReducers({
    messages: messagesReducer,
    timeStamp: timeStampReducer
});