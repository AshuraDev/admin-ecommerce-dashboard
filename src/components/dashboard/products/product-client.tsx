"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  ProductColumn,
  columns,
} from "@/components/dashboard/products/products-columns";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient = ({ data }: ProductClientProps) => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${data.length})`}
          description="Gestion des produits de la boutique."
        />
        <Button
          onClick={() => routeur.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
