
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Store, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ClientDetailsPanel from "./ClientDetailsPanel";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrigir o problema com os ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Dummy data for demonstration
const dummyClients = [
  {
    id: "1",
    name: "Bar do Zé",
    type: "bar",
    position: { lat: -23.5505, lng: -46.6333 }, // São Paulo
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
    position: { lat: -23.5605, lng: -46.6233 }, // Próximo a SP
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
    position: { lat: -23.5405, lng: -46.6433 }, // Outro ponto em SP
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
    position: { lat: -23.5705, lng: -46.6533 }, // Mais um ponto em SP
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
  className?: string;
}

const Map: React.FC<MapProps> = ({ onSelectClient, className = "" }) => {
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markers = useRef<{[key: string]: L.Marker}>({});
  
  // Fixing default icon issue in Leaflet
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconUrl: icon,
      iconRetinaUrl: icon,
      shadowUrl: iconShadow
    });
  }, []);
  
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Create map centered on São Paulo, Brazil
    leafletMap.current = L.map(mapRef.current, {
      zoomControl: false, // Move zoom control to a different position below
      attributionControl: false, // Hide the attribution for cleaner look
    }).setView([-23.5505, -46.6333], 13);
    
    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(leafletMap.current);
    
    // Add attribution control to bottom left with minimal styling
    L.control.attribution({
      position: 'bottomleft',
      prefix: false
    }).addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>').addTo(leafletMap.current);
    
    // Add OpenStreetMap tiles with custom styling to match the app
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      className: 'dark-map-tiles' // Will be styled via CSS
    }).addTo(leafletMap.current);
    
    // Add client markers
    dummyClients.forEach(client => {
      // Create custom icon based on client tier
      const markerIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin ${getTierColorClass(client.tier)}"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      
      // Create marker and add to map
      const marker = L.marker([client.position.lat, client.position.lng], {
        icon: markerIcon,
        title: client.name
      }).addTo(leafletMap.current!);
      
      // Add click handler
      marker.on('click', () => {
        handleClientClick(client);
      });
      
      // Store reference to marker
      markers.current[client.id] = marker;
    });
    
    // Add custom styling to make map match the app theme
    const style = document.createElement('style');
    style.textContent = `
      .dark-map-tiles {
        filter: brightness(0.8) invert(1) contrast(1.2) hue-rotate(200deg) saturate(0.3) brightness(0.8);
      }
      .marker-pin {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.3), 0 0 5px rgba(255,255,255,0.5);
      }
      .marker-pin.bg-tactical-bronze { background-color: #CD7F32; }
      .marker-pin.bg-tactical-silver { background-color: #9F9EA1; }
      .marker-pin.bg-tactical-gold { background-color: #FFD700; }
      .marker-pin.bg-blue-400 { background-color: #60A5FA; }
      .marker-pin:hover {
        transform: scale(1.2);
        transition: transform 0.2s;
      }
      .leaflet-control-attribution {
        background: rgba(0, 0, 0, 0.5) !important;
        color: #666 !important;
        font-size: 10px !important;
      }
      .leaflet-control-attribution a {
        color: #888 !important;
      }
      .leaflet-control-zoom {
        border: none !important;
        margin-right: 15px !important;
        margin-bottom: 15px !important;
      }
      .leaflet-control-zoom a {
        background-color: rgba(0, 0, 0, 0.6) !important;
        color: #fff !important;
        border: 1px solid rgba(62, 255, 127, 0.4) !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: rgba(62, 255, 127, 0.2) !important;
      }
    `;
    document.head.appendChild(style);
    
    // Resize handler to ensure map fills container when window changes
    const handleResize = () => {
      if (leafletMap.current) {
        leafletMap.current.invalidateSize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Run once to ensure proper initial sizing
    setTimeout(handleResize, 250);
    
    // Cleanup function
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(style);
    };
  }, []);
  
  const handleClientClick = (client: any) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
    if (onSelectClient) onSelectClient(client);
  };

  const handleConfirmVisit = (clientId: string) => {
    console.log(`Visit confirmed for client ${clientId}`);
    setIsDialogOpen(false);
  };

  const getTierColorClass = (tier: string) => {
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
    <div className={`absolute inset-0 ${className}`}>
      {/* Map */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0" />
      
      {/* Search bar - Floating on top of map */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-lg mx-auto">
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
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-tactical-black/80 border border-heineken/20 p-2 rounded-sm z-10">
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
