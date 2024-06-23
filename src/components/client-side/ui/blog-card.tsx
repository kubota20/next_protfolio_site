import Image from "next/image";
import Link from "next/link";

import { Blog } from "@/types/types";

import { format } from "date-fns";

import { ChevronRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogCardProps {
  data: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <>
      <Card className="max-sm:w-[300px]">
        <CardHeader className="">
          {/* 画像 */}
          <div className="bg-gray-500 rounded-xls h-[180px] relative">
            <Image
              fill
              className="object-cover"
              src={data.imageUrl}
              alt={data.title}
            />
          </div>
          <div className="flex items-center justify-between">
            {/* タイトル */}
            <CardTitle className="text-sm">{data.title}</CardTitle>
            {/* 日付 */}
            <p className="text-[10px] text-gray-400 ">
              {format(data.createdAt, "yyyy/MM/dd")}
            </p>
          </div>

          <Separator />

          {/*  */}
          <p className="text-xs text-gray-500">{data.category.name}</p>
        </CardHeader>

        <CardContent className="relative">
          <Link href={data.link} className="cursor-pointer hover:opacity-50">
            <p className="text-sm whitespace-pre-line break-words line-clamp-3">
              {data.discription}
            </p>
            <ChevronRight className="absolute -right-1 bottom-0" />
          </Link>
        </CardContent>
      </Card>
    </>
  );
};
