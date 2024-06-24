// 開発環境に不要なPrismaClientのインスタンスが追加されないようにする

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismadb: PrismaClient | undefined;

// 開発環境と本番環境を区別するためのフラグ
const isDev = process.env.NODE_ENV === "development";

// PrismaClientのインスタンスを取得する関数
export function getPrismaClient(): PrismaClient {
  if (!prismadb) {
    prismadb = new PrismaClient();
  }
  return prismadb;
}

// 開発環境の場合のみPrismaClientをグローバルに設定
if (isDev) {
  globalThis.prisma = getPrismaClient();
}

// PrismaClientのクローズ処理を追加する
process.on("beforeExit", () => {
  prismadb?.$disconnect();
});

export default prismadb;
