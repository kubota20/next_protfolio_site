import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BlogClient } from "./components/client";

import Container from "@/components/ui/container";

const BlogsPage = async () => {
  const blog = await prismadb.blog.findMany({
    include: {
      category: true, //カテゴリをもらう
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // blogにあるidとnameを取り出します
  const formattedblogColumn = blog.map((item) => ({
    id: item.id,
    title: item.title,
    discription: item.discription,
    imageUrl: item.imageUrl,
    link: item.link,
    category: item.category.name,
    release: item.release,
    createdAt: format(item.createdAt, "yyyy年MM月dd日 HH:mm"),
  }));

  return (
    <div className="m-5">
      <Container>
        <BlogClient data={formattedblogColumn} />
      </Container>
    </div>
  );
};

export default BlogsPage;
