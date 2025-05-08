
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { MissaoModal } from "@/components/supervisor/MissaoModal";
import { MissoesFiltersCard } from "@/components/supervisor/missoes/MissoesFiltersCard";
import { NovaMissaoCard } from "@/components/supervisor/missoes/NovaMissaoCard";
import { MissaoCard } from "@/components/supervisor/missoes/MissaoCard";
import { MissoesEmptyState } from "@/components/supervisor/missoes/MissoesEmptyState";
import { missoesData } from "@/components/supervisor/missoes/mockData";
import { Missao } from "@/types/missao";

const SupervisorMissoes = () => {
  const [filtroStatus, setFiltroStatus] = useState<string>("todas");
  const [filtroVendedor, setFiltroVendedor] = useState<string>("todos");
  const [missoesExibidas, setMissoesExibidas] = useState<Missao[]>(missoesData);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedMissao, setSelectedMissao] = useState<Missao | undefined>(undefined);

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

  // Function to open the modal for creating a mission
  const handleOpenCreateModal = () => {
    setSelectedMissao(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  // Function to open the modal for viewing mission details
  const handleOpenDetailsModal = (missao: Missao) => {
    setSelectedMissao(missao);
    setModalMode('view');
    setModalOpen(true);
  };

  // Function to open the modal for editing a mission
  const handleOpenEditModal = (missao: Missao) => {
    setSelectedMissao(missao);
    setModalMode('edit');
    setModalOpen(true);
  };

  // Function to clear filters
  const handleClearFilters = () => {
    setFiltroStatus("todas");
    setFiltroVendedor("todos");
  };

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Missões">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <MissoesFiltersCard
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          filtroVendedor={filtroVendedor}
          setFiltroVendedor={setFiltroVendedor}
          missoesCount={missoesData.length}
          filteredCount={missoesExibidas.length}
        />

        <NovaMissaoCard onCreateMission={handleOpenCreateModal} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missoesExibidas.map(missao => (
          <MissaoCard 
            key={missao.id} 
            missao={missao}
            onViewDetails={handleOpenDetailsModal}
            onEditMission={handleOpenEditModal}
          />
        ))}

        {missoesExibidas.length === 0 && (
          <MissoesEmptyState onClearFilters={handleClearFilters} />
        )}
      </div>

      {/* Modal for creating/editing/viewing missions */}
      <MissaoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        missao={selectedMissao}
        mode={modalMode}
      />
    </DashboardLayout>
  );
};

export default SupervisorMissoes;
