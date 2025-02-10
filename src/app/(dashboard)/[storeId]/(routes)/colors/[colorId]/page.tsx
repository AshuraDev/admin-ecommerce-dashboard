import React from "react";

import prismadb from "@/lib/prismadb";
import { ColorForm } from "@/components/dashboard/colors/color-form";

const SizePage = async ({
  params,
}: {
  params: {  colorId: string };
}) => {
  const {colorId } = await params;

  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default SizePage;
