
export interface Conversao {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string;
  acao: string;
  vendedor: string;
  origem: "manual" | "planilha";
}

export const conversoesMockData: Conversao[] = Array.from({ length: 50 }).map((_, index) => {
  const vendedores = ["Carlos Silva", "Ana Duarte", "Bruno Santos", "Mariana Costa", "Pedro Lima"];
  const acoes = ["Venda", "Reativação", "Expansão", "Novo PDV", "Aumento de Mix"];
  const origens = ["manual", "planilha"] as const;
  
  return {
    id: `CV-${1000 + index}`,
    clienteId: `PDV-${2000 + Math.floor(Math.random() * 1000)}`,
    clienteNome: `Cliente ${Math.floor(Math.random() * 100)}`,
    data: new Date(2023, 3, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
    acao: acoes[Math.floor(Math.random() * acoes.length)],
    vendedor: vendedores[Math.floor(Math.random() * vendedores.length)],
    origem: origens[Math.floor(Math.random() * origens.length)]
  };
});
