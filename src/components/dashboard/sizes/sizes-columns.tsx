"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SizeCellAction } from "@/components/dashboard/sizes/size-cell-action";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "value",
    header: "Valeur",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <SizeCellAction data={row.original} />,
  },
];
