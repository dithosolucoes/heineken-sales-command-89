
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MissaoForm } from "./forms/MissaoForm";
import { Missao } from "@/types/missao";

interface MissaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  missao?: Missao;
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
      <MissaoForm
        isViewOnly={isViewOnly}
        isEditMode={isEditMode}
        initialData={{
          titulo,
          vendedor,
          prioridade,
          prazo,
          descricao,
          progresso,
          status
        }}
        onChange={{
          setTitulo,
          setVendedor,
          setPrioridade,
          setPrazo,
          setDescricao,
          setProgresso,
          setStatus
        }}
      />
    </Modal>
  );
}
