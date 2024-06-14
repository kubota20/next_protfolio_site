"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./call-action";

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
  },
  {
    accessorKey: "link",
    header: "リンク",
    cell: ({ row }) => <div>{row.getValue("link")}</div>,
  },
  {
    accessorKey: "imageUrl",
    header: "画像URL",
    cell: ({ row }) => <div>{row.getValue("imageUrl")}</div>,
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
