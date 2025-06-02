import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("O valor deve ser positivo"),
  category: z.string().min(1, "Categoria é obrigatória"),
});
