import React, { useEffect } from "react";
import Header from "../components/Header";
import { Button, Container } from "react-bootstrap";
import { NextPage } from "next";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const LogOut: NextPage = () => {
  const [session] = useSession();
  const { replace } = useRouter();

  // 로그인이 되어있지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (session) return;
    replace("/").then(() => {
      console.debug("로그인되어있지 않습니다.");
    });
  }, [session]);

  // 로그인 function
  const handleLogout = async () => {
    try {
      await signOut({
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
        <Button onClick={handleLogout}>로그아웃</Button>
      </Container>
    </>
  );
};

export default LogOut;
