
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
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Building,
  User,
  BarChart3,
  Calendar
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

// Tipos de missão
type PrioridadeType = "crítica" | "relevante" | "padrão";
type StatusType = "ativa" | "concluída" | "atrasada";

// Interface para as missões administrativas
interface MissaoAdmin {
  id: number;
  titulo: string;
  filial: string;
  vendedor: string;
  supervisor: string;
  prioridade: PrioridadeType;
  progresso: number;
  prazo: string;
  dataCriacao: string;
  status: StatusType;
}

// Dados simulados para missões
const missoesMockData: MissaoAdmin[] = Array.from({ length: 50 }).map((_, index) => {
  const filiais = [
    "São Paulo - Centro", 
    "São Paulo - Zona Sul", 
    "Rio de Janeiro - Centro", 
    "Belo Horizonte", 
    "Campinas", 
    "Curitiba", 
    "Porto Alegre"
  ];
  
  const supervisores = [
    "Roberto Almeida",
    "Marina Silva",
    "Carlos Eduardo",
    "Amanda Rocha",
    "Leonardo Dias",
    "Juliana Porto",
    "Ricardo Moura"
  ];
  
  const vendedores = [
    "Carlos Silva",
    "Ana Duarte",
    "Bruno Santos",
    "Mariana Costa",
    "Pedro Lima",
    "Luciana Ferreira",
    "Felipe Mendes",
    "Júlia Alves",
    "Roberto Gomes",
    "Daniela Souza"
  ];
  
  const titulos = [
    "Aumentar presença de marca PDV #",
    "Recuperar cliente PDV #",
    "Introduzir novo produto PDV #",
    "Resolver pendência de pagamento PDV #",
    "Fechamento de contrato PDV #",
    "Negociar exclusividade PDV #",
    "Aumentar volume PDV #",
    "Promoção especial PDV #"
  ];
  
  const prioridades: PrioridadeType[] = ["crítica", "relevante", "padrão"];
  const status: StatusType[] = ["ativa", "concluída", "atrasada"];
  
  // Gerar datas aleatórias dentro de um intervalo
  const dataAleatoria = (inicio: Date, fim: Date) => {
    return new Date(inicio.getTime() + Math.random() * (fim.getTime() - inicio.getTime()));
  };
  
  const hoje = new Date();
  const tresMesesAtras = new Date();
  tresMesesAtras.setMonth(hoje.getMonth() - 3);
  
  const umMesFrente = new Date();
  umMesFrente.setMonth(hoje.getMonth() + 1);
  
  const dataCriacao = dataAleatoria(tresMesesAtras, hoje);
  const prazo = dataAleatoria(hoje, umMesFrente);
  
  // Determinar o status com base nas datas
  const statusDeterminado = (): StatusType => {
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    return randomStatus;
  };
  
  const statusFinal = statusDeterminado();
  
  // Determinar progresso com base no status
  const progressoDeterminado = (): number => {
    switch (statusFinal) {
      case "concluída":
        return 100;
      case "atrasada":
        return Math.floor(Math.random() * 40);
      default:
        return Math.floor(Math.random() * 90) + 10;
    }
  };
  
  const filialIndex = Math.floor(Math.random() * filiais.length);
  
  return {
    id: index + 1,
    titulo: `${titulos[Math.floor(Math.random() * titulos.length)]}${Math.floor(Math.random() * 1000)}`,
    filial: filiais[filialIndex],
    supervisor: supervisores[filialIndex],
    vendedor: vendedores[Math.floor(Math.random() * vendedores.length)],
    prioridade: prioridades[Math.floor(Math.random() * prioridades.length)],
    progresso: progressoDeterminado(),
    prazo: prazo.toISOString().split('T')[0],
    dataCriacao: dataCriacao.toISOString().split('T')[0],
    status: statusFinal
  };
});

const AdminMissoes = () => {
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");
  const [filtroFilial, setFiltroFilial] = useState<string>("todas");
  const [missoesFiltradas, setMissoesFiltradas] = useState<MissaoAdmin[]>(missoesMockData);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [visualizacao, setVisualizacao] = useState<"tabela" | "cards">("tabela");
  const [ordenacao, setOrdenacao] = useState<{ campo: keyof MissaoAdmin, direcao: 'asc' | 'desc' }>({ campo: 'prazo', direcao: 'asc' });
  
  const itensPorPagina = 10;
  
  useEffect(() => {
    document.title = "Gestão de Missões | Admin Heineken SP SUL";
    aplicarFiltros();
  }, [filtroStatus, filtroFilial]);

  const aplicarFiltros = () => {
    let resultado = [...missoesMockData];
    
    if (filtroStatus !== "todas") {
      resultado = resultado.filter(m => m.status === filtroStatus);
    }
    
    if (filtroFilial !== "todas") {
      resultado = resultado.filter(m => m.filial === filtroFilial);
    }
    
    // Aplicar ordenação
    resultado.sort((a, b) => {
      const valorA = a[ordenacao.campo];
      const valorB = b[ordenacao.campo];
      
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return ordenacao.direcao === 'asc'
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
      
      // Para valores numéricos ou datas
      return ordenacao.direcao === 'asc'
        ? (valorA < valorB ? -1 : valorA > valorB ? 1 : 0)
        : (valorB < valorA ? -1 : valorB > valorA ? 1 : 0);
    });
    
    setMissoesFiltradas(resultado);
    setPaginaAtual(1);
  };
  
  const ordenar = (campo: keyof MissaoAdmin) => {
    const direcao = ordenacao.campo === campo && ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    setOrdenacao({ campo, direcao });
    
    // Re-aplicar ordenação
    const resultado = [...missoesFiltradas];
    resultado.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];
      
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return direcao === 'asc'
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
      
      // Para valores numéricos ou datas
      return direcao === 'asc'
        ? (valorA < valorB ? -1 : valorA > valorB ? 1 : 0)
        : (valorB < valorA ? -1 : valorB > valorA ? 1 : 0);
    });
    
    setMissoesFiltradas(resultado);
  };

  const missoesExibidas = missoesFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );
  
  const totalPaginas = Math.ceil(missoesFiltradas.length / itensPorPagina);

  // Função para obter a classe de cor baseada na prioridade
  const getPrioridadeClasses = (prioridade: PrioridadeType) => {
    switch (prioridade) {
      case "crítica":
        return "text-[#ea384c] border-[#ea384c]";
      case "relevante":
        return "text-amber-400 border-amber-400";
      default:
        return "text-tactical-silver border-tactical-silver";
    }
  };

  // Função para obter a classe de cor baseada no status
  const getStatusClasses = (status: StatusType) => {
    switch (status) {
      case "concluída":
        return "bg-heineken/20 text-heineken-neon";
      case "atrasada":
        return "bg-[#ea384c]/20 text-[#ea384c]";
      default:
        return "bg-tactical-silver/20 text-tactical-silver";
    }
  };
  
  // Função para obter o ícone do status
  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case "concluída":
        return <CheckCircle2 className="h-4 w-4" />;
      case "atrasada":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout userType="admin" pageTitle="Gestão de Missões">
      <div className="mb-6 grid gap-4 md:grid-cols-5">
        {/* Filtros */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Status</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroStatus(e.target.value)}
                value={filtroStatus}
              >
                <option value="todas">Todos</option>
                <option value="ativa">Ativas</option>
                <option value="concluída">Concluídas</option>
                <option value="atrasada">Atrasadas</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-tactical-silver mb-2 block">Filial</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroFilial(e.target.value)}
                value={filtroFilial}
              >
                <option value="todas">Todas</option>
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
              <Button 
                className="w-full mt-6 bg-heineken hover:bg-heineken/80"
                onClick={() => {
                  setFiltroStatus("todas");
                  setFiltroFilial("todas");
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Estatísticas */}
        <Card className="bg-tactical-darkgray/80 border-heineken/30 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center py-2 border border-heineken/20 rounded-md">
                <div className="text-2xl font-bold text-heineken-neon">
                  {missoesMockData.filter(m => m.status === "ativa").length}
                </div>
                <div className="text-xs text-tactical-silver">Ativas</div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-2 border border-heineken/20 rounded-md">
                <div className="text-2xl font-bold text-heineken-neon">
                  {missoesMockData.filter(m => m.status === "concluída").length}
                </div>
                <div className="text-xs text-tactical-silver">Concluídas</div>
              </div>
              
              <div className="flex flex-col items-center justify-center py-2 border border-heineken/20 rounded-md">
                <div className="text-2xl font-bold text-[#ea384c]">
                  {missoesMockData.filter(m => m.status === "atrasada").length}
                </div>
                <div className="text-xs text-tactical-silver">Atrasadas</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-tactical-silver">Taxa de Conclusão</span>
                <span className="text-xs font-medium text-heineken-neon">
                  {Math.round((missoesMockData.filter(m => m.status === "concluída").length / missoesMockData.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-tactical-black h-2 rounded-full">
                <div 
                  className="bg-heineken h-2 rounded-full" 
                  style={{ width: `${(missoesMockData.filter(m => m.status === "concluída").length / missoesMockData.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico de Eficiência */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Eficiência de Missões por Filial</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-heineken-neon mx-auto mb-3" />
            <p className="text-tactical-silver">Análise comparativa de desempenho em missões por filial</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Controles de visualização */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex gap-2">
          <Button
            variant={visualizacao === "tabela" ? "default" : "outline"}
            size="sm"
            className={visualizacao === "tabela" ? "bg-heineken hover:bg-heineken/80" : "border-heineken/30 text-heineken-neon hover:bg-heineken/20"}
            onClick={() => setVisualizacao("tabela")}
          >
            Tabela
          </Button>
          <Button
            variant={visualizacao === "cards" ? "default" : "outline"}
            size="sm"
            className={visualizacao === "cards" ? "bg-heineken hover:bg-heineken/80" : "border-heineken/30 text-heineken-neon hover:bg-heineken/20"}
            onClick={() => setVisualizacao("cards")}
          >
            Cards
          </Button>
        </div>
        
        <div className="text-sm text-tactical-silver">
          Mostrando {missoesExibidas.length} de {missoesFiltradas.length} missões
          {filtroStatus !== "todas" && ` com status ${filtroStatus}`}
          {filtroFilial !== "todas" && ` da filial ${filtroFilial}`}
        </div>
      </div>
      
      {/* Visualização de Tabela */}
      {visualizacao === "tabela" && (
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardContent className="p-0">
            <div className="rounded-md overflow-hidden">
              <Table>
                <TableHeader className="bg-tactical-black">
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:text-heineken-neon"
                      onClick={() => ordenar('status')}
                    >
                      Status {ordenacao.campo === 'status' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:text-heineken-neon"
                      onClick={() => ordenar('titulo')}
                    >
                      Missão {ordenacao.campo === 'titulo' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="hidden md:table-cell cursor-pointer hover:text-heineken-neon"
                      onClick={() => ordenar('filial')}
                    >
                      Filial {ordenacao.campo === 'filial' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="hidden lg:table-cell cursor-pointer hover:text-heineken-neon"
                      onClick={() => ordenar('supervisor')}
                    >
                      Supervisor {ordenacao.campo === 'supervisor' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="hidden sm:table-cell cursor-pointer hover:text-heineken-neon"
                      onClick={() => ordenar('prazo')}
                    >
                      Prazo {ordenacao.campo === 'prazo' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Progresso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {missoesExibidas.map(missao => (
                    <TableRow key={missao.id} className="hover:bg-tactical-black/50">
                      <TableCell>
                        <Badge 
                          className={`${getStatusClasses(missao.status)} border-0 flex items-center gap-1`}
                        >
                          {getStatusIcon(missao.status)}
                          <span className="hidden sm:inline">{missao.status.charAt(0).toUpperCase() + missao.status.slice(1)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{missao.titulo}</div>
                          <div className="text-xs text-tactical-silver flex items-center mt-1">
                            <User className="h-3 w-3 mr-1" /> {missao.vendedor}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <Building className="h-3 w-3 mr-1 text-tactical-silver" />
                          {missao.filial}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{missao.supervisor}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-tactical-silver" />
                          {new Date(missao.prazo).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="w-full bg-tactical-black h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${missao.status === "concluída" ? "bg-heineken" : missao.status === "atrasada" ? "bg-[#ea384c]" : "bg-heineken"}`}
                            style={{ width: `${missao.progresso}%` }}
                          />
                        </div>
                        <div className="text-xs mt-1 text-right">
                          {missao.progresso}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {missoesExibidas.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                        <p className="text-tactical-silver">Nenhuma missão encontrada com os filtros atuais.</p>
                        <Button 
                          variant="link" 
                          className="text-heineken mt-2"
                          onClick={() => {
                            setFiltroStatus("todas");
                            setFiltroFilial("todas");
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
      )}
      
      {/* Visualização de Cards */}
      {visualizacao === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {missoesExibidas.map(missao => (
            <Card key={missao.id} className="bg-tactical-darkgray/80 border-heineken/30">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    className={`${getStatusClasses(missao.status)} border-0 flex items-center gap-1`}
                  >
                    {getStatusIcon(missao.status)}
                    <span className="inline">{missao.status.charAt(0).toUpperCase() + missao.status.slice(1)}</span>
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${getPrioridadeClasses(missao.prioridade)}`}
                  >
                    {missao.prioridade}
                  </Badge>
                </div>
                
                <CardTitle className="text-md text-heineken-neon">
                  {missao.titulo}
                </CardTitle>
                
                <CardDescription className="flex items-center mt-1">
                  <User className="h-3 w-3 mr-1" />
                  {missao.vendedor}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="py-2 space-y-3">
                <div className="flex justify-between text-xs text-tactical-silver">
                  <div className="flex items-center">
                    <Building className="h-3 w-3 mr-1" />
                    {missao.filial}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(missao.prazo).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <div className="w-full bg-tactical-black h-2 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${missao.status === "concluída" ? "bg-heineken" : missao.status === "atrasada" ? "bg-[#ea384c]" : "bg-heineken"}`}
                    style={{ width: `${missao.progresso}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-tactical-silver">Progresso: {missao.progresso}%</span>
                  <span className="text-tactical-silver">Supervisor: {missao.supervisor}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {missoesExibidas.length === 0 && (
            <div className="col-span-full flex items-center justify-center h-40 border border-dashed border-tactical-silver/30 rounded-lg">
              <div className="text-center">
                <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                <p className="text-tactical-silver">Nenhuma missão encontrada com os filtros atuais.</p>
                <Button 
                  variant="link" 
                  className="text-heineken mt-2"
                  onClick={() => {
                    setFiltroStatus("todas");
                    setFiltroFilial("todas");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          )}
          
          {missoesExibidas.length > 0 && totalPaginas > 1 && (
            <div className="col-span-full mt-4">
              <Pagination>
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
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminMissoes;
