
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

interface MissaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  missao?: {
    id: number;
    titulo: string;
    vendedor: string;
    prioridade: string;
    prazo: string;
    status: string;
    descricao: string;
    progresso: number;
  };
  mode: 'create' | 'edit' | 'view';
}

export function MissaoModal({ 
  isOpen, 
  onClose, 
  missao,
  mode 
}: MissaoModalProps) {
  const [titulo, setTitulo] = useState(missao?.titulo || "");
  const [vendedor, setVendedor] = useState(missao?.vendedor || "");
  const [prioridade, setPrioridade] = useState(missao?.prioridade || "padrão");
  const [prazo, setPrazo] = useState(missao?.prazo || "");
  const [descricao, setDescricao] = useState(missao?.descricao || "");
  const [progresso, setProgresso] = useState(missao?.progresso?.toString() || "0");
  const [status, setStatus] = useState(missao?.status || "ativa");

  const isViewOnly = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  const handleSubmit = () => {
    // Aqui seria implementada a lógica para salvar ou atualizar a missão
    if (isCreateMode) {
      toast.success(`Missão "${titulo}" criada com sucesso!`);
    } else if (isEditMode) {
      toast.success(`Missão "${titulo}" atualizada com sucesso!`);
    }
    onClose();
  };

  const getModalTitle = () => {
    if (isCreateMode) return "Criar Nova Missão";
    if (isEditMode) return "Atualizar Missão";
    return "Detalhes da Missão";
  };

  return (
    <Modal
      title={getModalTitle()}
      description={isCreateMode ? "Crie uma nova missão para seu time" : undefined}
      isOpen={isOpen}
      onClose={onClose}
      footer={
        !isViewOnly ? (
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={onClose} className="border-heineken/30 text-tactical-silver">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-heineken hover:bg-heineken/80">
              {isCreateMode ? "Criar" : "Salvar"}
            </Button>
          </div>
        ) : (
          <Button onClick={onClose} className="bg-heineken hover:bg-heineken/80 w-full">
            Fechar
          </Button>
        )
      }
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="titulo" className="text-tactical-silver">Título da Missão</Label>
          <Input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-tactical-black border-heineken/30"
            placeholder="Ex: Aumentar presença de marca no PDV #342"
            disabled={isViewOnly}
          />
        </div>
        
        <div>
          <Label htmlFor="vendedor" className="text-tactical-silver">Vendedor Responsável</Label>
          <Select 
            value={vendedor} 
            onValueChange={setVendedor}
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
              value={prioridade} 
              onValueChange={setPrioridade}
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
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="bg-tactical-black border-heineken/30"
              disabled={isViewOnly}
            />
          </div>
        </div>
        
        {(isEditMode || isViewOnly) && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status" className="text-tactical-silver">Status</Label>
              <Select 
                value={status} 
                onValueChange={setStatus}
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
                value={progresso}
                onChange={(e) => setProgresso(e.target.value)}
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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="bg-tactical-black border-heineken/30"
            placeholder="Detalhes sobre a missão e o que deve ser feito..."
            rows={4}
            disabled={isViewOnly}
          />
        </div>
      </div>
    </Modal>
  );
}
