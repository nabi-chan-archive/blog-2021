import prisma from "../../../lib/prisma";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { Post } from "../../../constants/type";

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    query: { postId },
    body,
  } = req;
  const session = await getSession({ req });
  const email = session?.user.email;

  // 로그인되어있지 않음
  if (!session || !email) {
    res.status(401).end();
    return;
  }

  switch (method) {
    case "DELETE":
      res.json(await deletePost(postId, email));
      break;
    case "PUT":
      res.json(await updatePost(postId, email, body));
      break;
    default:
      res
        .status(405)
        .end(`The HTTP ${method} is not is not supported at this route.`);
  }
};

async function deletePost(id: string | string[], email: string) {
  return await prisma.post.deleteMany({
    where: {
      id: Number(id),
      author: {
        email: email,
      },
    },
  });
}

async function updatePost(
  id: string | string[],
  email: string,
  { title, body }: Post,
) {
  return await prisma.post.updateMany({
    where: {
      id: Number(id),
      author: {
        email: email,
      },
    },
    data: {
      title,
      body,
    },
  });
}

export default handler;
