import React from "react";
import PageLink from "./PageLink";
import { Post } from "../constants/type";
import styled from "styled-components";

interface Props {
  post: Post;
}

const Card = styled.div`
  border: solid 1px black;
  padding: 25px 15px;
  margin-bottom: 25px;

  h1 {
    font-size: 1.75em;
    margin-bottom: 5px;
  }

  p {
    font-size: 1em;
  }
`;

const PostCard = ({ post }: Props) => {
  return (
    <PageLink href={`/detail/${post.id}`}>
      <Card>
        <h1>{post.title}</h1>

        <p>{post.body}</p>
      </Card>
    </PageLink>
  );
};

export default PostCard;
