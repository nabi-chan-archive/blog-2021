import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../lib/prisma";
import { Post } from "../constants/type";

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
    <div>
      <h1>Feed</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <b>{post.createdAt.toString()}</b>
        </div>
      ))}
    </div>
  );
};

export default Home;
