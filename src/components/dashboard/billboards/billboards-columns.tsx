"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardsCellAction } from "@/components/dashboard/billboards/billboards-cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardsCellAction data={row.original} />,
  },
];
