import React from "react";
import PageLink from "./PageLink";
import { Post } from "../constants/type";
import { Card, Row } from "react-bootstrap";
import { formatDate } from "../lib/utils";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <PageLink href={`/detail/${post.id}`}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle>{post.subTitle}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Row noGutters className={"justify-content-between"}>
            <small className="text-muted">{formatDate(post.createdAt)}</small>
            <small className="text-muted">{post.author.name} @ Seoul</small>
          </Row>
        </Card.Footer>
      </Card>
    </PageLink>
  );
};

export default PostCard;
