
import { Missao } from "@/types/missao";

// Mock data for missions
export const missoesData: Missao[] = [
  {
    id: 1,
    titulo: "Aumentar presença de marca no PDV #342",
    vendedor: "Carlos Silva",
    prioridade: "crítica",
    progresso: 25,
    prazo: "2023-05-10",
    status: "ativa",
    descricao: "Negociar espaço de geladeira e instalar material de POP no bar Avenida."
  },
  {
    id: 2,
    titulo: "Recuperar cliente PDV #185",
    vendedor: "Ana Duarte",
    prioridade: "relevante",
    progresso: 75,
    prazo: "2023-05-08",
    status: "ativa",
    descricao: "Oferecer condições especiais para o restaurante Silva que diminuiu pedidos."
  },
  {
    id: 3,
    titulo: "Introduzir novo produto no PDV #421",
    vendedor: "Bruno Santos",
    prioridade: "padrão",
    progresso: 100,
    prazo: "2023-05-01",
    status: "concluída",
    descricao: "Apresentar a nova Heineken 0.0 com material promocional."
  },
  {
    id: 4,
    titulo: "Resolver pendência de pagamento PDV #098",
    vendedor: "Mariana Costa",
    prioridade: "crítica",
    progresso: 0,
    prazo: "2023-04-28",
    status: "atrasada",
    descricao: "Negociar parcelamento da dívida com o proprietário do Bar Central."
  },
  {
    id: 5,
    titulo: "Fechamento de contrato PDV #256",
    vendedor: "Pedro Lima",
    prioridade: "relevante",
    progresso: 50,
    prazo: "2023-05-12",
    status: "ativa",
    descricao: "Finalizar contrato de exclusividade com o restaurante Sabor da Serra."
  }
];
