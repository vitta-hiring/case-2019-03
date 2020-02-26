import React from "react";
import App from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { Store } from "redux";
import withReduxSaga from "next-redux-saga";
import Router from "next/router";

import MainLayout from "../components/MainLayout";
import initStore from "../store";
import { auth } from "../utils/auth";
import { AuthTypes } from "../store/ducks/auth/types";
import { AppState } from "../store/ducks/rootReducer";

interface Props {
  store: Store;
  token: string;
  userInfo: {};
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    const { token, userInfo } = auth(this.props);
    const storeState: AppState = this.props.store.getState();

    if (token) {
      this.props.store.dispatch({
        type: AuthTypes.SIGNIN_SUCCESS,
        payload: { data: { token, ...(userInfo as {}) } }
      });
    }
  }

  render() {
    const { Component, pageProps, store, token, userInfo } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Safe Prescriptions</title>
        </Head>
        <Provider store={store}>
          <div style={{ width: "100vw", height: "100vh" }}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}

// export default withRedux(initStore, { debug: true })(withReduxSaga(MyApp));
export default withRedux(initStore, { debug: true })(withReduxSaga(MyApp));
