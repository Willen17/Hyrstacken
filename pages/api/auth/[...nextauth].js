import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
  },
  providers:[
    CredentialsProvider({
      name: "Logga in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) {
          throw new Error("No user found")
        }
        if (user.password !== credentials.password) {
          throw new Error("Password is incorrect")
        }
        return user
      },
    }),
  ],
});