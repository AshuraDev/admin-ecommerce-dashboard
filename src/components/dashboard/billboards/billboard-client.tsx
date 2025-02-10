"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { ApiList } from "@/components/api-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  BillboardColumn,
  columns,
} from "@/components/dashboard/billboards/billboards-columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient = ({ data }: BillboardClientProps) => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Bannière (${data.length})`}
          description="Gestion des bannières de votre boutique."
        />
        <Button
          onClick={() => routeur.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Ajouter
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
