"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  SizeColumn,
  columns,
} from "@/components/dashboard/sizes/sizes-columns";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tailles (${data.length})`}
          description="Gestion des différentes tailles de votre boutique."
        />
        <Button
          onClick={() => routeur.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
