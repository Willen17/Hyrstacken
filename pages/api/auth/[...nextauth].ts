import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    verifyRequest: "/verify"
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
});

