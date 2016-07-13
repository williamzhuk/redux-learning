import {createStore} from "redux";
import todoApp from "./reducers";

export default function(){
    return createStore(todoApp);
};