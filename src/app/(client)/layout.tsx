import { Footer } from "@/components/client-side/footer";
import { Navbar } from "@/components/client-side/navbar";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
}
