import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";
import { formatPrice } from "@/lib/price-format";
import { ProductClient } from "@/components/dashboard/products/product-client";
import { ProductColumn } from "@/components/dashboard/products/products-columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: { category: true, size: true, color: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatPrice(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    
    createdAt: format(item.updatedAt, "do MMMM, yyyy", { locale: fr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
