import React from "react";
import { format } from "date-fns";
import {fr} from 'date-fns/locale'


import prismadb from "@/lib/prismadb";
import { BillboardClient } from "@/components/dashboard/billboards/billboard-client";
import { BillboardColumn } from "@/components/dashboard/billboards/billboards-columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.updatedAt, "do MMMM, yyyy",{locale:fr}),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
