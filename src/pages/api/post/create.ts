import prisma from "../../../lib/prisma";
import withSession, {
  NextApiHandlerWithSession,
} from "../../../lib/middlewares/withSession";

const postCreate: NextApiHandlerWithSession = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({});
      return;
    }

    const { title, subTitle, place, body, state } = req.body;
    const { email } = req.auth;

    await prisma.post.create({
      data: {
        title,
        subTitle,
        place,
        body,
        state,
        author: {
          connect: {
            email,
          },
        },
      },
    });

    res.status(201).json({});
  } catch (e) {
    console.error(e.toString());
    res.status(401).json({});
  }
};

export default withSession(postCreate);
