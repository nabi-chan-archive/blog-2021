import React from "react";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";
import { Router } from "next/router";
import _nProgress from "nprogress";
import Head from "next/head";

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
      <Head>
        <title>PLOG | PINOT 기술 블로그</title>
        <meta name="title" content="PLOG" />
        <meta name="description" content="PINOT 기술 블로그" />
        <meta name="og:url" content="https://pinot.kim" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="PLOG" />
        <meta name="og:site_name" content="PLOG" />
        <meta name="og:description" content="PINOT 기술 블로그" />
        <meta name="twitter:card" content="" />
        <meta name="twitter:url" content="https://pinot.kim" />
        <meta name="twitter:title" content="PLOG" />
        <meta name="twitter:description" content="PINOT 기술 블로그" />
        <link rel="canonical" href="https://pinot.kim" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="PINOT. KIM." />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
