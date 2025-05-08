
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Info } from "lucide-react";

interface Rota {
  id: number;
  vendedor: string;
  diasSemana: string[];
  qtdPDVs: number;
  bairros: string[];
  ultimaAtualizacao: string;
}

interface RotasCadastradasCardProps {
  rotasData: Rota[];
  selectedVendedor: string | null;
}

export const RotasCadastradasCard = ({ 
  rotasData, 
  selectedVendedor 
}: RotasCadastradasCardProps) => {
  const filteredRotas = rotasData.filter(rota => !selectedVendedor || rota.vendedor === selectedVendedor);

  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30">
      <CardHeader>
        <CardTitle className="text-lg">Rotas Cadastradas</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        {filteredRotas.map(rota => (
          <Card key={rota.id} className="mb-4 bg-tactical-black border-heineken/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-md text-heineken-neon">{rota.vendedor}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {rota.diasSemana.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-tactical-silver">PDVs:</p>
                  <p className="font-medium">{rota.qtdPDVs}</p>
                </div>
                <div>
                  <p className="text-tactical-silver">Bairros:</p>
                  <p className="font-medium">{rota.bairros.join(', ')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 text-xs text-tactical-silver">
              <p className="flex items-center">
                <Info className="h-3 w-3 mr-1" />
                Atualizado em {new Date(rota.ultimaAtualizacao).toLocaleDateString('pt-BR')}
              </p>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
