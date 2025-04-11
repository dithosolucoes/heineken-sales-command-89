
import React, { useState } from "react";
import { Search, MapPin, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clientsData, getPotentialColor } from "@/utils/clientData";
import { ClientData } from "@/types/client";
import ClientDetailsModal from "./ClientDetailsModal";

const MobileClientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter clients based on search term
  const filteredClients = clientsData.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleClientClick = (client: ClientData) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleConfirmVisit = (clientId: string) => {
    console.log(`Visit confirmed for client ${clientId}`);
    setIsModalOpen(false);
  };

  // Sort clients by potential (highest first)
  const sortedClients = [...filteredClients].sort((a, b) => {
    const potentialOrder = { diamante: 4, ouro: 3, prata: 2, bronze: 1 };
    return potentialOrder[b.potential] - potentialOrder[a.potential];
  });

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <div className="relative">
          <Input
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tactical-black/80 border-heineken/30 pl-9 pr-4 py-2 text-sm text-white w-full"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2">
        {sortedClients.length === 0 ? (
          <div className="text-center py-4 text-tactical-silver">
            <p className="text-sm">Nenhum cliente encontrado</p>
          </div>
        ) : (
          sortedClients.map((client) => (
            <div 
              key={client.id}
              onClick={() => handleClientClick(client)}
              className="tactical-panel p-2 flex items-center justify-between cursor-pointer hover:bg-tactical-darkgray/80 transition-all"
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 mr-2 rounded-full ${getPotentialColor(client.potential)}`} />
                <div>
                  <h3 className="text-sm text-tactical-silver font-medium">{client.name}</h3>
                  <p className="text-xs text-tactical-silver/70 flex items-center">
                    <MapPin size={10} className="mr-1" />
                    {client.address.street}, {client.address.neighborhood}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-heineken/50" />
            </div>
          ))
        )}
      </div>
      
      <ClientDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        client={selectedClient}
        onConfirmVisit={handleConfirmVisit}
      />
    </div>
  );
};

export default MobileClientsList;
