import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // 認証していないユーザーをloginページにリダイレクト
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },

    async signIn({ user }) {
      const myEmail = process.env.NEXT_PUBLIC_MY_EMAIL as string;
      //  自分のEmailアドレスが一致すればログインできる
      return user.email === myEmail;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          // セッション時はユーザーのID、名前、Emailが含まれます
          ...session.user,
          id: token.sub,
          name: token.name,
          email: token.email,
        },
      };
    },
  },
} satisfies NextAuthConfig;
