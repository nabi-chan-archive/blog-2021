import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
    font-size: calc(10px + 0.7vmin);
    letter-spacing: -0.05ch;
  }
  
  body {
    width: 100%;
    overflow: hidden;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
