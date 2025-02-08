"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useOrigin } from "@/hooks/use-orign";
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
  label: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins deux caractères" }),
  imgUrl: z.string().min(1),
});
type BillboardForms = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
  //

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const routeur = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edition" : "Création";
  const description = initialData ? "Editer vos stats" : "Créer des stats";
  const toastMessage = initialData
    ? "Mise à jours effectuées"
    : "Création effectuer";
  const action = initialData ? "Modifier" : "Créer";

  const form = useForm<BillboardForms>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imgUrl: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: BillboardForms) => {
    try {
      setLoading(false);
      //   await axios.patch(`/api/stores/${params.storeId}`, data);
      routeur.refresh();
      toast.success(toastMessage);
    } catch {
      toast.error("Une erreur s'est produite!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(false);
      //   await axios.delete(`/api/stores/${params.storeId}`);
      routeur.refresh();
      routeur.push("/");
      toast.success("Votre boutique à été supprimer");
    } catch {
      toast.error(
        "Assurez-vous de supprimer d'abord toutes les catégories et tous les produits"
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || loading}
                      placeholder="Nom"
                    />
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
