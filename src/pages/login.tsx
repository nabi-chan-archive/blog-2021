import React, { useEffect } from "react";
import Header from "../components/Header";
import { Button, Container } from "react-bootstrap";
import { NextPage } from "next";
import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const [session] = useSession();
  const { replace } = useRouter();

  // 이미 로그인 되어 있을 경우 main으로 리다이렉트
  useEffect(() => {
    if (!session) return;
    replace("/").then(() => {
      console.debug("이미 로그인되어 있습니다.", session);
    });
  }, [session]);

  // 로그인 function
  const handleLogin = async () => {
    try {
      await signIn("github", {
        callbackUrl: "/",
      });
    } catch (e) {
      alert("서버와 통신을 하던 도중 문제가 발생했습니다.");
      console.error(e);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Button onClick={handleLogin}>Github로 로그인하기</Button>
      </Container>
    </>
  );
};

export default Login;
