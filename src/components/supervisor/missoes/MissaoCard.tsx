
import { Clock, CheckCircle, AlertCircle, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Missao } from "@/types/missao";

interface MissaoCardProps {
  missao: Missao;
  onViewDetails: (missao: Missao) => void;
  onEditMission: (missao: Missao) => void;
}

export function MissaoCard({ 
  missao, 
  onViewDetails, 
  onEditMission 
}: MissaoCardProps) {
  // Function to get CSS classes based on priority
  const getPrioridadeClasses = (prioridade: string) => {
    switch (prioridade) {
      case "crítica":
        return "text-[#ea384c] border-[#ea384c]";
      case "relevante":
        return "text-amber-400 border-amber-400";
      default:
        return "text-tactical-silver border-tactical-silver";
    }
  };

  // Function to get CSS classes based on status
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "concluída":
        return "bg-heineken/20 text-heineken-neon";
      case "atrasada":
        return "bg-[#ea384c]/20 text-[#ea384c]";
      default:
        return "bg-tactical-silver/20 text-tactical-silver";
    }
  };

  return (
    <Card className="bg-tactical-darkgray/80 border-heineken/30">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            className={`${getStatusClasses(missao.status)} border-0`}
          >
            {missao.status === "ativa" && <Clock className="mr-1 h-3 w-3" />}
            {missao.status === "concluída" && <CheckCircle className="mr-1 h-3 w-3" />}
            {missao.status === "atrasada" && <AlertCircle className="mr-1 h-3 w-3" />}
            {missao.status.charAt(0).toUpperCase() + missao.status.slice(1)}
          </Badge>
          <Badge 
            variant="outline" 
            className={`${getPrioridadeClasses(missao.prioridade)}`}
          >
            {missao.prioridade}
          </Badge>
        </div>
        
        <CardTitle className="text-md text-heineken-neon">
          {missao.titulo}
        </CardTitle>
        
        <CardDescription className="flex items-center mt-1">
          <User className="h-3 w-3 mr-1" />
          {missao.vendedor}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="py-2">
        <p className="text-sm text-tactical-silver mb-3">{missao.descricao}</p>
        
        <div className="w-full bg-tactical-black h-2 rounded-full mb-1">
          <div 
            className="bg-heineken h-2 rounded-full" 
            style={{ width: `${missao.progresso}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-tactical-silver">Progresso: {missao.progresso}%</span>
          <span className="flex items-center text-tactical-silver">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(missao.prazo).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-heineken/30 text-heineken-neon hover:bg-heineken/20"
          onClick={() => onViewDetails(missao)}
        >
          Detalhes
        </Button>
        {missao.status !== "concluída" && (
          <Button 
            size="sm" 
            className="bg-heineken hover:bg-heineken/80"
            onClick={() => onEditMission(missao)}
          >
            {missao.status === "atrasada" ? "Reagendar" : "Atualizar"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
