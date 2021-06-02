import React from "react";

// SITE ROOT
const CANONICAL = "https://pinot.kim";

interface DefaultProps {
  title: string;
  url: string;
  image: string;
  description: string;
}

export enum ROBOTS {
  // 검색 O / 하위 링크 검색 O
  "INDEX_FOLLOW" = "index,follow",
  // 검색 X / 하위 링크 검색 O
  "NOINDEX_FOLLOW" = "noindex,follow",
  // 검색 O / 하위 링크 검색 X
  "INDEX_NOFILLOW" = "index,nofollow",
  // 검색 X / 하위 링크 검색 X
  "NOINDEX_NOFOLLOW" = "noindex,nofollow",
}

export function titleTemplate(title: string) {
  return `${title} | PLOG`;
}

interface MetaProps extends DefaultProps {
  author: string;
  robots?: ROBOTS;
}

const PLOGMeta = ({ title, description, author, robots }: MetaProps) => {
  return (
    <>
      {/* DEFAULT */}
      <meta name="title" content={titleTemplate(title)} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots || ROBOTS.INDEX_FOLLOW} />
      {/* ETC */}
      <link rel="canonical" href={CANONICAL} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </>
  );
};

export const OgWebsite = ({ title, url, image, description }: DefaultProps) => {
  return (
    <>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleTemplate(title)} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
    </>
  );
};

interface OgArticleProps extends DefaultProps {
  publishedDate: string;
  modifiedDate: string;
  section: string;
  tags: string[];
  author: string;
}

export const OgArticle = ({
  url,
  image,
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  section,
  tags,
}: OgArticleProps) => {
  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={titleTemplate(title)} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="article:author" content={author} />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:section" content={section} />
      {tags.map((tag) => (
        <meta property="article:tag" key={tag} content={tag} />
      ))}
    </>
  );
};

interface TwitterCardProps extends DefaultProps {
  large: boolean;
  imageAlt: string;
}

export const TwitterCard = ({
  large,
  title,
  description,
  image,
  imageAlt,
}: TwitterCardProps) => {
  const CARD_TYPE = large ? "summary_large_image" : "summary";

  return (
    <>
      <meta name="twitter:card" content={CARD_TYPE} />
      <meta name="twitter:title" content={titleTemplate(title)} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:site" content="@pinot.kim" />
    </>
  );
};

export default PLOGMeta;
