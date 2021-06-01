import { createGlobalStyle } from "styled-components";
import nProgress from "./nProgress";

const GlobalStyle = createGlobalStyle`
  ${nProgress}
  
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    width: 100%;
    overflow-x: hidden;
    letter-spacing: -0.05ch;
  }
  
  body {
    width: 100%;
    overflow: hidden;
    line-height: 1.25;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
