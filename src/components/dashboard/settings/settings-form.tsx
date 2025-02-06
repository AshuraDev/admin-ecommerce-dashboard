"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Store } from "@prisma/client";
import { Trash2 } from "lucide-react";

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Paramètres"
        description="Gérer les préférences de la boutique"
      />
      <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
