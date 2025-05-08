
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissoesEmptyStateProps {
  onClearFilters: () => void;
}

export function MissoesEmptyState({ onClearFilters }: MissoesEmptyStateProps) {
  return (
    <div className="col-span-full flex items-center justify-center h-40 border border-dashed border-tactical-silver/30 rounded-lg">
      <div className="text-center">
        <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
        <p className="text-tactical-silver">Nenhuma missão encontrada com os filtros atuais.</p>
        <Button 
          variant="link" 
          className="text-heineken mt-2"
          onClick={onClearFilters}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  );
}
