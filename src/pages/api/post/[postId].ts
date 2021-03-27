import prisma from "../../../lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    query: { postId },
    body,
  } = req;

  switch (method) {
    case "DELETE":
      res.json(await deletePost(postId));
      break;
    case "PUT":
      res.json(await updatePost(postId, body));
      break;
    default:
      res
        .status(405)
        .end(`The HTTP ${method} is not is not supported at this route.`);
  }
};

async function deletePost(id: string | string[]) {
  return await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
}

async function updatePost(id: string | string[], data: string) {
  const { title, body } = JSON.parse(data);

  return await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      body,
    },
  });
}

export default handler;
