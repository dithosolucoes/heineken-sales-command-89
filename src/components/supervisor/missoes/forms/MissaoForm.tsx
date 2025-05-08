
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { PrioridadeType, StatusType } from "@/types/missao";

interface MissaoFormProps {
  isViewOnly?: boolean;
  initialData: {
    titulo: string;
    vendedor: string;
    prioridade: string;
    prazo: string;
    descricao: string;
    progresso?: string;
    status?: string;
  };
  onChange: {
    setTitulo: (value: string) => void;
    setVendedor: (value: string) => void;
    setPrioridade: (value: string) => void;
    setPrazo: (value: string) => void;
    setDescricao: (value: string) => void;
    setProgresso?: (value: string) => void;
    setStatus?: (value: string) => void;
  };
  isEditMode?: boolean;
}

export function MissaoForm({ 
  isViewOnly = false,
  initialData,
  onChange,
  isEditMode = false
}: MissaoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="titulo" className="text-tactical-silver">Título da Missão</Label>
        <Input
          id="titulo"
          value={initialData.titulo}
          onChange={(e) => onChange.setTitulo(e.target.value)}
          className="bg-tactical-black border-heineken/30"
          placeholder="Ex: Aumentar presença de marca no PDV #342"
          disabled={isViewOnly}
        />
      </div>
      
      <div>
        <Label htmlFor="vendedor" className="text-tactical-silver">Vendedor Responsável</Label>
        <Select 
          value={initialData.vendedor} 
          onValueChange={onChange.setVendedor}
          disabled={isViewOnly}
        >
          <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
            <SelectValue placeholder="Selecione um vendedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
            <SelectItem value="Ana Duarte">Ana Duarte</SelectItem>
            <SelectItem value="Bruno Santos">Bruno Santos</SelectItem>
            <SelectItem value="Mariana Costa">Mariana Costa</SelectItem>
            <SelectItem value="Pedro Lima">Pedro Lima</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prioridade" className="text-tactical-silver">Prioridade</Label>
          <Select 
            value={initialData.prioridade} 
            onValueChange={onChange.setPrioridade}
            disabled={isViewOnly}
          >
            <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crítica">Crítica</SelectItem>
              <SelectItem value="relevante">Relevante</SelectItem>
              <SelectItem value="padrão">Padrão</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="prazo" className="text-tactical-silver flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Prazo
          </Label>
          <Input
            id="prazo"
            type="date"
            value={initialData.prazo}
            onChange={(e) => onChange.setPrazo(e.target.value)}
            className="bg-tactical-black border-heineken/30"
            disabled={isViewOnly}
          />
        </div>
      </div>
      
      {(isEditMode || isViewOnly) && onChange.setStatus && onChange.setProgresso && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status" className="text-tactical-silver">Status</Label>
            <Select 
              value={initialData.status} 
              onValueChange={onChange.setStatus}
              disabled={isViewOnly}
            >
              <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="concluída">Concluída</SelectItem>
                <SelectItem value="atrasada">Atrasada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="progresso" className="text-tactical-silver">Progresso (%)</Label>
            <Input
              id="progresso"
              type="number"
              min="0"
              max="100"
              value={initialData.progresso}
              onChange={(e) => onChange.setProgresso(e.target.value)}
              className="bg-tactical-black border-heineken/30"
              disabled={isViewOnly}
            />
          </div>
        </div>
      )}
      
      <div>
        <Label htmlFor="descricao" className="text-tactical-silver">Descrição</Label>
        <Textarea
          id="descricao"
          value={initialData.descricao}
          onChange={(e) => onChange.setDescricao(e.target.value)}
          className="bg-tactical-black border-heineken/30"
          placeholder="Detalhes sobre a missão e o que deve ser feito..."
          rows={4}
          disabled={isViewOnly}
        />
      </div>
    </div>
  );
}
