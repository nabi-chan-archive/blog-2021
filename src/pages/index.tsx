import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post } from "../constants/type";
import Container from "../layouts/Container";
import PageLink from "../components/PageLink";

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
    <Container>
      <h1>Feed</h1>

      {posts.map((post) => (
        <PageLink href={`/detail/${post.id}`} key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <b>{post.createdAt.toString()}</b>
        </PageLink>
      ))}
    </Container>
  );
};

export default Home;
