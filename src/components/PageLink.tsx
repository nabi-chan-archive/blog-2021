import React from "react";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

const PageLink = ({ href, children }: Props) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
};

export default PageLink;
