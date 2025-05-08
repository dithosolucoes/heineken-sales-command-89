
// Types for mission priority and status
export type PrioridadeType = "crítica" | "relevante" | "padrão";
export type StatusType = "ativa" | "concluída" | "atrasada";

// Interface for missions
export interface Missao {
  id: number;
  titulo: string;
  vendedor: string;
  prioridade: string;
  progresso: number;
  prazo: string;
  status: string;
  descricao: string;
}
