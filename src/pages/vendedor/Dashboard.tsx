
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Radar from "@/components/Radar";
import ClientDetailsPanel from "@/components/ClientDetailsPanel";
import ClientPanel from "@/components/MissionPanel";
import MobileClientsList from "@/components/MobileClientsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { ClientData } from "@/types/client";
import { clientsData } from "@/utils/clientData";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [clients] = useState<ClientData[]>(clientsData);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isClientPanelMinimized, setIsClientPanelMinimized] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | Heineken SP SUL";
  }, []);

  const handleConfirmConversion = (clientId: string) => {
    console.log(`Conversion confirmed for client ${clientId}`);
    // Here you would typically update the client data in a real app
  };

  return (
    <DashboardLayout userType="vendedor" pageTitle="">
      {/* Mapa como elemento principal de fundo */}
      <div className="absolute inset-0 -mt-12">
        <Map />
      </div>

      {/* Barra de pesquisa centralizada */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md">
        <div className="relative">
          <Input
            placeholder="Buscar cliente por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tactical-black/70 border-heineken/30 pl-9 pr-4 py-2 text-sm text-white w-full shadow-lg"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver" />
        </div>
      </div>

      {/* Radar posicionado no canto inferior direito */}
      <div className="absolute bottom-8 right-8 z-10">
        <Radar />
      </div>

      {/* Painel de Cliente (flutuante no canto superior direito) */}
      {selectedClient && (
        <div className={`absolute ${isPanelMinimized ? 'top-4 right-4 w-auto h-auto' : 'top-14 right-4 w-full max-w-sm'} transition-all duration-300 ease-in-out z-20`}>
          {isPanelMinimized ? (
            <button 
              onClick={() => setIsPanelMinimized(false)}
              className="tactical-button p-2 rounded-md flex items-center"
            >
              <span className="text-xs mr-2">Cliente: {selectedClient.name}</span>
              <span className="text-tactical-silver">+</span>
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsPanelMinimized(true)}
                className="absolute -top-8 right-0 bg-tactical-darkgray/80 border border-heineken/20 text-tactical-silver p-1 rounded-t-md"
              >
                <X size={16} />
              </button>
              <ClientDetailsPanel 
                client={selectedClient} 
                onClose={() => setSelectedClient(null)}
                onConfirmConversion={handleConfirmConversion}
              />
            </div>
          )}
        </div>
      )}

      {/* Painel de Clientes (flutuante no canto inferior esquerdo) */}
      <div className={`absolute ${isClientPanelMinimized ? 'bottom-4 left-4 w-auto h-auto' : 'bottom-4 left-4 w-full max-w-xs'} transition-all duration-300 ease-in-out z-10`}>
        {isClientPanelMinimized ? (
          <button 
            onClick={() => setIsClientPanelMinimized(false)}
            className="tactical-button p-2 rounded-md"
          >
            <span className="text-xs">Próximos atendimentos</span>
          </button>
        ) : (
          <div className="relative animate-tactical-fade">
            <button 
              onClick={() => setIsClientPanelMinimized(true)}
              className="absolute -top-8 right-0 bg-tactical-darkgray/80 border border-heineken/20 text-tactical-silver p-1 rounded-t-md"
            >
              <X size={16} />
            </button>
            <ClientPanel 
              clients={clients} 
              onSelectClient={setSelectedClient}
              compact={isMobile} 
            />
          </div>
        )}
      </div>

      {/* Lista mobile de clientes */}
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
