"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { ProductColumn } from "@/components/dashboard/products/products-columns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ProductCellActionProps {
  data: ProductColumn;
}

export const ProductCellAction = ({ data }: ProductCellActionProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const routeur = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("L'ID à été copiée");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      routeur.refresh();
      toast.success("Le produit a été supprimé.");
    } catch {
      toast.error(
        "Le produit n'a pas pu être supprimé. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onComfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Copier l&apos;ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              routeur.push(`/${params.storeId}/products/${data.id}`)
            }
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
