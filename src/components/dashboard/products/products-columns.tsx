"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductCellAction } from "@/components/dashboard/products/product-cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "isArchived",
    header: "Archivé",
  },
  {
    accessorKey: "isFeatured",
    header: "Tendance",
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "category",
    header: "Catégorie",
  },
  {
    accessorKey: "size",
    header: "Taille",
  },
  {
    accessorKey: "color",
    header: "Couleur",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ProductCellAction data={row.original} />,
  },
];
