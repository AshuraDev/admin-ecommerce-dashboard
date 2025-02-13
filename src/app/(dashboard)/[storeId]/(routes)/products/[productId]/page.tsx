import React from "react";

import prismadb from "@/lib/prismadb";
import { ProductForm } from "@/components/dashboard/products/product-form";

interface ProductPageProps {
  params: Promise<{ storeId: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { storeId, productId } = await params;

  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
