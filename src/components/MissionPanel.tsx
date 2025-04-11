
import React from "react";
import { Check, Target, AlertTriangle } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  priority: "low" | "medium" | "high";
  deadline?: string;
}

interface MissionPanelProps {
  missions: Mission[];
  compact?: boolean;
}

const MissionPanel: React.FC<MissionPanelProps> = ({ missions, compact = false }) => {
  // Sort missions by priority (high first)
  const sortedMissions = [...missions].sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-tactical-silver";
    }
  };

  return (
    <div className={`tactical-panel h-full flex flex-col ${compact ? 'p-2' : 'p-4'}`}>
      <div className="flex items-center justify-between border-b border-heineken/20 pb-2 mb-3">
        <h2 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-heineken-neon flex items-center`}>
          <Target size={compact ? 14 : 16} className="mr-2" />
          MISSÕES ATIVAS
        </h2>
        <span className="text-xs text-tactical-silver">{missions.length} missões</span>
      </div>

      {missions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-tactical-silver text-sm">
          <AlertTriangle size={24} className="mb-2" />
          <p>Nenhuma missão ativa</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {sortedMissions.map((mission) => (
            <div 
              key={mission.id} 
              className={`tactical-panel ${compact ? 'p-2' : 'p-3'} border border-l-4 hover:bg-tactical-darkgray/90 transition-all duration-200`}
              style={{ borderLeftColor: mission.priority === "high" ? "#ef4444" : 
                       mission.priority === "medium" ? "#eab308" : "#3b82f6" }}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-tactical-silver`}>
                  {mission.title}
                </h3>
                {!compact && (
                  <span className={`text-xs ${getPriorityClass(mission.priority)} px-1.5 py-0.5 rounded-sm border border-current`}>
                    {mission.priority === "high" ? "CRÍTICO" : 
                    mission.priority === "medium" ? "RELEVANTE" : "PADRÃO"}
                  </span>
                )}
              </div>
              
              {!compact && <p className="text-xs text-tactical-silver/80 mb-2">{mission.description}</p>}
              
              <div className="flex items-center justify-between mb-1">
                <ProgressBar 
                  value={mission.progress} 
                  max={mission.total} 
                  size="sm"
                />
                <span className="text-xs text-heineken ml-2">
                  {mission.progress}/{mission.total}
                </span>
              </div>
              
              {mission.deadline && (
                <div className="text-xs text-tactical-silver/70 flex justify-between">
                  <span>Prazo:</span>
                  <span>{mission.deadline}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!compact && (
        <div className="border-t border-heineken/20 pt-3 mt-3">
          <button className="w-full tactical-button py-1.5 text-xs flex items-center justify-center">
            <Check size={12} className="mr-1" />
            COMPLETAR MISSÕES
          </button>
        </div>
      )}
    </div>
  );
};

export default MissionPanel;
