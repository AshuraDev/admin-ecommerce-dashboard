"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Billboard, Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  billboardId: z
    .string()
    .min(1, { message: "Doit contenir au moins un caractère" }),
});
type CategoryFormsValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm = ({
  initialData,
  billboards,
}: CategoryFormProps) => {
  //

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const routeur = useRouter();

  const title = initialData ? "Édition" : "Création";
  const description = initialData
    ? "Éditer une catégorie"
    : "Créer une catégorie";
  const toastMessage = initialData
    ? "Mise à jour de la catégorie effectuée"
    : "Création de la catégorie effectuée";
  const action = initialData ? "Modifier" : "Créer";

  const form = useForm<CategoryFormsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: CategoryFormsValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      routeur.refresh();
      routeur.push(`/${params.storeId}/categories`);
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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      routeur.refresh();
      routeur.push(`/${params.storeId}/categories`);
      toast.success("La Catégorie à été supprimer");
    } catch {
      toast.error(
        "Assurez-vous de supprimer d'abord tous les produits associées à cette catégorie"
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
                  <FormLabel>Nom de la catégorie</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || loading}
                      placeholder="Ma catégorie"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choisir la bannière</FormLabel>
                  <Select
                    disabled={isSubmitting || loading}
                    onOpenChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Choisir une bannière"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
