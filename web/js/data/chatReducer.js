export const getChat = (state) => state.chat;


const chatReducer = (state = [], action) => {
    switch (action.type) {
        case 'CHAT_RECEIVE':
            return [...state, action.payload];
        case 'CHAT_SEND':
        default:
            return state;
    }
};


export default chatReducer;