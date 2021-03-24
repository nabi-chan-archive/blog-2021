import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const postCreate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({});
      return;
    }

    const { title, body } = req.body;

    await prisma.post.create({
      data: {
        title,
        body,
      },
    });

    res.status(201).json({});
  } catch (e) {
    res.status(401).json({});
  }
};

export default postCreate;
