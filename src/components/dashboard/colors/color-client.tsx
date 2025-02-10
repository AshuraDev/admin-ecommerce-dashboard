"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  ColorColumn,
  columns,
} from "@/components/dashboard/colors/color-columns";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient = ({ data }: ColorClientProps) => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Couleurs (${data.length})`}
          description="Gestion des différentes couleurs pour les produits."
        />
        <Button onClick={() => routeur.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
