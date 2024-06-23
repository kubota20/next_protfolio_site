import prismadb from "@/lib/prismadb";

import { BlogForm } from "./components/blog-form";

import Container from "@/components/ui/container";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  // findUnique 取得 一意の識別子またはIDを指定する必要がある
  const blog = await prismadb.blog.findUnique({
    where: {
      id: params.blogId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className="m-5">
      <Container>
        <BlogForm data={blog} categories={categories} />
      </Container>
    </div>
  );
};

export default BlogPage;
