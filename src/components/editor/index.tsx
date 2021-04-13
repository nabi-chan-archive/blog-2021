import React, { useState } from "react";
import { Preview } from "./Preview";
import { Editor } from "./Editor";
import styled from "styled-components";

interface Props {
  onChange: (e: string) => void;
  defaultValue: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;

    // 마크다운 프리뷰 삭제
    div:nth-child(2) {
      display: none;
    }
  }
`;

export function MarkdownEditor({ onChange, defaultValue }: Props) {
  const [body, updateBody] = useState<string>(defaultValue || "");

  const handleChange = (e: string) => {
    onChange(e);
    updateBody(e);
  };

  return (
    <Container>
      <Editor value={body} onChange={handleChange} />
      <Preview markdown={body} />
    </Container>
  );
}
