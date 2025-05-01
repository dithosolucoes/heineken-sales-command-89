
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Radar from "@/components/Radar";
import ClientDetailsPanel from "@/components/ClientDetailsPanel";
import MissionPanel from "@/components/MissionPanel";
import MobileClientsList from "@/components/MobileClientsList";
import { useMobile } from "@/hooks/use-mobile";
import { Client } from "@/types/client";
import { clientData } from "@/utils/clientData";

const Dashboard = () => {
  const { isMobile } = useMobile();
  const [clients] = useState<Client[]>(clientData);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Heineken SP SUL";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header userType="vendedor" />
      <div className="flex flex-col md:flex-row flex-1 gap-4 p-4">
        <div className="w-full md:w-2/3 xl:w-3/4 space-y-4">
          <div className="h-[70vh] tactical-panel relative">
            <Map />
            <div className="absolute bottom-4 right-4">
              <Radar />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 xl:w-1/4 space-y-4">
          <ClientDetailsPanel 
            clients={clients} 
            onSelectClient={setSelectedClient}
            onOpenModal={() => setIsModalOpen(true)}
          />
          <MissionPanel />
        </div>
      </div>

      {isMobile && (
        <MobileClientsList 
          clients={clients}
          onSelectClient={setSelectedClient}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}
    </div>
  );
};

export default Dashboard;
