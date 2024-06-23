import { Blog } from "@/types/types";

import { Separator } from "@/components/ui/separator";

import { BlogCard } from "@/components/client-side/ui/blog-card";

interface BlogListProps {
  items: Blog[];
}

export const BlogList: React.FC<BlogListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-bold">- Blogs -</h2>

      <Separator className="my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <BlogCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
