import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("E-mail inválido."),
    password: z
      .string()
      .min(10, "A senha deve conter pelo menos 10 caracteres."),
    confirmPassword: z
      .string()
      .min(10, "A senha deve conter pelo menos 10 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem. Por favor tente novamente.",
    path: ["confirmPassword"],
  });
