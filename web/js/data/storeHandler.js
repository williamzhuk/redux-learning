import * as api from "./api";
import * as actions from "./actions";

export default function(store) {

    api.onPush((event) => {
        if (event.type == 'newTodo') {
            store.dispatch(actions.pushTodo(event.payload));
        }
    });

    return store;

}