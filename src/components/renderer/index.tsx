import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Components } from "react-markdown/src/ast-to-react";

const components: Components = {
  code({ className, children }) {
    const language = className.split("-")[1];
    const code = String(children).replace(/\n$/, "") || "";
    return (
      <SyntaxHighlighter language={language} style={prism}>
        {code}
      </SyntaxHighlighter>
    );
  },
  img({ src, alt }) {
    return (
      <figure>
        <img src={String(src)} alt={String(alt)} />
        <figcaption>{String(alt)}</figcaption>
      </figure>
    );
  },
};

interface Props {
  markdown: string;
}

export const Markdown = ({ markdown }: Props) => {
  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};
