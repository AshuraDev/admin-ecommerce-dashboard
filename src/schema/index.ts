import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2,{message:"Le nom doit contenir au moins deux caractères"}),
});

// const { isSubmitting, isValid } = form.formState;