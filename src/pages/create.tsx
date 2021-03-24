import React, { useState } from "react";
import { NextPage } from "next";

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
    <div>
      <h1>Post 만들기</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder={"제목을 입력하세요."}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
          placeholder={"내용을 입력하세요."}
        />

        <button type={"submit"}>저장하기</button>
        <button type={"reset"}>리셋</button>
      </form>
    </div>
  );
};

export default Create;
