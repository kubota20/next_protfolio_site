"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MainNav = () => {
  const pathName = usePathname();

  const routes = [
    {
      href: `/about`,
      label: "About",
      active: pathName === `/about`,
    },
    {
      href: `/projects`,
      label: "Projects",
      active: pathName === `/projects`,
    },
    {
      href: `/blogs`,
      label: "Blogs",
      active: pathName === `/blogs`,
    },
    {
      href: `/contact`,
      label: "Contact",
      active: pathName === `/contact`,
    },
  ];

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-5">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
