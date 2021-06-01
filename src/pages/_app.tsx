import React from "react";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";
import { Router } from "next/router";
import _nProgress from "nprogress";

const nProgress = _nProgress.configure({
  showSpinner: false,
});

Router.events.on("routeChangeStart", (url) => {
  console.debug("change route", url);
  nProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  console.debug("change route complete");
  nProgress.done();
});
Router.events.on("routeChangeError", (error) => {
  console.debug("change route error", error);
  nProgress.done();
});

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
