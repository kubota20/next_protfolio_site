"use client";

import { DataTable } from "@/components/admin-side/ui/data-teble";
import { CategoryColumnProps, columns } from "./columns";
import { Heading } from "@/components/admin-side/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface CategoryClientProps {
  data: CategoryColumnProps[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="カテゴリページにようこそ!"
        />
        <Button
          // new は [catedoryId] に入ります
          onClick={() => router.push(`/admin/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> 追加
        </Button>
      </div>

      <Separator className="my-4" />

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
