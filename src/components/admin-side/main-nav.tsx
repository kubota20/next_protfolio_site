"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { LogoutButton } from "@/components/auth-button/logout-button";

export const MainNav = () => {
  const pathName = usePathname();

  const routes = [
    {
      href: `/admin`,
      label: "Admin",
      active: pathName === `/admin`,
    },
    {
      href: `/admin/blogs`,
      label: "Blogs",
      active: pathName === `/admin/blogs`,
    },
    {
      href: `/admin/categories`,
      label: "Categories",
      active: pathName === `/admin/categories`,
    },
  ];

  return (
    <nav className="mx-6 flex items-center justify-center space-x-4 lg:space-x-5">
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

      <LogoutButton />
    </nav>
  );
};
