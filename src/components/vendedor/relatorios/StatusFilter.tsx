
import { Dispatch, SetStateAction } from "react";

interface StatusFilterProps {
  filtroStatus: string;
  setFiltroStatus: Dispatch<SetStateAction<string>>;
}

export const StatusFilter = ({ filtroStatus, setFiltroStatus }: StatusFilterProps) => {
  return (
    <div className="flex-1">
      <label className="text-sm text-tactical-silver mb-2 block">Status</label>
      <select 
        className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="confirmado">Confirmados</option>
        <option value="pendente">Pendentes</option>
        <option value="revertido">Revertidos</option>
      </select>
    </div>
  );
};
