import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import prismadb from "@/lib/prismadb";
import { ColorClient } from "@/components/dashboard/colors/color-client";
import { ColorColumn } from "@/components/dashboard/colors/color-columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.updatedAt, "do MMMM, yyyy", { locale: fr }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
