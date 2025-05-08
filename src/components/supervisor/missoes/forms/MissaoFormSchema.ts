
import { z } from "zod";
import { PrioridadeType, StatusType } from "@/types/missao";

export const missaoFormSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  vendedor: z.string().min(1, "Selecione um vendedor"),
  prioridade: z.string().min(1, "Selecione uma prioridade"),
  prazo: z.string().min(1, "Selecione um prazo"),
  descricao: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  progresso: z.string().optional(),
  status: z.string().optional(),
});

export type MissaoFormValues = z.infer<typeof missaoFormSchema>;
