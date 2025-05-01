
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Radar from "@/components/Radar";
import ClientDetailsPanel from "@/components/ClientDetailsPanel";
import MissionPanel from "@/components/MissionPanel";
import MobileClientsList from "@/components/MobileClientsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { ClientData } from "@/types/client";
import { clientsData } from "@/utils/clientData";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Dados fictícios para as missões
const missions = [{
  id: "mission1",
  title: "Conquiste o Cluster 9",
  description: "Visite e converta 5 clientes no Cluster 9 para aumentar a presença da marca.",
  progress: 3,
  total: 5,
  priority: "high" as const,
  deadline: "15/04/2025"
}, {
  id: "mission2",
  title: "Expansão de Mix",
  description: "Introduza Heineken 0.0 em 3 estabelecimentos premium.",
  progress: 1,
  total: 3,
  priority: "medium" as const,
  deadline: "20/04/2025"
}, {
  id: "mission3",
  title: "Manutenção de PDV",
  description: "Verifique a qualidade dos displays em 8 PDVs estratégicos.",
  progress: 4,
  total: 8,
  priority: "low" as const,
  deadline: "30/04/2025"
}];

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [clients] = useState<ClientData[]>(clientsData);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Heineken SP SUL";
  }, []);

  return (
    <DashboardLayout userType="vendedor" pageTitle="Dashboard">
      <div className="flex flex-col md:flex-row flex-1 gap-4">
        <div className="w-full md:w-2/3 xl:w-3/4 space-y-4">
          <div className="h-[70vh] tactical-panel relative">
            <Map />
            <div className="absolute bottom-4 right-4">
              <Radar />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 xl:w-1/4 space-y-4">
          {selectedClient ? (
            <ClientDetailsPanel 
              client={selectedClient} 
              onClose={() => setSelectedClient(null)}
              onConfirmVisit={() => {}}
            />
          ) : (
            <div className="tactical-panel h-full flex flex-col items-center justify-center p-4">
              <p className="text-tactical-silver text-sm">Selecione um cliente para ver detalhes</p>
            </div>
          )}
          <MissionPanel missions={missions} />
        </div>
      </div>

      {isMobile && (
        <MobileClientsList 
          clients={clients}
          onSelectClient={setSelectedClient}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
