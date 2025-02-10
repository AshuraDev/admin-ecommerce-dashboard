"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  CategoriesColumn,
  columns,
} from "@/components/dashboard/categories/categories-columns";

interface CategoryClientProps {
  data: CategoriesColumn[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Catégories (${data.length})`}
          description="Gestion des catégories de votre boutique."
        />
        <Button
          onClick={() => routeur.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
