import React, { Component } from "react";
import GarageSale from "../GarageSale.js";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import garageReducer from './redux/reducers/garageReducers.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(garageReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <GarageSale />
            </Provider>
        );

    }
}
