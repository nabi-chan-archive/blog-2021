import styled from "styled-components";

const Content = styled.article`
  padding: 0 0 100px 0;
  white-space: pre-line;
  line-height: 1.5;
  font-size: 17px;

  code {
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1rem;
  }

  a {
    padding-bottom: 1px;
    border-bottom: solid 1px #0056b3;
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }
`;

export default Content;
