import NextAuth from "next-auth";
import authConfig from "./auth.config.node";
import { getUserbyId } from "@/lib";

import PrismaAdapterWithGuard from "./lib/adapter-guard";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserbyId(token.sub);
      if (!existingUser) return token;
      return token;
    },
  },
  adapter: PrismaAdapterWithGuard(),
  session: { strategy: "jwt" },
  ...authConfig,
});
