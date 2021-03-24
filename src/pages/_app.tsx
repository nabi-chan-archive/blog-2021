import React from "react";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
