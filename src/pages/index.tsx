import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post } from "../constants/type";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

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
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Container>
    </>
  );
};

export default Home;
