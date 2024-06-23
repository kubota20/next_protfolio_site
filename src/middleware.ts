import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

// /lib/auth.config のauthorized経由でページにアクセスする権限を持っているかどうかを確認している為
// export default NextAuth(authConfig).auth;　このコードだけで大丈夫です。
// これを利用する点はミドルウェアが認証を検証するまで保護されたルートのレンダリングが開始されないため、
// アプリケーションのセキュリティとパフォーマンスの両方が向上することです。
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
