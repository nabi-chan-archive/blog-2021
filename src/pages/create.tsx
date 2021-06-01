import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { Button, Container, Form } from "react-bootstrap";
import { useSession } from "next-auth/client";
import Error from "next/error";
import { MarkdownEditor } from "../components/editor";
import { useBeforeunload } from "react-beforeunload";
import { PostState } from "../constants/type";
import axios from "../lib/axios";

const Create: NextPage = () => {
  const [session, loading] = useSession();
  const isUser = session && !loading;
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [state, setPostState] = useState<PostState>(PostState.PUBLISHED);
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
      const result = await axios({
        method: "POST",
        url: "/post/create",
        data: {
          title,
          subTitle,
          place,
          body,
          state,
        }
      });

      if (result.status === 201) {
        alert("작성에 성공했습니다!");
        setTitle("");
        setBody("");
        await router.push("/");
      }
    } catch (e) {
      alert("글을 작성하는 중 오류가 발생했습니다 " + e.response.status);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h3>포스트 작성하기</h3>
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

          <Form.Group>
            <Form.Label>공개 여부</Form.Label>
            <Form.Control
              as={"select"}
              name={"state"}
              onChange={(e) => setPostState(e.target.value as PostState)}
              value={state}
            >
              <option value={PostState.PUBLISHED}>{"모두에게 공개"}</option>
              <option value={PostState.PRIVATE}>
                {"링크가 있는 사람에게만 공개"}
              </option>
              <option value={PostState.HIDDEN}>{"나만 보기"}</option>
            </Form.Control>
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
