
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NovaMissaoCardProps {
  onCreateMission: () => void;
}

export function NovaMissaoCard({ onCreateMission }: NovaMissaoCardProps) {
  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30 sm:w-1/3">
      <CardContent className="flex items-center justify-center p-6">
        <Button 
          className="w-full bg-heineken hover:bg-heineken/80 py-6"
          onClick={onCreateMission}
        >
          <Plus className="mr-2 h-5 w-5" /> Criar Nova Missão
        </Button>
      </CardContent>
    </Card>
  );
}
