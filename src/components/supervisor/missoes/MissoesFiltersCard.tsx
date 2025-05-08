
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissoesFiltersCardProps {
  filtroStatus: string;
  setFiltroStatus: (status: string) => void;
  filtroVendedor: string;
  setFiltroVendedor: (vendedor: string) => void;
  missoesCount: number;
  filteredCount: number;
}

export function MissoesFiltersCard({ 
  filtroStatus, 
  setFiltroStatus, 
  filtroVendedor, 
  setFiltroVendedor,
  missoesCount,
  filteredCount
}: MissoesFiltersCardProps) {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 flex-grow">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm text-tactical-silver mb-2 block">Status</label>
          <select 
            className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
            onChange={(e) => setFiltroStatus(e.target.value)}
            value={filtroStatus}
          >
            <option value="todas">Todas</option>
            <option value="ativa">Ativas</option>
            <option value="concluída">Concluídas</option>
            <option value="atrasada">Atrasadas</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
          <select 
            className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
            onChange={(e) => setFiltroVendedor(e.target.value)}
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
      </CardContent>
      {filteredCount < missoesCount && (
        <div className="px-6 pb-4 text-center">
          <Button 
            variant="link" 
            className="text-heineken"
            onClick={() => {
              setFiltroStatus("todas");
              setFiltroVendedor("todos");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </Card>
  );
}
