
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

interface FiltrarRotasCardProps {
  rotasData: any[];
  selectedVendedor: string | null;
  setSelectedVendedor: (vendedor: string) => void;
}

export const FiltrarRotasCard = ({ 
  rotasData, 
  selectedVendedor, 
  setSelectedVendedor 
}: FiltrarRotasCardProps) => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 w-full md:w-2/3">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">Filtrar Rotas</CardTitle>
            <CardDescription>Visualize as rotas por vendedor e dia</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-heineken text-heineken-neon hover:bg-heineken/20">
            <ListFilter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
            <select 
              className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
              onChange={(e) => setSelectedVendedor(e.target.value)}
              value={selectedVendedor || ""}
            >
              <option value="">Todos os vendedores</option>
              {rotasData.map(rota => (
                <option key={rota.id} value={rota.vendedor}>
                  {rota.vendedor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-tactical-silver mb-2 block">Dia da Semana</label>
            <select className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white">
              <option value="">Todos os dias</option>
              <option value="Segunda">Segunda-feira</option>
              <option value="Terça">Terça-feira</option>
              <option value="Quarta">Quarta-feira</option>
              <option value="Quinta">Quinta-feira</option>
              <option value="Sexta">Sexta-feira</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
