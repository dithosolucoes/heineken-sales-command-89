
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const DesempenhoCard = () => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Evolução de Desempenho</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-heineken-neon mx-auto mb-3" />
          <p className="text-tactical-silver">Gráfico de evolução de conversões ao longo do período</p>
        </div>
      </CardContent>
    </Card>
  );
};
