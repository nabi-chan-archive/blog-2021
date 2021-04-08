import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../../lib/prisma";
import { Post } from "../../constants/type";
import Header from "../../components/Header";
import PostHeader from "../../components/post/Header";
import PostContent from "../../components/post/Content";
import { Container, Nav, Row } from "react-bootstrap";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { formatDate } from "../../lib/utils";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

interface Props {
  postId: number;
  post: Post;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { postId } = ctx.query;
  try {
    const post = await prisma.post.findFirst({
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
  const [session, loading] = useSession();
  const isUser = session && !loading;
  const { push } = useRouter();

  async function deletePost() {
    try {
      const confirm = window.confirm("정말로 삭제하시겠습니까?");

      if (!confirm) return;

      const result = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
      });

      if (result) {
        alert("글 삭제에 성공했습니다.");
        await push("/");
      }
    } catch (e) {
      alert("글을 삭제하는 과정에서 오류가 발생했습니다.");
      console.error(e);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <PostHeader>
          <h2>{post.title}</h2>
          <h6>{formatDate(post.createdAt)}</h6>
          <Row>
            <Nav className="mr-auto" activeKey={"/"}>
              <Nav.Item>
                <Link href={"/"}>
                  <Nav.Link href={"/"}>뒤로가기</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>

            {isUser ? (
              <Nav>
                <Nav.Item>
                  <Link href={`/modify/${postId}`}>
                    <Nav.Link href={`/modify/${postId}`}>수정하기</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href={"#"}>
                    <Nav.Link onClick={deletePost} href={"#"}>
                      삭제하기
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </Nav>
            ) : null}
          </Row>
        </PostHeader>

        <PostContent>
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </PostContent>
      </Container>
    </>
  );
};

export default Detail;
