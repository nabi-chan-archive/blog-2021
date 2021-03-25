import React from "react";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import { Reset } from "styled-reset";
import "bootstrap/dist/css/bootstrap.min.css";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <GlobalStyle />
      <Reset />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
