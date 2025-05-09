
import React, { useState } from "react";
import { Calendar, CalendarDays, CalendarRange, Target, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Definindo a interface para as missões
interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  priority: "high" | "medium" | "low";
  deadline: string;
  status: "active" | "completed" | "overdue";
}

// Dados de exemplo para missões
const mockMissions: Mission[] = [
  {
    id: "mission1",
    title: "Conquiste o Cluster 9",
    description: "Visite e converta 5 clientes no Cluster 9 para aumentar a presença da marca.",
    progress: 3,
    total: 5,
    priority: "high",
    deadline: "15/04/2025",
    status: "active"
  },
  {
    id: "mission2",
    title: "Expansão de Mix",
    description: "Introduza Heineken 0.0 em 3 estabelecimentos premium.",
    progress: 1,
    total: 3,
    priority: "medium",
    deadline: "20/04/2025",
    status: "active"
  },
  {
    id: "mission3",
    title: "Manutenção de PDV",
    description: "Verifique a qualidade dos displays em 8 PDVs estratégicos.",
    progress: 4,
    total: 8,
    priority: "low",
    deadline: "30/04/2025",
    status: "completed"
  }
];

interface MissionPanelProps {
  compact?: boolean;
  onSelectMission?: (mission: Mission) => void;
}

const MissionPanel: React.FC<MissionPanelProps> = ({ 
  compact = false,
  onSelectMission
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');

  // Função para filtrar as missões com base no status selecionado
  const getFilteredMissions = () => {
    if (statusFilter === 'all') {
      return mockMissions;
    }
    return mockMissions.filter(mission => mission.status === statusFilter);
  };

  const filteredMissions = getFilteredMissions();

  // Função para obter as classes CSS com base na prioridade
  const getPriorityClasses = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-[#ea384c] border-[#ea384c]";
      case "medium":
        return "text-amber-400 border-amber-400";
      default:
        return "text-tactical-silver border-tactical-silver";
    }
  };

  // Função para obter as classes CSS com base no status
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-heineken/20 text-heineken-neon";
      case "overdue":
        return "bg-[#ea384c]/20 text-[#ea384c]";
      default:
        return "bg-tactical-silver/20 text-tactical-silver";
    }
  };

  return (
    <div className={`tactical-panel h-full flex flex-col ${compact ? 'p-2' : 'p-4'} bg-tactical-darkgray/90 backdrop-blur-md`}>
      <div className="flex items-center justify-between border-b border-heineken/20 pb-2 mb-3">
        <h2 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-heineken-neon flex items-center`}>
          <Target size={compact ? 14 : 16} className="mr-2" />
          MISSÕES ATIVAS
        </h2>
        <ToggleGroup type="single" value={statusFilter} onValueChange={(value) => 
          value && setStatusFilter(value as 'all' | 'active' | 'completed' | 'overdue')
        }>
          <ToggleGroupItem value="all" aria-label="Todas" className="p-1">
            <Target size={compact ? 12 : 14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="active" aria-label="Ativas" className="p-1">
            <Clock size={compact ? 12 : 14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="completed" aria-label="Concluídas" className="p-1">
            <CheckCircle size={compact ? 12 : 14} />
          </ToggleGroupItem>
          <ToggleGroupItem value="overdue" aria-label="Atrasadas" className="p-1">
            <AlertCircle size={compact ? 12 : 14} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filteredMissions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-tactical-silver text-sm">
          <Target size={24} className="mb-2" />
          <p>Nenhuma missão {statusFilter !== 'all' ? `com status ${statusFilter}` : ''}</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[calc(100%-2rem)]">
          {filteredMissions.map((mission) => (
            <div 
              key={mission.id} 
              className={`tactical-panel ${compact ? 'p-2' : 'p-3'} border border-l-4 hover:bg-tactical-darkgray/90 transition-all duration-200 cursor-pointer`}
              style={{ 
                borderLeftColor: 
                  mission.priority === "high" ? "#ea384c" : 
                  mission.priority === "medium" ? "#FFD700" : 
                  "#9F9EA1"
              }}
              onClick={() => onSelectMission && onSelectMission(mission)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-tactical-silver`}>
                  {mission.title}
                </h3>
                <Badge 
                  className={`${getStatusClasses(mission.status)} border-0 text-xs`}
                >
                  {mission.status === "active" && <Clock className="mr-1 h-3 w-3" />}
                  {mission.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                  {mission.status === "overdue" && <AlertCircle className="mr-1 h-3 w-3" />}
                  {mission.status === "active" && "Ativa"}
                  {mission.status === "completed" && "Concluída"}
                  {mission.status === "overdue" && "Atrasada"}
                </Badge>
              </div>
              
              <p className="text-xs text-tactical-silver/80 mb-2 line-clamp-2">
                {mission.description}
              </p>
              
              <div className="w-full bg-tactical-black h-2 rounded-full mb-1">
                <div 
                  className="bg-heineken h-2 rounded-full" 
                  style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-tactical-silver">
                  Progresso: {mission.progress}/{mission.total}
                </span>
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1 text-heineken" />
                  <span className="text-heineken-neon">{mission.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionPanel;
