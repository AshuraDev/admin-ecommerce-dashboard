"use client";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
  OrderColumn,
  columns,
} from "@/components/dashboard/orders/orders-columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Commandes (${data.length})`}
        description="Liste des commandes de la boutique."
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
