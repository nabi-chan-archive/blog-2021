import React, { useState } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Container from "../layouts/Container";

const Form = styled.form`
  display: grid;
  grid-row-gap: 20px;
`;

const Label = styled.label`
  display: block;

  span {
    color: #000;
  }

  input,
  textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: content-box;
    border: solid 1px #a0a0a0;
    width: calc(100% - 6ex);
    padding: 3ex;
    font-size: 12px;
  }

  textarea {
    min-height: 30ex;
    resize: vertical;
  }
`;

const Create: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

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
      }
    } catch (e) {
      alert("글을 작성하는 중 오류가 발생했습니다 " + e.response.status);
    }
  };

  return (
    <Container>
      <h1>Post 만들기</h1>

      <Form onSubmit={handleSubmit}>
        <Label>
          <span>제목</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder={"제목을 입력하세요."}
          />
        </Label>

        <Label>
          <span>본문</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            name="body"
            placeholder={"내용을 입력하세요."}
          />
        </Label>

        <button type={"submit"}>저장하기</button>
        <button type={"reset"}>리셋</button>
      </Form>
    </Container>
  );
};

export default Create;
