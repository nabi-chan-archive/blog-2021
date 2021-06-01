import prisma from "../../../lib/prisma";
import { Post } from "../../../constants/type";
import withSession, {
  NextApiHandlerWithSession,
} from "../../../lib/middlewares/withSession";

const handler: NextApiHandlerWithSession = async (req, res) => {
  const {
    method,
    query: { postId },
    body,
  } = req;
  const { email } = req.auth;

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
  { title, subTitle, body, state, place }: Post,
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
      subTitle,
      body,
      state,
      place,
    },
  });
}

export default withSession(handler);
