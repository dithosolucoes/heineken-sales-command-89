
import { TableRow, TableCell } from "@/components/ui/table";
import { Calendar, FileText, User } from "lucide-react";

interface Conversao {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string;
  acao: string;
  vendedor: string;
  origem: "manual" | "planilha";
}

interface ConversaoItemProps {
  conversao: Conversao;
}

export const ConversaoItem = ({ conversao }: ConversaoItemProps) => {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{conversao.id}</TableCell>
      <TableCell>
        <div>
          <span className="font-medium">{conversao.clienteNome}</span>
          <span className="block text-xs text-tactical-silver">{conversao.clienteId}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-tactical-silver" />
          {new Date(conversao.data).toLocaleDateString('pt-BR')}
        </div>
      </TableCell>
      <TableCell>{conversao.acao}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1 text-tactical-silver" />
          {conversao.vendedor}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          {conversao.origem === "manual" ? (
            <span className="py-1 px-2 bg-heineken/20 text-heineken-neon text-xs rounded-md">Manual</span>
          ) : (
            <span className="py-1 px-2 bg-tactical-silver/20 text-tactical-silver text-xs rounded-md flex items-center">
              <FileText className="h-3 w-3 mr-1" /> Planilha
            </span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
