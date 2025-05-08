
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FiltrosCardProps {
  filtroVendedor: string;
  setFiltroVendedor: Dispatch<SetStateAction<string>>;
  filtroAcao: string;
  setFiltroAcao: Dispatch<SetStateAction<string>>;
  filtroPeriodo: string;
  setFiltroPeriodo: Dispatch<SetStateAction<string>>;
  setPaginaAtual: Dispatch<SetStateAction<number>>;
}

export const FiltrosCard = ({
  filtroVendedor,
  setFiltroVendedor,
  filtroAcao,
  setFiltroAcao,
  filtroPeriodo,
  setFiltroPeriodo,
  setPaginaAtual
}: FiltrosCardProps) => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 flex-grow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
          <select 
            className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
            onChange={(e) => {
              setFiltroVendedor(e.target.value);
              setPaginaAtual(1);
            }}
            value={filtroVendedor}
          >
            <option value="todos">Todos</option>
            <option value="Carlos Silva">Carlos Silva</option>
            <option value="Ana Duarte">Ana Duarte</option>
            <option value="Bruno Santos">Bruno Santos</option>
            <option value="Mariana Costa">Mariana Costa</option>
            <option value="Pedro Lima">Pedro Lima</option>
          </select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm text-tactical-silver mb-2 block">Ação</label>
          <select 
            className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
            onChange={(e) => {
              setFiltroAcao(e.target.value);
              setPaginaAtual(1);
            }}
            value={filtroAcao}
          >
            <option value="todas">Todas</option>
            <option value="Venda">Venda</option>
            <option value="Reativação">Reativação</option>
            <option value="Expansão">Expansão</option>
            <option value="Novo PDV">Novo PDV</option>
            <option value="Aumento de Mix">Aumento de Mix</option>
          </select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm text-tactical-silver mb-2 block">Período</label>
          <select 
            className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
            onChange={(e) => {
              setFiltroPeriodo(e.target.value);
              setPaginaAtual(1);
            }}
            value={filtroPeriodo}
          >
            <option value="todos">Todo período</option>
            <option value="semana">Última semana</option>
            <option value="mes">Último mês</option>
            <option value="trimestre">Último trimestre</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
};
