
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
  BarChart3, 
  Download,
  FileText,
  Calendar,
  User,
  Filter
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Tipo para conversões
interface Conversao {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: string;
  acao: string;
  vendedor: string;
  origem: "manual" | "planilha";
}

// Dados simulados para conversões
const conversoesMockData: Conversao[] = Array.from({ length: 50 }).map((_, index) => {
  const vendedores = ["Carlos Silva", "Ana Duarte", "Bruno Santos", "Mariana Costa", "Pedro Lima"];
  const acoes = ["Venda", "Reativação", "Expansão", "Novo PDV", "Aumento de Mix"];
  const origens = ["manual", "planilha"] as const;
  
  return {
    id: `CV-${1000 + index}`,
    clienteId: `PDV-${2000 + Math.floor(Math.random() * 1000)}`,
    clienteNome: `Cliente ${Math.floor(Math.random() * 100)}`,
    data: new Date(2023, 3, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
    acao: acoes[Math.floor(Math.random() * acoes.length)],
    vendedor: vendedores[Math.floor(Math.random() * vendedores.length)],
    origem: origens[Math.floor(Math.random() * origens.length)]
  };
});

const SupervisorRelatorios = () => {
  const [filtroVendedor, setFiltroVendedor] = useState<string>("todos");
  const [filtroAcao, setFiltroAcao] = useState<string>("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("mes");
  const [conversoesExibidas, setConversoesExibidas] = useState<Conversao[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  
  useEffect(() => {
    document.title = "Relatórios | Supervisor Heineken SP SUL";
    
    // Filtragem e paginação
    let conversoesTemp = [...conversoesMockData];
    
    // Aplicar filtro de vendedor
    if (filtroVendedor !== "todos") {
      conversoesTemp = conversoesTemp.filter(c => c.vendedor === filtroVendedor);
    }
    
    // Aplicar filtro de ação
    if (filtroAcao !== "todas") {
      conversoesTemp = conversoesTemp.filter(c => c.acao === filtroAcao);
    }
    
    // Aplicar filtro de período
    const hoje = new Date();
    let dataLimite = new Date();
    
    switch (filtroPeriodo) {
      case "semana":
        dataLimite.setDate(hoje.getDate() - 7);
        break;
      case "mes":
        dataLimite.setMonth(hoje.getMonth() - 1);
        break;
      case "trimestre":
        dataLimite.setMonth(hoje.getMonth() - 3);
        break;
      default:
        break;
    }
    
    if (filtroPeriodo !== "todos") {
      conversoesTemp = conversoesTemp.filter(c => new Date(c.data) >= dataLimite);
    }
    
    // Calcular página atual
    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const fimIndex = inicioIndex + itensPorPagina;
    
    setConversoesExibidas(conversoesTemp.slice(inicioIndex, fimIndex));
  }, [filtroVendedor, filtroAcao, filtroPeriodo, paginaAtual]);

  const totalPaginas = Math.ceil(conversoesMockData.length / itensPorPagina);

  return (
    <DashboardLayout userType="supervisor" pageTitle="Relatórios de Desempenho">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 flex-grow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => {
                  setFiltroVendedor(e.target.value);
                  setPaginaAtual(1);
                }}
                value={filtroVendedor}
              >
                <option value="todos">Todos</option>
                <option value="Carlos Silva">Carlos Silva</option>
                <option value="Ana Duarte">Ana Duarte</option>
                <option value="Bruno Santos">Bruno Santos</option>
                <option value="Mariana Costa">Mariana Costa</option>
                <option value="Pedro Lima">Pedro Lima</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Ação</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => {
                  setFiltroAcao(e.target.value);
                  setPaginaAtual(1);
                }}
                value={filtroAcao}
              >
                <option value="todas">Todas</option>
                <option value="Venda">Venda</option>
                <option value="Reativação">Reativação</option>
                <option value="Expansão">Expansão</option>
                <option value="Novo PDV">Novo PDV</option>
                <option value="Aumento de Mix">Aumento de Mix</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Período</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => {
                  setFiltroPeriodo(e.target.value);
                  setPaginaAtual(1);
                }}
                value={filtroPeriodo}
              >
                <option value="todos">Todo período</option>
                <option value="semana">Última semana</option>
                <option value="mes">Último mês</option>
                <option value="trimestre">Último trimestre</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-tactical-darkgray/80 border-heineken/30 sm:w-1/4">
          <CardContent className="flex items-center justify-center p-6">
            <Button className="w-full bg-heineken hover:bg-heineken/80">
              <Download className="mr-2 h-5 w-5" /> Exportar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Evolução de Desempenho</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-heineken-neon mx-auto mb-3" />
            <p className="text-tactical-silver">Gráfico de evolução de conversões ao longo do período</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Tabela de Conversões</CardTitle>
              <CardDescription>
                Total de registros: {conversoesExibidas.length} de {conversoesMockData.length}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-heineken/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-tactical-black">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Origem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversoesExibidas.map(conversao => (
                  <TableRow key={conversao.id}>
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
                ))}
                
                {conversoesExibidas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                      <p className="text-tactical-silver">Nenhum registro encontrado com os filtros atuais.</p>
                      <Button 
                        variant="link" 
                        className="text-heineken mt-2"
                        onClick={() => {
                          setFiltroVendedor("todos");
                          setFiltroAcao("todas");
                          setFiltroPeriodo("mes");
                          setPaginaAtual(1);
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {conversoesExibidas.length > 0 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (paginaAtual > 1) setPaginaAtual(p => p - 1);
                    }}
                    className={paginaAtual === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPaginas) }).map((_, i) => {
                  // Cálculo para mostrar as páginas ao redor da página atual
                  let pageNum = i + 1;
                  if (paginaAtual > 3 && totalPaginas > 5) {
                    pageNum = paginaAtual - 2 + i;
                    if (pageNum > totalPaginas) pageNum = totalPaginas - (4 - i);
                    if (pageNum < 1) pageNum = i + 1;
                  }
                  
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setPaginaAtual(pageNum);
                        }}
                        isActive={pageNum === paginaAtual}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (paginaAtual < totalPaginas) setPaginaAtual(p => p + 1);
                    }}
                    className={paginaAtual >= totalPaginas ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default SupervisorRelatorios;
