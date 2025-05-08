
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { FiltrosCard } from "@/components/supervisor/relatorios/FiltrosCard";
import { ExportarCard } from "@/components/supervisor/relatorios/ExportarCard";
import { DesempenhoCard } from "@/components/supervisor/relatorios/DesempenhoCard";
import { TabelaConversoes } from "@/components/supervisor/relatorios/TabelaConversoes";
import { ExportarRelatorioModal } from "@/components/supervisor/ExportarRelatorioModal";
import { conversoesMockData } from "@/components/supervisor/relatorios/mockData";
import type { Conversao } from "@/components/supervisor/relatorios/mockData";

const SupervisorRelatorios = () => {
  const [filtroVendedor, setFiltroVendedor] = useState<string>("todos");
  const [filtroAcao, setFiltroAcao] = useState<string>("todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("mes");
  const [conversoesExibidas, setConversoesExibidas] = useState<Conversao[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [exportarModalOpen, setExportarModalOpen] = useState(false);
  const itensPorPagina = 10;
  const totalPaginas = Math.ceil(conversoesMockData.length / itensPorPagina);
  
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

  const limparFiltros = () => {
    setFiltroVendedor("todos");
    setFiltroAcao("todas");
    setFiltroPeriodo("mes");
    setPaginaAtual(1);
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Relatórios de Desempenho">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <FiltrosCard 
          filtroVendedor={filtroVendedor}
          setFiltroVendedor={setFiltroVendedor}
          filtroAcao={filtroAcao}
          setFiltroAcao={setFiltroAcao}
          filtroPeriodo={filtroPeriodo}
          setFiltroPeriodo={setFiltroPeriodo}
          setPaginaAtual={setPaginaAtual}
        />

        <ExportarCard onExportar={() => setExportarModalOpen(true)} />
      </div>
      
      <DesempenhoCard />
      
      <TabelaConversoes 
        conversoesExibidas={conversoesExibidas}
        totalConversoesOriginais={conversoesMockData.length}
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        totalPaginas={totalPaginas}
        limparFiltros={limparFiltros}
      />
      
      {/* Modal de exportação */}
      <ExportarRelatorioModal 
        isOpen={exportarModalOpen} 
        onClose={() => setExportarModalOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default SupervisorRelatorios;
