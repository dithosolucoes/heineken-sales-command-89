
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import Radar from "@/components/Radar";
import ClientPanel from "@/components/ClientPanel";
import MissionPanel from "@/components/MissionPanel";
import MobileClientsList from "@/components/MobileClientsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { ClientData, ClientDetails } from "@/types/client";
import { clientsData } from "@/utils/clientData";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientDetailsModal from "@/components/ClientDetailsModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const [clients] = useState<ClientData[]>(clientsData);
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(null);
  const [hoveredClient, setHoveredClient] = useState<ClientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isClientPanelMinimized, setIsClientPanelMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"clients" | "missions">("clients");

  useEffect(() => {
    document.title = "Dashboard | Heineken SP SUL";
  }, []);

  const handleClientSelect = (client: ClientData) => {
    // Create a proper ClientDetails object from ClientData
    const clientDetails: ClientDetails = {
      id: client.id,
      name: client.name,
      category: client.category || 'Bar C/D', // Default value if not provided
      type: client.type,
      cluster: client.cluster || 1, // Default value if not provided
      opp: client.opp || false, // Default value if not provided
      refrigerator: client.refrigerator || false, // Default value if not provided
      potential: client.potential,
      bottle: client.bottle || false, // Default value if not provided
      converted: client.converted || false, // Default value if not provided
      address: {
        street: client.address.street,
        neighborhood: client.address.neighborhood,
        city: client.address.city,
        zipCode: client.address.zipcode
      },
      position: client.position
    };
    
    setSelectedClient(clientDetails);
    setIsModalOpen(true);
  };

  const handleConfirmConversion = (clientId: string) => {
    console.log(`Conversion confirmed for client ${clientId}`);
    // Here you would typically update the client data in a real app
  };

  return (
    <DashboardLayout userType="vendedor" pageTitle="">
      {/* Map as main background element */}
      <div className="absolute inset-0 -mt-12">
        <Map 
          highlightedClientId={hoveredClient?.id} 
          onSelectClient={handleClientSelect}
        />
      </div>

      {/* Centered search bar */}
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

      {/* Radar positioned in the bottom right */}
      <div className="absolute bottom-8 right-8 z-10">
        <Radar />
      </div>

      {/* Client Panel (floating in the upper right) */}
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
              <div className="bg-tactical-black border border-heineken/30 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-heineken-neon font-bold">{selectedClient.name}</h3>
                  <button 
                    onClick={() => setSelectedClient(null)}
                    className="text-tactical-silver hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-tactical-silver text-sm mb-2">
                  {selectedClient.address.street}, {selectedClient.address.neighborhood}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full tactical-button py-2 text-sm"
                >
                  VER DETALHES
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Client/Mission Panel (floating in the bottom left) */}
      <div className={`absolute ${isClientPanelMinimized ? 'bottom-4 left-4 w-auto h-auto' : 'bottom-4 left-4 w-full max-w-xs'} transition-all duration-300 ease-in-out z-10`}>
        {isClientPanelMinimized ? (
          <button 
            onClick={() => setIsClientPanelMinimized(false)}
            className="tactical-button p-2 rounded-md"
          >
            <span className="text-xs">Ver painéis</span>
          </button>
        ) : (
          <div className="relative animate-tactical-fade">
            <button 
              onClick={() => setIsClientPanelMinimized(true)}
              className="absolute -top-8 right-0 bg-tactical-darkgray/80 border border-heineken/20 text-tactical-silver p-1 rounded-t-md"
            >
              <X size={16} />
            </button>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "clients" | "missions")} className="w-full">
              <TabsList className="w-full bg-tactical-darkgray/50 border border-heineken/20 mb-2">
                <TabsTrigger value="clients" className="flex-1 data-[state=active]:bg-heineken data-[state=active]:text-white">
                  Atendimentos
                </TabsTrigger>
                <TabsTrigger value="missions" className="flex-1 data-[state=active]:bg-heineken data-[state=active]:text-white">
                  Missões
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="clients" className="mt-0 h-[400px]">
                <ClientPanel 
                  clients={clients} 
                  onSelectClient={handleClientSelect}
                  onHoverClient={setHoveredClient}
                  compact={isMobile} 
                />
              </TabsContent>
              
              <TabsContent value="missions" className="mt-0 h-[400px]">
                <MissionPanel 
                  compact={isMobile}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Single client details modal - only this instance should exist */}
      <ClientDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        client={selectedClient}
        onConfirmConversion={handleConfirmConversion}
      />

      {/* Mobile client list */}
      {isMobile && (
        <MobileClientsList 
          clients={clients}
          onSelectClient={handleClientSelect}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
