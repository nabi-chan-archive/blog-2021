import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../../lib/prisma";
import { Post } from "../../constants/type";
import Header from "../../components/Header";
import { Container, Nav, Row } from "react-bootstrap";
import Link from "next/link";

interface Props {
  postId: number;
  post: Post;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { postId } = ctx.query;
  try {
    const post: Post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId as string),
      },
    });

    return {
      props: {
        postId: parseInt(postId as string),
        post,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const Detail: NextPage<Props> = ({ postId, post }) => {
  return (
    <>
      <Header />
      <Container>
        <header>
          <h2>{post.title}</h2>
          <h6>{post.createdAt.toString()}</h6>
          <Row>
            <Nav className="mr-auto" activeKey={"/"}>
              <Nav.Item>
                <Link href={"/"}>
                  <Nav.Link href={"/"}>뒤로가기</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>

            <Nav>
              <Nav.Item>
                <Link href={`/modify/${postId}`}>
                  <Nav.Link href={`/modify/${postId}`}>수정하기</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href={"#"}>
                  <Nav.Link href={"#"}>삭제하기</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          </Row>
        </header>

        <article>
          <p>{post.body}</p>
        </article>
      </Container>
    </>
  );
};

export default Detail;
