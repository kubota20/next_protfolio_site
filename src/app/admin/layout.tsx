import { Navbar } from "@/components/admin-side/navbar";
import { ToasterProvider } from "@/providers/toast-provider";
import type { Metadata } from "next";

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
      <header>
        <Navbar />
      </header>
      {children}
      <ToasterProvider />
    </>
  );
}
