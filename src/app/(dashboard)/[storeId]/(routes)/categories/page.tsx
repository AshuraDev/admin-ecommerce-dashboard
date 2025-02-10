import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";
import { CategoryClient } from "@/components/dashboard/categories/category-client";
import { CategoriesColumn } from "@/components/dashboard/categories/categories-columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: { billboard: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.updatedAt, "do MMMM, yyyy", { locale: fr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
