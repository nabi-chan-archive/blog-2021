import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/client";

const postCreate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({});
      return;
    }

    const { title, body } = req.body;
    const session = await getSession({ req });

    await prisma.post.create({
      data: {
        title,
        body,
        author: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });

    res.status(201).json({});
  } catch (e) {
    res.status(401).json({});
  }
};

export default postCreate;
