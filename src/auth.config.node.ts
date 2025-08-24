import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";

export default {
  pages: {
    signIn: "/onboarding",
    error: "/register",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
} satisfies NextAuthConfig;
