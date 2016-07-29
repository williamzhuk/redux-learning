import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import router from "./router";
import createStore from "./data/createStore";
import storeHandler from "./data/storeHandler";
import '../css/style.less';

const rootEl = document.getElementById('app');
const store = storeHandler(createStore());

render((<Provider store={store}>{router}</Provider>), rootEl);

if (module.hot) {
    module.hot.accept('./router', () => {
        const nextRouter = require('./router').default;
        render((<Provider store={store}>{nextRouter}</Provider>), rootEl);
    });
}