import * as api from "./api";
import * as actions from "./actions";
import * as pubnub from './pubnub';

export default function (store) {

    api.onPush((event) => {
        if (event.type == 'newTodo') {
            store.dispatch(actions.pushTodo(event.payload));
        }
    });

    pubnub.init();

    pubnub.subscribe((message) => {
        store.dispatch(actions.chatReceive(message));
    });


    return store;

}