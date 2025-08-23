import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";

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
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
} satisfies NextAuthConfig;
