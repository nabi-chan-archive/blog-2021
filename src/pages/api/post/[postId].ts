import prisma from "../../../lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    query: { postId },
  } = req;

  switch (method) {
    case "DELETE":
      res.json(await deletePost(postId));
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

export default handler;
