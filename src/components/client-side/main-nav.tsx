"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const MainNav = () => {
  const pathName = usePathname();

  const routes = [
    {
      href: `/about`,
      label: "About",
      active: pathName === `/about`,
    },
    {
      href: `/blogs`,
      label: "Blogs",
      active: pathName === `/blogs`,
    },
    {
      href: `/admin/login`,
      label: "管理者",
      active: pathName === `/admin/login`,
    },
  ];

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-5">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black font-serif",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
