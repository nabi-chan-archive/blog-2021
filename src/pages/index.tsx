import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post, PostState } from "../constants/type";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import { Mixpanel, TRACK } from "../lib/mixpanel";
import PLOGMeta, { titleTemplate } from "../components/Head";
import Head from "next/head";

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    where: {
      state: PostState.PUBLISHED,
    },
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  useEffect(() => {
    Mixpanel.track(TRACK.HOME, {});
  }, []);

  return (
    <>
      <Head>
        <title>{titleTemplate("PINOT 기술 블로그")}</title>
        <PLOGMeta
          title={"PINOT 기술 블로그"}
          description={"PINOT 기술 블로그"}
          author={"PINOT. KIM."}
          url={"https://pinot.kim"}
          image={""}
        />
      </Head>
      <Header />
      <Container>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Home;
