import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface SyntaxHighlighterProps {
  language: string;
  value?: string;
}

const renderers = {
  code({ language, value }: SyntaxHighlighterProps) {
    return (
      <SyntaxHighlighter language={language} style={prism}>
        {value || ""}
      </SyntaxHighlighter>
    );
  },
};

interface Props {
  markdown: string;
}

export const Markdown = ({ markdown }: Props) => {
  return <ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>;
};
