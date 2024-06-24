import { getBlogs } from "@/actions/get-blogs";

import { BlogList } from "@/components/client-side/blog-list";
import Container from "@/components/ui/container";

export const revalidate = 10;

const BlogsPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="flex items-center my-5 sm:mx-6 lg:mx-8">
      <Container>
        <BlogList items={blogs} />
      </Container>
    </div>
  );
};

export default BlogsPage;
