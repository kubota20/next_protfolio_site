import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prismadb from "@/lib/prismadb";
import authConfig from "@/lib/auth.config";

export const authOptions = {
  adapter: PrismaAdapter(prismadb),
  ...authConfig,

  secret: process.env.AUTH_SECRET as string,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
