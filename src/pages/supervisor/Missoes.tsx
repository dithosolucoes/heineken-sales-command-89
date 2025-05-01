
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Filter,
  Calendar
} from "lucide-react";

// Tipos de missão
type PrioridadeType = "crítica" | "relevante" | "padrão";
type StatusType = "ativa" | "concluída" | "atrasada";

// Interface para as missões
interface Missao {
  id: number;
  titulo: string;
  vendedor: string;
  prioridade: PrioridadeType;
  progresso: number;
  prazo: string;
  status: StatusType;
  descricao: string;
}

// Dados simulados para missões
const missoesData: Missao[] = [
  {
    id: 1,
    titulo: "Aumentar presença de marca no PDV #342",
    vendedor: "Carlos Silva",
    prioridade: "crítica",
    progresso: 25,
    prazo: "2023-05-10",
    status: "ativa",
    descricao: "Negociar espaço de geladeira e instalar material de POP no bar Avenida."
  },
  {
    id: 2,
    titulo: "Recuperar cliente PDV #185",
    vendedor: "Ana Duarte",
    prioridade: "relevante",
    progresso: 75,
    prazo: "2023-05-08",
    status: "ativa",
    descricao: "Oferecer condições especiais para o restaurante Silva que diminuiu pedidos."
  },
  {
    id: 3,
    titulo: "Introduzir novo produto no PDV #421",
    vendedor: "Bruno Santos",
    prioridade: "padrão",
    progresso: 100,
    prazo: "2023-05-01",
    status: "concluída",
    descricao: "Apresentar a nova Heineken 0.0 com material promocional."
  },
  {
    id: 4,
    titulo: "Resolver pendência de pagamento PDV #098",
    vendedor: "Mariana Costa",
    prioridade: "crítica",
    progresso: 0,
    prazo: "2023-04-28",
    status: "atrasada",
    descricao: "Negociar parcelamento da dívida com o proprietário do Bar Central."
  },
  {
    id: 5,
    titulo: "Fechamento de contrato PDV #256",
    vendedor: "Pedro Lima",
    prioridade: "relevante",
    progresso: 50,
    prazo: "2023-05-12",
    status: "ativa",
    descricao: "Finalizar contrato de exclusividade com o restaurante Sabor da Serra."
  }
];

const SupervisorMissoes = () => {
  const [filtroStatus, setFiltroStatus] = useState<StatusType | "todas">("todas");
  const [filtroVendedor, setFiltroVendedor] = useState<string>("todos");
  const [missoesExibidas, setMissoesExibidas] = useState<Missao[]>(missoesData);

  useEffect(() => {
    document.title = "Missões | Supervisor Heineken SP SUL";
  }, []);

  useEffect(() => {
    let missoesFiltradas = missoesData;
    
    if (filtroStatus !== "todas") {
      missoesFiltradas = missoesFiltradas.filter(
        missao => missao.status === filtroStatus
      );
    }
    
    if (filtroVendedor !== "todos") {
      missoesFiltradas = missoesFiltradas.filter(
        missao => missao.vendedor === filtroVendedor
      );
    }
    
    setMissoesExibidas(missoesFiltradas);
  }, [filtroStatus, filtroVendedor]);

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

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Missões">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 flex-grow">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Status</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroStatus(e.target.value as StatusType | "todas")}
                value={filtroStatus}
              >
                <option value="todas">Todas</option>
                <option value="ativa">Ativas</option>
                <option value="concluída">Concluídas</option>
                <option value="atrasada">Atrasadas</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Vendedor</label>
              <select 
                className="w-full bg-tactical-black border border-heineken/30 rounded p-2 text-white"
                onChange={(e) => setFiltroVendedor(e.target.value)}
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
          </CardContent>
        </Card>

        <Card className="bg-tactical-darkgray/80 border-heineken/30 sm:w-1/3">
          <CardContent className="flex items-center justify-center p-6">
            <Button className="w-full bg-heineken hover:bg-heineken/80 py-6">
              <Plus className="mr-2 h-5 w-5" /> Criar Nova Missão
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missoesExibidas.map(missao => (
          <Card key={missao.id} className="bg-tactical-darkgray/80 border-heineken/30">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge 
                  className={`${getStatusClasses(missao.status)} border-0`}
                >
                  {missao.status === "ativa" && <Clock className="mr-1 h-3 w-3" />}
                  {missao.status === "concluída" && <CheckCircle className="mr-1 h-3 w-3" />}
                  {missao.status === "atrasada" && <AlertCircle className="mr-1 h-3 w-3" />}
                  {missao.status.charAt(0).toUpperCase() + missao.status.slice(1)}
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
            
            <CardContent className="py-2">
              <p className="text-sm text-tactical-silver mb-3">{missao.descricao}</p>
              
              <div className="w-full bg-tactical-black h-2 rounded-full mb-1">
                <div 
                  className="bg-heineken h-2 rounded-full" 
                  style={{ width: `${missao.progresso}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-tactical-silver">Progresso: {missao.progresso}%</span>
                <span className="flex items-center text-tactical-silver">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(missao.prazo).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 flex justify-between">
              <Button variant="outline" size="sm" className="border-heineken/30 text-heineken-neon hover:bg-heineken/20">
                Detalhes
              </Button>
              {missao.status !== "concluída" && (
                <Button size="sm" className="bg-heineken hover:bg-heineken/80">
                  {missao.status === "atrasada" ? "Reagendar" : "Atualizar"}
                </Button>
              )}
            </CardFooter>
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
                  setFiltroVendedor("todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SupervisorMissoes;
