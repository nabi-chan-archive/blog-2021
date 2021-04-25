import AWS from "aws-sdk";
import mime from "mime-types";
import { NextApiHandler } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/client";

const BUCKET_NAME = "plog-images";

const s3 = new AWS.S3({
  region: "ap-northeast-2",
  signatureVersion: "v4",
});

function generateSignedUrl(path: string, filename: string) {
  const contentType = mime.lookup(filename);

  if (!contentType) {
    const error = new Error("Failed to parse filename");
    error.name = "ContentTypeError";
    throw error;
  }

  if (!contentType.includes("image")) {
    const error = new Error("File is not a image");
    error.name = "ContentTypeError";
    throw error;
  }

  const uploadPath = `${path}/${filename}`;
  return s3.getSignedUrl("putObject", {
    Bucket: BUCKET_NAME,
    Key: uploadPath,
    ContentType: contentType,
    ACL: "public-read",
  });
}

function generateUploadPath({
  id,
  type,
  username,
}: {
  id: string;
  type: string;
  username: string;
}) {
  return `images/${username}/${type}/${id}`;
}

const createUrl: NextApiHandler = async (req, res) => {
  type RequestBody = {
    type: string;
    filename: string;
    refId?: string;
  };

  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} is not allowed`);
  }

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).end("Can't find session");
    }

    const { type, filename, refId } = req.body as RequestBody;

    const image = await prisma.image.create({
      select: {
        id: true,
      },
      data: {
        id: refId,
        path: "",
        filesize: 0,
        type,
        user: {
          connect: {
            email: String(session.user.email),
          },
        },
      },
    });

    const path = generateUploadPath({
      type,
      id: image.id,
      username: String(session.user.name),
    });
    const signedUrl = generateSignedUrl(path, filename);

    await prisma.image.update({
      where: {
        id: image.id,
      },
      data: {
        path: `${path}/${filename}`,
      },
    });

    res.status(201).json({
      imagePath: encodeURI(
        `https://d1dahrilggo45h.cloudfront.net/${path}/${filename}`,
      ),
      signedUrl,
    });
  } catch (e) {
    if (e.name === "ContentTypeError") {
      res.status(400).end("Bad Request");
      return;
    }

    throw e;
  }
};

export default createUrl;
