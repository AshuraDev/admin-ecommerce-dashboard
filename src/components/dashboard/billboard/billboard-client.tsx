"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const BillboardClient = () => {
  const params = useParams();
  const routeur = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Bannière (0)"
          description="Gestion des bannières de votre boutique."
        />
        <Button
          onClick={() => routeur.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-1 h-4 w-4" />
          Nouveau
        </Button>
      </div>
      <Separator />
    </>
  );
};
