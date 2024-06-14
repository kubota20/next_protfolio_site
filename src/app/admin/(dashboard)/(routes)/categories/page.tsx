import prismadb from "@/lib/prismadb";
import Container from "@/components/ui/container";
import { CategoryClient } from "./components/client";

const CategoriesPage = async () => {
  const catedories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // catedoriesにあるidとnameを取り出します
  const formattedCategorieColumn = catedories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="m-5">
      <Container>
        <CategoryClient data={formattedCategorieColumn} />
      </Container>
    </div>
  );
};

export default CategoriesPage;
