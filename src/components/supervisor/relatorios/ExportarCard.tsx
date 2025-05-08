
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExportarCardProps {
  onExportar: () => void;
}

export const ExportarCard = ({ onExportar }: ExportarCardProps) => {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 sm:w-1/4">
      <CardContent className="flex items-center justify-center p-6">
        <Button 
          className="w-full bg-heineken hover:bg-heineken/80"
          onClick={onExportar}
        >
          <Download className="mr-2 h-5 w-5" /> Exportar Relatório
        </Button>
      </CardContent>
    </Card>
  );
};
