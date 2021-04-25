import React from "react";
import PageLink from "./PageLink";
import { Post, PostState } from "../constants/type";
import { Card, Row } from "react-bootstrap";
import { formatDate } from "../lib/utils";
import { useSession } from "next-auth/client";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const [session, loading] = useSession();
  const isUser = session && !loading;

  return (
    <PageLink href={`/detail/${post.id}`}>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Subtitle>{post.subTitle}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          <Row noGutters className={"justify-content-between"}>
            <small className="text-muted">
              {formatDate(post.createdAt) +
                (isUser && post.state !== PostState.PUBLISHED
                  ? ` / ${post.state}`
                  : "")}
            </small>
            <small className="text-muted">{post.author.name} @ {post.place}</small>
          </Row>
        </Card.Footer>
      </Card>
    </PageLink>
  );
};

export default PostCard;
