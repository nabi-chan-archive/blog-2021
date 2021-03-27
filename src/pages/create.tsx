import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { Button, Form, Container } from "react-bootstrap";

const Create: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
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
        <h3>포스트 작성하기</h3>햣
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
            <Form.Label>본문</Form.Label>
            <Form.Control
              as={"textarea"}
              value={body}
              rows={15}
              onChange={(e) => setBody(e.target.value)}
              name="body"
              placeholder={"내용을 입력하세요."}
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
