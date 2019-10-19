import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import axiosMiddleware from "./axiosMiddleware";

const store = createStore(reducers, applyMiddleware(thunk, axiosMiddleware));

export default store;
