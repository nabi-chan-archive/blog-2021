import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Components } from "react-markdown/src/ast-to-react";
// TODO: Remark로 렌더러 옮기기
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import unwrapImages from "remark-unwrap-images";

const remarkPlugins = [unwrapImages];

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
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {markdown}
    </ReactMarkdown>
  );
};
