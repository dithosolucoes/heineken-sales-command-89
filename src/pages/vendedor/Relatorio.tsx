
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Tipo para conversões do vendedor
interface Conversao {
  id: string;
  clienteId: string;
  clienteNome: string;
  data: Date;
  status: "pendente" | "confirmado" | "revertido";
}

// Dados simulados para conversões do vendedor
const conversoesMockData: Conversao[] = [
  {
    id: "CV-1001",
    clienteId: "PDV-2345",
    clienteNome: "Bar do João",
    data: new Date(2023, 4, 15),
    status: "confirmado"
  },
  {
    id: "CV-1002",
    clienteId: "PDV-2123",
    clienteNome: "Restaurante Sabor Caseiro",
    data: new Date(2023, 4, 18),
    status: "pendente"
  },
  {
    id: "CV-1003",
    clienteId: "PDV-2567",
    clienteNome: "Lanchonete Expresso",
    data: new Date(2023, 4, 20),
    status: "revertido"
  },
  {
    id: "CV-1004",
    clienteId: "PDV-2890",
    clienteNome: "Padaria Pão Quente",
    data: new Date(2023, 4, 22),
    status: "confirmado"
  },
  {
    id: "CV-1005",
    clienteId: "PDV-2111",
    clienteNome: "Bar e Petiscaria Encontro",
    data: new Date(2023, 4, 25),
    status: "pendente"
  },
  {
    id: "CV-1006",
    clienteId: "PDV-2222",
    clienteNome: "Restaurante Sabor Mineiro",
    data: new Date(2023, 4, 27),
    status: "confirmado"
  },
  {
    id: "CV-1007",
    clienteId: "PDV-2333",
    clienteNome: "Boteco da Esquina",
    data: new Date(2023, 4, 28),
    status: "revertido"
  },
  {
    id: "CV-1008",
    clienteId: "PDV-2444",
    clienteNome: "Pizzaria Forno a Lenha",
    data: new Date(2023, 4, 30),
    status: "pendente"
  }
];

const VendedorRelatorio = () => {
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date());
  const [conversoesFiltradas, setConversoesFiltradas] = useState<Conversao[]>([]);
  
  useEffect(() => {
    document.title = "Relatórios | Vendedor Heineken SP SUL";
    filtrarConversoes();
  }, [dataInicio, dataFim]);
  
  // Função para filtrar as conversões por data
  const filtrarConversoes = () => {
    let resultado = [...conversoesMockData];
    
    if (dataInicio) {
      resultado = resultado.filter(c => c.data >= dataInicio);
    }
    
    if (dataFim) {
      resultado = resultado.filter(c => c.data <= dataFim);
    }
    
    // Ordenar por data, da mais recente para a mais antiga
    resultado.sort((a, b) => b.data.getTime() - a.data.getTime());
    
    setConversoesFiltradas(resultado);
  };
  
  // Resetar filtros para o último mês
  const resetarFiltros = () => {
    setDataInicio(new Date(new Date().setDate(new Date().getDate() - 30)));
    setDataFim(new Date());
  };
  
  // Função para renderizar o ícone de status
  const renderizarIconeStatus = (status: string) => {
    switch (status) {
      case "confirmado":
        return <Check className="h-5 w-5 text-green-500" />;
      case "revertido":
        return <X className="h-5 w-5 text-red-500" />;
      case "pendente":
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Função para obter o texto do status
  const getTextoStatus = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "revertido":
        return "Revertido";
      case "pendente":
      default:
        return "Pendente";
    }
  };
  
  // Função para obter a classe CSS do status
  const getClasseStatus = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-500/20 text-green-500";
      case "revertido":
        return "bg-red-500/20 text-red-500";
      case "pendente":
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout userType="vendedor" pageTitle="Relatórios de Conversão">
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <Card className="bg-tactical-darkgray/80 border-heineken/30 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Data Início</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left bg-tactical-black border border-heineken/30 hover:bg-tactical-black/80 hover:text-heineken-neon",
                      !dataInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicio ? (
                      format(dataInicio, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-tactical-black border-heineken/30" align="start">
                  <Calendar
                    mode="single"
                    selected={dataInicio}
                    onSelect={setDataInicio}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1">
              <label className="text-sm text-tactical-silver mb-2 block">Data Fim</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left bg-tactical-black border border-heineken/30 hover:bg-tactical-black/80 hover:text-heineken-neon",
                      !dataFim && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFim ? (
                      format(dataFim, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecionar data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-tactical-black border-heineken/30" align="start">
                  <Calendar
                    mode="single"
                    selected={dataFim}
                    onSelect={setDataFim}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1 flex items-end">
              <Button 
                className="w-full bg-heineken hover:bg-heineken/80"
                onClick={resetarFiltros}
              >
                <Filter className="mr-2 h-4 w-4" /> Resetar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Suas Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-heineken/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-tactical-black">
                  <TableRow>
                    <TableHead>PDV</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversoesFiltradas.length > 0 ? (
                    conversoesFiltradas.map(conversao => (
                      <TableRow key={conversao.id}>
                        <TableCell>
                          <div>
                            <span className="font-medium">{conversao.clienteNome}</span>
                            <span className="block text-xs text-tactical-silver">{conversao.clienteId}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(conversao.data, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={`p-1 rounded-full ${conversao.status === "confirmado" ? "bg-green-500" : conversao.status === "revertido" ? "bg-red-500" : "bg-gray-400"}`}>
                              {renderizarIconeStatus(conversao.status)}
                            </span>
                            <span className={`py-1 px-2 rounded-md text-xs ${getClasseStatus(conversao.status)}`}>
                              {getTextoStatus(conversao.status)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        <Filter className="h-10 w-10 text-tactical-silver/50 mx-auto mb-2" />
                        <p className="text-tactical-silver">Nenhuma conversão encontrada no período selecionado.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VendedorRelatorio;
