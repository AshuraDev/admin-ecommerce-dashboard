"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoriesCellAction } from "@/components/dashboard/categories/categories-cell-action";

export type CategoriesColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "billboardLabel",
    header: "Bannière",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CategoriesCellAction data={row.original} />,
  },
];
