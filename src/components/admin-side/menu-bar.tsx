import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { MainNav } from "@/components/admin-side/main-nav";

export const MenuBar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Menu size={30} />
        </SheetTrigger>

        <SheetContent side="top" className="h-[300px] bg-white">
          <SheetHeader>
            <SheetTitle className="text-center">メニュー</SheetTitle>
          </SheetHeader>
          <div className="my-4 grid grid-cols-1 gap-y-2">
            <MainNav />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
