import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import axiosMiddleware from "./axiosMiddleware";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk, axiosMiddleware));

export default store;
