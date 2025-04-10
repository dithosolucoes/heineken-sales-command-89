
import React, { useState } from "react";
import { MapPin, Store, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ClientDetailsPanel from "./ClientDetailsPanel";

// Dummy data for demonstration
const dummyClients = [
  {
    id: "1",
    name: "Bar do Zé",
    type: "bar",
    position: { x: 20, y: 30 },
    cluster: 9,
    tier: "prata",
    address: "Av. Paulista, 1000, São Paulo",
    phone: "(11) 99999-9999",
    products: ["Heineken 600ml", "Heineken 0.0", "Heineken Long Neck"],
    observations: ["Cliente sensível a preço", "Preferência por displays"],
    lastVisit: "10/03/2025"
  },
  {
    id: "2",
    name: "Padaria Estrela",
    type: "padaria",
    position: { x: 60, y: 40 },
    cluster: 9,
    tier: "bronze",
    address: "Rua Augusta, 500, São Paulo",
    phone: "(11) 98888-8888",
    products: ["Heineken Long Neck", "Amstel"],
    observations: ["Concorrência forte", "Potencial para expansão"],
    lastVisit: "05/03/2025"
  },
  {
    id: "3",
    name: "Supermercado Azul",
    type: "mercado",
    position: { x: 75, y: 65 },
    cluster: 7,
    tier: "ouro",
    address: "Av. Rebouças, 2000, São Paulo",
    phone: "(11) 97777-7777",
    products: ["Heineken Lata", "Eisenbahn", "Lagunitas"],
    observations: ["Cliente VIP", "Possibilidade de merchandising"],
    lastVisit: "08/03/2025"
  },
  {
    id: "4",
    name: "Bar e Restaurante Maravilha",
    type: "restaurante",
    position: { x: 30, y: 70 },
    cluster: 8,
    tier: "diamante",
    address: "Rua Oscar Freire, 300, São Paulo",
    phone: "(11) 96666-6666",
    products: ["Heineken Pack Premium", "Heineken 0.0", "Draft"],
    observations: ["Parceiro estratégico", "Excelente exposição de marca"],
  }
];

interface MapProps {
  onSelectClient?: (client: any) => void;
}

const Map: React.FC<MapProps> = ({ onSelectClient }) => {
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleClientClick = (client: any) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
    if (onSelectClient) onSelectClient(client);
  };

  const handleConfirmVisit = (clientId: string) => {
    console.log(`Visit confirmed for client ${clientId}`);
    setIsDialogOpen(false);
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "diamante":
        return "bg-blue-400";
      case "ouro":
        return "bg-tactical-gold";
      case "prata":
        return "bg-tactical-silver";
      case "bronze":
        return "bg-tactical-bronze";
      default:
        return "bg-tactical-silver";
    }
  };

  return (
    <div className="relative w-full h-full tactical-panel overflow-hidden">
      {/* Search bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <Input
            placeholder="Buscar cliente por nome ou endereço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-tactical-black/80 border-heineken/30 pl-9 pr-4 py-2 text-sm text-white w-full"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tactical-silver" />
        </div>
      </div>
      
      {/* Map */}
      <div 
        className="h-full w-full heineken-grid-bg flex items-center justify-center"
        style={{ backgroundSize: '40px 40px' }}
      >
        {/* This is a placeholder for the actual map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-tactical-silver opacity-20 select-none">
            <MapPin size={48} />
            <p className="text-sm mt-2">SP SUL</p>
          </div>
        </div>
        
        {/* Client markers */}
        {dummyClients.map((client) => (
          <div
            key={client.id}
            className="absolute cursor-pointer group"
            style={{ 
              left: `${client.position.x}%`, 
              top: `${client.position.y}%`,
            }}
            onClick={() => handleClientClick(client)}
          >
            <div 
              className={`w-3 h-3 rounded-full ${getTierColor(client.tier)} group-hover:scale-125 transition-transform duration-200`}
              style={{ boxShadow: '0 0 0 2px rgba(0,0,0,0.3), 0 0 5px rgba(255,255,255,0.5)' }}
            />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-tactical-darkgray/90 px-2 py-0.5 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {client.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-tactical-black/80 border border-heineken/20 p-2 rounded-sm">
        <p className="text-xs text-tactical-silver mb-1">Cliente por tier:</p>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-tactical-bronze mr-1" />
            <span className="text-xs text-tactical-silver">Bronze</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-tactical-silver mr-1" />
            <span className="text-xs text-tactical-silver">Prata</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-tactical-gold mr-1" />
            <span className="text-xs text-tactical-silver">Ouro</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-400 mr-1" />
            <span className="text-xs text-tactical-silver">Diamante</span>
          </div>
        </div>
      </div>
      
      {/* Client details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-tactical-black border-heineken/30 p-0 max-w-md">
          <ClientDetailsPanel 
            client={selectedClient} 
            onClose={() => setIsDialogOpen(false)} 
            onConfirmVisit={handleConfirmVisit} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
