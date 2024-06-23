import type { Metadata } from "next";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";

import { Navbar } from "@/components/admin-side/navbar";

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin",
  description: "クボタの管理者ページです",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <header>
          <Navbar />
        </header>
        {children}
        <ToasterProvider />
        <ModalProvider />
      </SessionProvider>
    </>
  );
}
