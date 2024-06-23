import { signOut } from "next-auth/react";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  return (
    <>
      <Button
        size="icon"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="size-7"
      >
        <LogOut className="size-4" />
      </Button>
    </>
  );
};
