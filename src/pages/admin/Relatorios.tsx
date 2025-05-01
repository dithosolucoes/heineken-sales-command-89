
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
  BarChart3, 
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  FilePieChart,
  Map as MapIcon,
  PieChart
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Tipo para relatórios
interface RelatorioItem {
  id: string;
  tipo: "vendas" | "conversoes" | "visitas" | "pdvs";
  titulo: string;
  descricao: string;
  regiao: string;
  filial: string;
  periodo: string;
  dataCriacao: string;
}

// Dados simulados para relatórios
const relatoriosMockData: RelatorioItem[] = [
  {
    id: "REL-001",
    tipo: "vendas",
    titulo: "Vendas por PDV - Abril 2023",
    descricao: "Detalhamento de vendas por ponto de venda",
    regiao: "Sudeste",
    filial: "São Paulo - Centro",
    periodo: "Abril 2023",
    dataCriacao: "2023-05-01"
  },
  {
    id: "REL-002",
    tipo: "conversoes",
    titulo: "Taxa de Conversão por Vendedor",
    descricao: "Análise de conversões por performance individual",
    regiao: "Sudeste",
    filial: "São Paulo - Zona Sul",
    periodo: "1º Trimestre 2023",
    dataCriacao: "2023-04-02"
  },
  {
    id: "REL-003",
    tipo: "visitas",
    titulo: "Rotas e Eficiência de Visitas",
    descricao: "Análise de eficiência das rotas de visitas",
    regiao: "Sul",
    filial: "Curitiba",
    periodo: "Março 2023",
    dataCriacao: "2023-04-05"
  },
  {
    id: "REL-004",
    tipo: "pdvs",
    titulo: "Cadastro de PDVs por Região",
    descricao: "Mapeamento completo de pontos de venda",
    regiao: "Nacional",
    filial: "Todas",
    periodo: "Atual",
    dataCriacao: "2023-04-10"
  },
  {
    id: "REL-005",
    tipo: "vendas",
    titulo: "Vendas por Categoria de Produto",
    descricao: "Análise de vendas por tipo de produto",
    regiao: "Sudeste",
    filial: "Rio de Janeiro - Centro",
    periodo: "1º Trimestre 2023",
    dataCriacao: "2023-04-12"
  },
  {
    id: "REL-006",
    tipo: "conversoes",
    titulo: "Histórico de Conversões - 6 meses",
    descricao: "Análise histórica de conversões",
    regiao: "Sudeste",
    filial: "Belo Horizonte",
    periodo: "Out 2022 - Mar 2023",
    dataCriacao: "2023-04-15"
  },
  {
    id: "REL-007",
    tipo: "visitas",
    titulo: "KPIs de Visitas por Supervisor",
    descricao: "Métricas de desempenho de visitas por equipe",
    regiao: "Sul",
    filial: "Porto Alegre",
    periodo: "Março 2023",
    dataCriacao: "2023-04-18"
  },
  {
    id: "REL-008",
    tipo: "pdvs",
    titulo: "Segmentação de PDVs por Potencial",
    descricao: "Classificação de PDVs por volume potencial",
    regiao: "Sudeste",
    filial: "Campinas",
    periodo: "Atual",
    dataCriacao: "2023-04-20"
  },
  {
    id: "REL-009",
    tipo: "vendas",
    titulo: "Comparativo de Vendas YoY",
    descricao: "Comparação de vendas ano a ano",
    regiao: "Nacional",
    filial: "Todas",
    periodo: "2022 vs 2023",
    dataCriacao: "2023-04-22"
  },
  {
    id: "REL-010",
    tipo: "conversoes",
    titulo: "Funil de Conversão por Filial",
    descricao: "Análise de fluxo de conversões por etapa",
    regiao: "Nacional",
    filial: "Todas",
    periodo: "1º Trimestre 2023",
    dataCriacao: "2023-04-25"
  }
];

// Função para obter o ícone do tipo de relatório
const obterIconeRelatorio = (tipo: string) => {
  switch (tipo) {
    case "vendas":
      return <BarChart3 className="h-4 w-4" />;
    case "conversoes":
      return <PieChart className="h-4 w-4" />;
    case "visitas":
      return <MapIcon className="h-4 w-4" />;
    case "pdvs":
      return <FileSpreadsheet className="h-4 w-4" />;
    default:
      return <FilePieChart className="h-4 w-4" />;
  }
};

const AdminRelatorios = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [filtroRegiao, setFiltroRegiao] = useState<string>("todas");
  const [relatoriosFiltrados, setRelatoriosFiltrados] = useState<RelatorioItem[]>(relatoriosMockData);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tipoGrafico, setTipoGrafico] = useState<string>("vendas");
  
  const itensPorPagina = 5;
  
  useEffect(() => {
    document.title = "Relatórios Administrativos | Heineken SP SUL";
    
    // Aplicar filtros
    let resultado = [...relatoriosMockData];
    
    if (filtroTipo !== "todos") {
      resultado = resultado.filter(r => r.tipo === filtroTipo);
    }
    
    if (filtroRegiao !== "todas") {
      resultado = resultado.filter(r => r.regiao === filtroRegiao);
    }
    
    setRelatoriosFiltrados(resultado);
    setPaginaAtual(1);
  }, [filtroTipo, filtroRegiao]);

  const relatoriosPaginados = relatoriosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );
  
  const totalPaginas = Math.ceil(relatoriosFiltrados.length / itensPorPagina);

  return (
    <DashboardLayout userType="admin" pageTitle="Relatórios Analíticos">
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
            <CardDescription>Refine a análise de dados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Tipo de Relatório</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroTipo(e.target.value)}
                value={filtroTipo}
              >
                <option value="todos">Todos os tipos</option>
                <option value="vendas">Vendas</option>
                <option value="conversoes">Conversões</option>
                <option value="visitas">Visitas</option>
                <option value="pdvs">PDVs</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Região</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroRegiao(e.target.value)}
                value={filtroRegiao}
              >
                <option value="todas">Todas as regiões</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Norte">Norte</option>
                <option value="Centro-Oeste">Centro-Oeste</option>
                <option value="Nacional">Nacional</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Filial</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                defaultValue="todas"
              >
                <option value="todas">Todas as filiais</option>
                <option value="São Paulo - Centro">São Paulo - Centro</option>
                <option value="São Paulo - Zona Sul">São Paulo - Zona Sul</option>
                <option value="Rio de Janeiro - Centro">Rio de Janeiro - Centro</option>
                <option value="Belo Horizonte">Belo Horizonte</option>
                <option value="Campinas">Campinas</option>
                <option value="Curitiba">Curitiba</option>
                <option value="Porto Alegre">Porto Alegre</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Período</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                defaultValue="ultimo-trimestre"
              >
                <option value="ultimo-mes">Último mês</option>
                <option value="ultimo-trimestre">Último trimestre</option>
                <option value="ultimo-semestre">Último semestre</option>
                <option value="ultimo-ano">Último ano</option>
              </select>
            </div>
            
            <Button 
              className="w-full mt-4 bg-heineken hover:bg-heineken/80"
              onClick={() => {
                setFiltroTipo("todos");
                setFiltroRegiao("todas");
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <CardTitle className="text-lg">Visualização Gráfica</CardTitle>
                <CardDescription>Análise visual de métricas</CardDescription>
              </div>
              
              <select 
                className="w-full sm:w-48 mt-2 sm:mt-0 bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setTipoGrafico(e.target.value)}
                value={tipoGrafico}
              >
                <option value="vendas">Vendas</option>
                <option value="conversoes">Conversões</option>
                <option value="visitas">Visitas</option>
                <option value="pdvs">Distribuição de PDVs</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                {tipoGrafico === "pdvs" ? (
                  <MapIcon className="h-16 w-16 text-heineken-neon mx-auto mb-3" />
                ) : (
                  <BarChart3 className="h-16 w-16 text-heineken-neon mx-auto mb-3" />
                )}
                <p className="text-tactical-silver">Visualização gráfica de {tipoGrafico}</p>
                <p className="text-xs text-tactical-silver mt-2">Selecione um tipo de gráfico acima</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-lg">Biblioteca de Relatórios</CardTitle>
              <CardDescription>
                {relatoriosFiltrados.length} relatórios disponíveis
                {filtroTipo !== "todos" && ` do tipo ${filtroTipo}`}
                {filtroRegiao !== "todas" && ` da região ${filtroRegiao}`}
              </CardDescription>
            </div>
            <Button 
              className="mt-2 sm:mt-0 bg-heineken hover:bg-heineken/80"
            >
              <Download className="mr-2 h-4 w-4" /> Exportar Selecionados
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-heineken/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-tactical-black">
                <TableRow>
                  <TableHead className="w-[50px] text-center">
                    <input type="checkbox" className="rounded border-heineken/30" />
                  </TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Região/Filial</TableHead>
                  <TableHead className="hidden md:table-cell">Período</TableHead>
                  <TableHead className="hidden sm:table-cell">Data</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relatoriosPaginados.map(relatorio => (
                  <TableRow key={relatorio.id}>
                    <TableCell className="text-center">
                      <input type="checkbox" className="rounded border-heineken/30" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="flex items-center justify-center bg-tactical-black h-8 w-8 rounded-full mr-3 text-heineken">
                          {obterIconeRelatorio(relatorio.tipo)}
                        </span>
                        <div>
                          <div className="font-medium">{relatorio.titulo}</div>
                          <div className="text-xs text-tactical-silver hidden sm:block">
                            {relatorio.descricao}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span>{relatorio.regiao}</span>
                        <span className="text-xs text-tactical-silver">{relatorio.filial}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{relatorio.periodo}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-tactical-silver" />
                        {new Date(relatorio.dataCriacao).toLocaleDateString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 border-heineken/30"
                        >
                          <Download className="h-4 w-4 text-heineken-neon" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 border-heineken/30"
                        >
                          <FileSpreadsheet className="h-4 w-4 text-heineken-neon" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {relatoriosFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                      <p className="text-tactical-silver">Nenhum relatório encontrado com os filtros atuais.</p>
                      <Button 
                        variant="link" 
                        className="text-heineken mt-2"
                        onClick={() => {
                          setFiltroTipo("todos");
                          setFiltroRegiao("todas");
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
          
          {totalPaginas > 1 && (
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

export default AdminRelatorios;
