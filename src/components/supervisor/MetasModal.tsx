
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface MetasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MetasModal({ isOpen, onClose }: MetasModalProps) {
  const [vendedor, setVendedor] = useState("");
  const [metaPDVs, setMetaPDVs] = useState("");
  const [metaConversoes, setMetaConversoes] = useState("");
  const [periodo, setPeriodo] = useState("semanal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui seria implementada a lógica para salvar as metas no banco de dados
    toast.success(`Metas cadastradas para ${vendedor}`);
    onClose();
  };

  return (
    <Modal
      title="Cadastrar Metas"
      description="Defina metas para os membros da sua equipe"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="border-heineken/30 text-tactical-silver">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-heineken hover:bg-heineken/80">
            Salvar
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="vendedor" className="text-tactical-silver">Vendedor</Label>
          <Select value={vendedor} onValueChange={setVendedor}>
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
            <Label htmlFor="metaPDVs" className="text-tactical-silver">Meta de PDVs</Label>
            <Input
              id="metaPDVs"
              type="number"
              placeholder="Ex: 50"
              value={metaPDVs}
              onChange={(e) => setMetaPDVs(e.target.value)}
              className="bg-tactical-black border-heineken/30"
            />
          </div>
          
          <div>
            <Label htmlFor="metaConversoes" className="text-tactical-silver">Meta de Conversões</Label>
            <Input
              id="metaConversoes"
              type="number"
              placeholder="Ex: 30"
              value={metaConversoes}
              onChange={(e) => setMetaConversoes(e.target.value)}
              className="bg-tactical-black border-heineken/30"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="periodo" className="text-tactical-silver">Período</Label>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="quinzenal">Quinzenal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </Modal>
  );
}
