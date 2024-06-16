"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-action";

import { SquareChevronDown, SquareChevronUp, Copy } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const onClickCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("コピーしました");
};

export type BlogColumnProps = {
  id: string;
  title: string;
  discription: string;
  link: string;
  imageUrl: string;
  category: string;
  release: boolean;
  createdAt: string;
};

export const columns: ColumnDef<BlogColumnProps>[] = [
  {
    id: "id",
    header: ({ table }) => (
      // チェックしたら全てのテーブルデータがチェックできます
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      // 単体のテーブルデータがチェックできます
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    enableHiding: false,
    header: "タイトル",
  },
  {
    accessorKey: "discription",
    enableHiding: false,
    header: "説明",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between">
            <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
              {row.getValue("discription")}
            </div>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <SquareChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[300px]">
          <div className="flex items-center justify-between">
            <DropdownMenuLabel>{row.getValue("title")}</DropdownMenuLabel>
            <DropdownMenuItem>
              <SquareChevronUp className="h-4 w-4" />
            </DropdownMenuItem>
          </div>
          <div className="px-2">{row.getValue("discription")}</div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "link",
    header: "リンク",
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
          {row.getValue("link")}
        </div>
        <Copy
          className="h-4 w-4"
          onClick={() => onClickCopy(row.getValue("link"))}
        />
      </div>
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "画像URL",
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
          {row.getValue("imageUrl")}
        </div>
        <Copy
          className="h-4 w-4"
          onClick={() => onClickCopy(row.getValue("imageUrl"))}
        />
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "カテゴリ",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "投稿日",
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "release",
    enableHiding: false,
    header: "公開",
  },
  {
    id: "actions",
    header: "設定",
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
