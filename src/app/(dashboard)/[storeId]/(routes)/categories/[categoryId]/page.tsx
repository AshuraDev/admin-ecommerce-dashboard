import React from "react";

import prismadb from "@/lib/prismadb";
import { CategoryForm } from "@/components/dashboard/categories/category-form";

interface CategoryPageProps {
  params: Promise<{ storeId: string; categoryId: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  
  const { storeId, categoryId } = await params;

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
