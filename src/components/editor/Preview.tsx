import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface Props {
  markdown: string;
}

const Content = styled.div`
  border: solid 1px #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
`;

export function Preview({ markdown }: Props) {
  return (
    <Content>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Content>
  );
}
