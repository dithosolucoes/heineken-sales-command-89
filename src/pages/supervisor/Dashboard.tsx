
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/ui/stats-card";
import { 
  Users, 
  CheckSquare, 
  BarChart3, 
  TrendingUp 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
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
import { MetasModal } from "@/components/supervisor/MetasModal";
import Map from "@/components/Map";

// Dados simulados para o supervisor
const vendedoresData = [
  { id: 1, nome: "Carlos Silva", metas: 50, visitas: 42, conversoes: 28, pontuacao: 84 },
  { id: 2, nome: "Ana Duarte", metas: 45, visitas: 44, conversoes: 35, pontuacao: 95 },
  { id: 3, nome: "Bruno Santos", metas: 50, visitas: 38, conversoes: 22, pontuacao: 76 },
  { id: 4, nome: "Mariana Costa", metas: 55, visitas: 51, conversoes: 33, pontuacao: 88 },
  { id: 5, nome: "Pedro Lima", metas: 60, visitas: 47, conversoes: 29, pontuacao: 80 }
];

const SupervisorDashboard = () => {
  const [metasModalOpen, setMetasModalOpen] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "Dashboard Supervisor | Heineken SP SUL";
  }, []);

  // Function to handle vendor selection for map filtering
  const handleSelectVendedor = (vendedorNome: string) => {
    setSelectedVendedor(selectedVendedor === vendedorNome ? null : vendedorNome);
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Dashboard do Supervisor">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-tactical-fade">
        <StatsCard 
          title="Total de Visitas" 
          value={222}
          icon={<Users />}
          trend={{ value: 12, label: "vs semana passada", positive: true }}
        />
        <StatsCard 
          title="Conversões" 
          value={147}
          icon={<CheckSquare />}
          trend={{ value: 8, label: "vs semana passada", positive: true }}
        />
        <StatsCard 
          title="Taxa de Sucesso" 
          value="66%"
          icon={<TrendingUp />}
          trend={{ value: 2, label: "vs semana passada", positive: true }}
        />
        <StatsCard 
          title="Média de PDVs" 
          value={44}
          icon={<BarChart3 />}
          trend={{ value: 3, label: "vs semana passada", positive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2 bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Desempenho da Equipe</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-heineken text-heineken-neon hover:bg-heineken/20"
                onClick={() => setMetasModalOpen(true)}
              >
                Cadastrar Metas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Metas</TableHead>
                  <TableHead>Visitas</TableHead>
                  <TableHead>Conversões</TableHead>
                  <TableHead>Pontuação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendedoresData.map((vendedor) => (
                  <TableRow 
                    key={vendedor.id}
                    className={selectedVendedor === vendedor.nome ? "bg-heineken/10" : ""}
                    onClick={() => handleSelectVendedor(vendedor.nome)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell className="font-medium">
                      {vendedor.nome}
                      {selectedVendedor === vendedor.nome && (
                        <span className="ml-2 text-xs text-heineken-neon">(Selecionado)</span>
                      )}
                    </TableCell>
                    <TableCell>{vendedor.metas}</TableCell>
                    <TableCell>{vendedor.visitas}</TableCell>
                    <TableCell>{vendedor.conversoes}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={
                          vendedor.pontuacao >= 90 ? "text-heineken-neon" :
                          vendedor.pontuacao >= 80 ? "text-tactical-gold" :
                          vendedor.pontuacao >= 70 ? "text-tactical-silver" :
                          "text-tactical-bronze"
                        }>
                          {vendedor.pontuacao}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Ranking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vendedoresData
              .sort((a, b) => b.pontuacao - a.pontuacao)
              .slice(0, 3)
              .map((vendedor, index) => (
                <div key={vendedor.id} className="flex items-center p-3 rounded-md border border-heineken/20 bg-tactical-darkgray">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 
                    ${index === 0 ? "bg-tactical-gold text-black" : 
                     index === 1 ? "bg-tactical-silver text-black" : 
                     "bg-tactical-bronze text-black"}`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{vendedor.nome}</p>
                    <p className="text-xs text-tactical-silver">{vendedor.conversoes} conversões</p>
                  </div>
                  <div className="text-heineken-neon font-bold">{vendedor.pontuacao}</div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Mapa de PDVs por Vendedor
            {selectedVendedor && (
              <span className="ml-2 text-sm font-normal text-heineken-neon">
                - Visualizando: {selectedVendedor}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] tactical-panel relative overflow-hidden rounded">
            {selectedVendedor ? (
              <Map 
                className="pointer-events-auto" 
                vendedorFilter={selectedVendedor} 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-tactical-black/70">
                <p className="text-heineken-neon">Selecione um vendedor na tabela acima para visualizar seus PDVs no mapa</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Modais */}
      <MetasModal isOpen={metasModalOpen} onClose={() => setMetasModalOpen(false)} />
    </DashboardLayout>
  );
};

export default SupervisorDashboard;
