import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Upload, 
  Map as MapIcon,
  Calendar, 
  Info, 
  ListFilter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ImportarPlanilhaModal } from "@/components/supervisor/ImportarPlanilhaModal";

// Dados simulados para rotas
const rotasData = [
  { 
    id: 1, 
    vendedor: "Carlos Silva", 
    diasSemana: ["Segunda", "Quarta"], 
    qtdPDVs: 24, 
    bairros: ["Pinheiros", "Itaim"], 
    ultimaAtualizacao: "2023-04-28" 
  },
  { 
    id: 2, 
    vendedor: "Ana Duarte", 
    diasSemana: ["Terça", "Quinta"], 
    qtdPDVs: 30, 
    bairros: ["Vila Madalena", "Lapa"], 
    ultimaAtualizacao: "2023-04-29" 
  },
  { 
    id: 3, 
    vendedor: "Bruno Santos", 
    diasSemana: ["Quarta", "Sexta"], 
    qtdPDVs: 22, 
    bairros: ["Moema", "Campo Belo"], 
    ultimaAtualizacao: "2023-04-25" 
  },
  { 
    id: 4, 
    vendedor: "Mariana Costa", 
    diasSemana: ["Segunda", "Sexta"], 
    qtdPDVs: 28, 
    bairros: ["Santana", "Tucuruvi"], 
    ultimaAtualizacao: "2023-04-27" 
  },
  { 
    id: 5, 
    vendedor: "Pedro Lima", 
    diasSemana: ["Terça", "Quinta"], 
    qtdPDVs: 26, 
    bairros: ["Tatuapé", "Penha"], 
    ultimaAtualizacao: "2023-04-26" 
  }
];

const SupervisorRotas = () => {
  const [selectedVendedor, setSelectedVendedor] = useState<string | null>(null);
  const [importarModalOpen, setImportarModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Rotas | Supervisor Heineken SP SUL";
  }, []);

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Rotas">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="text-lg">Importar Rotas</CardTitle>
            <CardDescription>Importe planilhas com rotas por vendedor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-heineken/30 rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 text-heineken-neon mx-auto mb-3" />
              <p className="text-sm text-tactical-silver mb-2">Arraste um arquivo ou clique para selecionar</p>
              <p className="text-xs text-tactical-silver">Formatos suportados: .xls, .xlsx, .csv</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-heineken hover:bg-heineken/80"
              onClick={() => setImportarModalOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" /> Importar Planilha
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-tactical-darkgray/80 border-heineken/30 w-full md:w-2/3">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">Filtrar Rotas</CardTitle>
                <CardDescription>Visualize as rotas por vendedor e dia</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-heineken text-heineken-neon hover:bg-heineken/20">
                <ListFilter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
                <select 
                  className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                  onChange={(e) => setSelectedVendedor(e.target.value)}
                >
                  <option value="">Todos os vendedores</option>
                  {rotasData.map(rota => (
                    <option key={rota.id} value={rota.vendedor}>
                      {rota.vendedor}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-tactical-silver mb-2 block">Dia da Semana</label>
                <select className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white">
                  <option value="">Todos os dias</option>
                  <option value="Segunda">Segunda-feira</option>
                  <option value="Terça">Terça-feira</option>
                  <option value="Quarta">Quarta-feira</option>
                  <option value="Quinta">Quinta-feira</option>
                  <option value="Sexta">Sexta-feira</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg">Rotas Cadastradas</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              {rotasData
                .filter(rota => !selectedVendedor || rota.vendedor === selectedVendedor)
                .map(rota => (
                  <Card key={rota.id} className="mb-4 bg-tactical-black border-heineken/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md text-heineken-neon">{rota.vendedor}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {rota.diasSemana.join(', ')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-tactical-silver">PDVs:</p>
                          <p className="font-medium">{rota.qtdPDVs}</p>
                        </div>
                        <div>
                          <p className="text-tactical-silver">Bairros:</p>
                          <p className="font-medium">{rota.bairros.join(', ')}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs text-tactical-silver">
                      <p className="flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        Atualizado em {new Date(rota.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader>
              <CardTitle className="text-lg">Mapa de Rotas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] tactical-panel relative overflow-hidden rounded">
                <div className="absolute inset-0 flex items-center justify-center bg-tactical-black/70">
                  <div className="text-center">
                    <MapIcon className="h-12 w-12 text-heineken-neon mx-auto mb-2" />
                    <p className="text-heineken-neon">Mapa com PDVs por vendedor</p>
                    <p className="text-sm text-tactical-silver mt-2">
                      {!selectedVendedor 
                        ? "Selecione um vendedor para visualizar suas rotas" 
                        : `Visualizando rotas de ${selectedVendedor}`
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm text-tactical-silver mb-2 block">Observações da Rota</label>
                <Input 
                  className="bg-tactical-black border-heineken/30 w-full" 
                  placeholder="Adicione comentários ou instruções para a rota..." 
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" className="bg-heineken hover:bg-heineken/80">
                    Salvar Observações
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modal para importação de planilha */}
      <ImportarPlanilhaModal 
        isOpen={importarModalOpen} 
        onClose={() => setImportarModalOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default SupervisorRotas;
