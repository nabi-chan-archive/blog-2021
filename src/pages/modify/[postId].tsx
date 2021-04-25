import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { Button, Form, Container } from "react-bootstrap";
import { useSession } from "next-auth/client";
import Error from "next/error";
import { Post } from "../../constants/type";
import prisma from "../../lib/prisma";
import { MarkdownEditor } from "../../components/editor";
import { useBeforeunload } from "react-beforeunload";

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

const Create: NextPage<Props> = ({ postId, post }) => {
  const [session, loading] = useSession();
  const isUser = session && !loading;
  const [title, setTitle] = useState<string>(post.title);
  const [subTitle, setSubTitle] = useState<string>(post.subTitle);
  const [body, setBody] = useState<string>(post.body);
  const [place, setPlace] = useState<string>(post.place);
  const router = useRouter();

  if (!isUser) {
    return <Error statusCode={404} />;
  }

  useBeforeunload((event) => {
    const confirm = window.confirm("이 페이지를 나가시겠습니까?");
    if (!confirm || !body) event.preventDefault();
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subTitle,
          body,
        }),
      });

      if (result.status === 200) {
        alert("수정에 성공했습니다!");
        setTitle("");
        setBody("");
        await router.push("/");
      }
    } catch (e) {
      alert("글을 수정하는 중 오류가 발생했습니다 " + e.response.status);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h3>포스트 수정하기</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder={"제목을 입력하세요."}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>부제목</Form.Label>
            <Form.Control
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              name="title"
              placeholder={"부제목을 입력하세요."}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>본문</Form.Label>
            <MarkdownEditor defaultValue={body} onChange={setBody} />
          </Form.Group>

          <Form.Group>
            <Form.Label>장소</Form.Label>
            <Form.Control
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              name="place"
              placeholder={"이 글은 어디에서 작성되었나요?"}
            />
          </Form.Group>

          <Form.Row>
            <Button variant="primary" type="submit">
              작성하기
            </Button>

            <Button variant="text" type="reset">
              취소하기
            </Button>
          </Form.Row>
        </Form>
      </Container>
    </>
  );
};

export default Create;
