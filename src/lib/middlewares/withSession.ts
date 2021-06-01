import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

export interface NextApiRequestWithSession extends NextApiRequest {
  auth: {
    session: Session;
    email: string;
  };
}

export type NextApiHandlerWithSession = (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => void | Promise<void>;

const withSession = (handler: NextApiHandlerWithSession) => {
  return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).end("Can't find session");
      }

      if (!session.user.email) {
        return res.status(401).end("Can't find user email");
      }

      req.auth = {
        session,
        email: session.user.email,
      };

      return handler(req, res);
    } catch (e) {
      console.error(e);
      return res.status(401).end("auth error");
    }
  };
};

export default withSession;
