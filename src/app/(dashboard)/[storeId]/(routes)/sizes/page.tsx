import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";
import { SizeClient } from "@/components/dashboard/sizes/size-client";
import { SizeColumn } from "@/components/dashboard/sizes/sizes-columns";

interface SizesPageProps {
  params: Promise<{ storeId: string }>;
}

const SizesPage = async ({ params }: SizesPageProps) => {
  const { storeId } = await params;
  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.updatedAt, "do MMMM, yyyy", { locale: fr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
