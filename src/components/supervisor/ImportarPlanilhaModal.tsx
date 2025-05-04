
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ImportarPlanilhaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportarPlanilhaModal({ isOpen, onClose }: ImportarPlanilhaModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Por favor, selecione um arquivo para importar");
      return;
    }
    
    // Aqui seria implementada a lógica para processar o arquivo
    toast.success(`Arquivo "${file.name}" importado com sucesso!`);
    onClose();
  };

  return (
    <Modal
      title="Importar Planilha de Rotas"
      description="Importe rotas para seus vendedores através de planilhas"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="border-heineken/30 text-tactical-silver">
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-heineken hover:bg-heineken/80"
            disabled={!file}
          >
            Importar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? "border-heineken bg-heineken/10" : "border-heineken/30"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-heineken-neon mx-auto mb-3" />
          <p className="text-sm text-tactical-silver mb-2">
            {file 
              ? `Arquivo selecionado: ${file.name}` 
              : "Arraste um arquivo ou clique para selecionar"
            }
          </p>
          <p className="text-xs text-tactical-silver">Formatos suportados: .xls, .xlsx, .csv</p>
          
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".xls,.xlsx,.csv"
            onChange={handleFileChange}
          />
          
          {!file && (
            <Button
              variant="outline"
              className="mt-4 border-heineken/30 text-heineken-neon"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Selecionar arquivo
            </Button>
          )}
        </div>
        
        {file && (
          <div className="bg-tactical-black/50 p-3 rounded border border-heineken/20">
            <Label className="text-tactical-silver mb-1 block">Arquivo selecionado</Label>
            <div className="flex items-center">
              <span className="text-heineken-neon">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-tactical-silver hover:text-white"
                onClick={() => setFile(null)}
              >
                Remover
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
