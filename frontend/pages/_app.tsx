import React from "react";
import App from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { Store } from "redux";
import withReduxSaga from "next-redux-saga";
import { SnackbarProvider } from "notistack";

import MainLayout from "../components/MainLayout";
import initStore from "../store";

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }
  
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Safe Prescriptions</title>
        </Head>
        <Provider store={store}>
          <div style={{ width: "100vw", height: "100vh" }}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
            >
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </SnackbarProvider>
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}

// export default withRedux(initStore, { debug: true })(withReduxSaga(MyApp));
export default withRedux(initStore, { debug: true })(withReduxSaga(MyApp));
