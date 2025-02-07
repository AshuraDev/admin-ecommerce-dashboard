"use client";

import * as z from "zod";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SettingsFormProps {
  initialData: Store;
}
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins deux caractères" }),
});
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Paramètres"
          description="Gérer les préférences de la boutique"
        />
        <Button variant={"destructive"} size={"icon"} onClick={() => {}}>
          <Trash2 className="h-4 w-4" />
        </Button>
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
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Nom de la boutique"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={!isValid || isSubmitting}
            className="ml-auto"
            type="submit"
          >
            Modifier le nom
          </Button>
        </form>
      </Form>
    </>
  );
};
