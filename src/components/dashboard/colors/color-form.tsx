"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Color } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Le nom doit contenir au moins deux caractères" }),
  value: z.string().min(4).regex(/^#/, {
    message: "La valeur doit être un code hex et commencer par '#'",
  }),
});
type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm = ({ initialData }: ColorFormProps) => {
  //

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const routeur = useRouter();

  const title = initialData ? "Édition" : "Création";
  const description = initialData ? "Éditer la couleur" : "Ajouter une couleur";
  const toastMessage = initialData
    ? "La couleur à été mise à jour"
    : "La couleur à été ajoutée";
  const action = initialData ? "Modifier" : "Créer";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }

      routeur.refresh();
      routeur.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch {
      toast.error("Une erreur s'est produite!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      routeur.refresh();
      routeur.push(`/${params.storeId}/colors`);
      toast.success("La couleur à été supprimer");
    } catch {
      toast.error(
        "Assurez-vous de supprimer d'abord tous les produits associées à cette couleur"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onComfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la couleur</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || loading}
                      placeholder="ex: Rouge"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valeur</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        disabled={isSubmitting || loading}
                        placeholder="ex: Rouge"
                      />
                      <div
                        className="border p-4 rounded-md"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={!isValid || isSubmitting || loading}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
