import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GH_AUTH_KEY as string,
      clientSecret: process.env.GH_AUTH_SECRET as string,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
});
