import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post } from "../constants/type";
import Container from "../layouts/Container";
import PostCard from "../components/PostCard";
import PageLink from "../components/PageLink";
import Header from "../components/Header";

interface Props {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Header />
      <Container>
        <h1>
          Feed <PageLink href="/create">글쓰기</PageLink>
        </h1>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Home;
