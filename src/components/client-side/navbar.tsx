"use client";

import Link from "next/link";

import { MainNav } from "@/components/client-side/main-nav";
import { MenuBar } from "@/components/client-side/menu-bar";
import Container from "@/components/ui/container";

export const Navbar = () => {
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        {/* ロゴ */}
        <Link href="/client">
          <div className="flex flex-col">
            <p className="font-bold text-xl italic font-serif">Portfolio</p>
            <p className="text-[10px] text-gray-500">
              - ポートフォリオページ -
            </p>
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
