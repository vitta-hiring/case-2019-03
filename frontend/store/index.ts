import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./ducks/rootReducer";
import rootSaga from './ducks/rootSaga';


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

// function configureStore (initialState = {}) {
//   const sagaMiddleware = createSagaMiddleware()
//   const store = createStore(
//     rootReducer,
//     initialState,
//     bindMiddleware([sagaMiddleware])
//   )

//   store.sagaTask = sagaMiddleware.run(rootSaga)

//   return store
// }

// export default configureStore;


export default ({ initialState } = { initialState: {} }, {isServer, req = null}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store: any = createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware]));

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  // if (module.hot) {
  //   module.hot.accept("reducers", () => {
  //     const nextReducer = require("reducers").default;
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */

  

  return store;
};

// const logger = () => (window as any).__REDUX_DEVTOOLS_EXTENSION__
//   ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//   : (x) => x
