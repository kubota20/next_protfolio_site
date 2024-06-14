import { format } from "date-fns";
import Container from "@/components/ui/container";
import prismadb from "@/lib/prismadb";
import { BlogClient } from "./components/client";

const BlogsPage = async () => {
  const catedories = await prismadb.blog.findMany({
    include: {
      category: true, //カテゴリをもらう
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // catedoriesにあるidとnameを取り出します
  const formattedblogColumn = catedories.map((item) => ({
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
