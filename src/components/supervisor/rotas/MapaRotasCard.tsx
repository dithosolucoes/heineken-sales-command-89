
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapIcon } from "lucide-react";
import Map from "@/components/Map";
import { useState } from "react";

interface MapaRotasCardProps {
  selectedVendedor: string | null;
}

export const MapaRotasCard = ({ selectedVendedor }: MapaRotasCardProps) => {
  const [observacoes, setObservacoes] = useState("");

  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30">
      <CardHeader>
        <CardTitle className="text-lg">Mapa de Rotas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] tactical-panel relative overflow-hidden rounded">
          {selectedVendedor ? (
            <Map 
              className="pointer-events-auto" 
              vendedorFilter={selectedVendedor} 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-tactical-black/70">
              <div className="text-center">
                <MapIcon className="h-12 w-12 text-heineken-neon mx-auto mb-2" />
                <p className="text-heineken-neon">Mapa com PDVs por vendedor</p>
                <p className="text-sm text-tactical-silver mt-2">
                  Selecione um vendedor para visualizar suas rotas
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <label className="text-sm text-tactical-silver mb-2 block">Observações da Rota</label>
          <Input 
            className="bg-tactical-black border-heineken/30 w-full" 
            placeholder="Adicione comentários ou instruções para a rota..." 
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button 
              size="sm" 
              className="bg-heineken hover:bg-heineken/80"
              onClick={() => {
                if (selectedVendedor && observacoes) {
                  console.log(`Salvando observações para ${selectedVendedor}: ${observacoes}`);
                  // Aqui implementaríamos a chamada para a API para salvar as observações
                  // futuramente quando conectado ao backend
                }
              }}
            >
              Salvar Observações
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
