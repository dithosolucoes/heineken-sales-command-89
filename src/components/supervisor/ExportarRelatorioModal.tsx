
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Download, FileText } from "lucide-react";

interface ExportarRelatorioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportarRelatorioModal({ isOpen, onClose }: ExportarRelatorioModalProps) {
  const [formato, setFormato] = useState("excel");
  const [periodo, setPeriodo] = useState("mes");
  const [filtroVendedor, setFiltroVendedor] = useState("todos");
  
  const [incluirGraficos, setIncluirGraficos] = useState(true);
  const [incluirMetas, setIncluirMetas] = useState(true);
  const [incluirDetalhes, setIncluirDetalhes] = useState(false);
  
  const handleExportar = () => {
    // Aqui seria implementada a lógica para exportar os dados
    toast.success("Relatório gerado com sucesso! O download começará em instantes.");
    
    // Simular um pequeno atraso antes de fechar o modal
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <Modal
      title="Exportar Relatório"
      description="Configure as opções do relatório para exportação"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3 w-full">
          <Button variant="outline" onClick={onClose} className="border-heineken/30 text-tactical-silver">
            Cancelar
          </Button>
          <Button 
            onClick={handleExportar} 
            className="bg-heineken hover:bg-heineken/80"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <Label className="text-tactical-silver">Formato</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button 
              variant={formato === "excel" ? "default" : "outline"} 
              className={formato === "excel" ? "bg-heineken hover:bg-heineken/80" : "border-heineken/30 hover:bg-heineken/20"}
              onClick={() => setFormato("excel")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button 
              variant={formato === "pdf" ? "default" : "outline"} 
              className={formato === "pdf" ? "bg-heineken hover:bg-heineken/80" : "border-heineken/30 hover:bg-heineken/20"}
              onClick={() => setFormato("pdf")}
            >
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button 
              variant={formato === "csv" ? "default" : "outline"} 
              className={formato === "csv" ? "bg-heineken hover:bg-heineken/80" : "border-heineken/30 hover:bg-heineken/20"}
              onClick={() => setFormato("csv")}
            >
              <FileText className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-tactical-silver">Período</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Última semana</SelectItem>
                <SelectItem value="mes">Último mês</SelectItem>
                <SelectItem value="trimestre">Último trimestre</SelectItem>
                <SelectItem value="personalizado">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-tactical-silver">Vendedor</Label>
            <Select value={filtroVendedor} onValueChange={setFiltroVendedor}>
              <SelectTrigger className="bg-tactical-black border-heineken/30 w-full">
                <SelectValue placeholder="Selecione o vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os vendedores</SelectItem>
                <SelectItem value="Carlos Silva">Carlos Silva</SelectItem>
                <SelectItem value="Ana Duarte">Ana Duarte</SelectItem>
                <SelectItem value="Bruno Santos">Bruno Santos</SelectItem>
                <SelectItem value="Mariana Costa">Mariana Costa</SelectItem>
                <SelectItem value="Pedro Lima">Pedro Lima</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {periodo === "personalizado" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataInicio" className="text-tactical-silver">Data inicial</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-heineken" />
                <Input
                  id="dataInicio"
                  type="date"
                  className="bg-tactical-black border-heineken/30 pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="dataFim" className="text-tactical-silver">Data final</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-heineken" />
                <Input
                  id="dataFim"
                  type="date"
                  className="bg-tactical-black border-heineken/30 pl-10"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Label className="text-tactical-silver">Opções do relatório</Label>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="incluirGraficos" 
              checked={incluirGraficos} 
              onCheckedChange={() => setIncluirGraficos(!incluirGraficos)} 
            />
            <label 
              htmlFor="incluirGraficos" 
              className="text-sm font-medium leading-none cursor-pointer text-tactical-silver"
            >
              Incluir gráficos de desempenho
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="incluirMetas" 
              checked={incluirMetas} 
              onCheckedChange={() => setIncluirMetas(!incluirMetas)} 
            />
            <label 
              htmlFor="incluirMetas" 
              className="text-sm font-medium leading-none cursor-pointer text-tactical-silver"
            >
              Comparação com metas
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="incluirDetalhes" 
              checked={incluirDetalhes} 
              onCheckedChange={() => setIncluirDetalhes(!incluirDetalhes)} 
            />
            <label 
              htmlFor="incluirDetalhes" 
              className="text-sm font-medium leading-none cursor-pointer text-tactical-silver"
            >
              Incluir detalhes de todas as conversões
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}
