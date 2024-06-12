"use client";

import { MainNav } from "./main-nav";
import Container from "@/components/ui/container";
import Link from "next/link";
import { MenuBar } from "./menu-bar";

export const Navbar = () => {
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        {/* ロゴ */}
        <Link href="/admin">
          <div className="flex flex-col items-end">
            <p className="font-bold text-xl italic">Dashboard</p>
            <p className="text-xs text-gray-500">- 管理者ページ -</p>
          </div>
        </Link>

        {/* メニューバー 640px以上で消えます */}
        <div className="sm:hidden">
          <MenuBar />
        </div>

        {/* メインナビ 640px以下で消えます*/}
        <div className="max-sm:hidden">
          <MainNav />
        </div>
      </div>
    </Container>
  );
};
