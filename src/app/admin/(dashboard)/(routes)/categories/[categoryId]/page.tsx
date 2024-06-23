import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

import Container from "@/components/ui/container";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  // findUnique 取得 一意の識別子またはIDを指定する必要がある
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className="m-5">
      <Container>
        <CategoryForm data={category} />
      </Container>
    </div>
  );
};

export default CategoryPage;
