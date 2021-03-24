import React from "react";
import { GetServerSideProps, NextPage } from "next";
import prisma from "../../lib/prisma";
import { Post } from "../../constants/type";
import Container from "../../layouts/Container";
import PageLink from "../../components/PageLink";

interface Props {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { postId } = ctx.query;
  try {
    const post: Post = await prisma.post.findFirst({
      where: {
        id: parseInt(postId as string),
      },
    });

    return {
      props: {
        post,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const Detail: NextPage<Props> = ({ post }) => {
  return (
    <Container>
      <PageLink href="/">메인으로</PageLink>

      <h1>
        {post.title} ({post.id})
      </h1>

      <p>{post.body}</p>
    </Container>
  );
};

export default Detail;
