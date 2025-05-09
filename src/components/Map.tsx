import React, { useEffect, useRef, useState } from "react";
import { MapPin, Store, Search, Gamepad, Utensils, Coffee, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClientDetailsModal from "./ClientDetailsModal";
import { clientsData, getPotentialColor } from "@/utils/clientData";
import { ClientData, ClientDetails } from "@/types/client";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrigir o problema com os ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapProps {
  className?: string;
  highlightedClientId?: string;
  onSelectClient?: (client: ClientData) => void;
  vendedorFilter?: string; // Nova prop para filtrar por vendedor
}

const Map: React.FC<MapProps> = ({ 
  className = "", 
  highlightedClientId, 
  onSelectClient,
  vendedorFilter
}) => {
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const filteredClients = vendedorFilter 
      ? clientsData.filter(client => client.vendedor === vendedorFilter)
      : clientsData;
      
    filteredClients.forEach(client => {
      // Create custom icon based on client potential and category
      const markerIcon = createClientIcon(client);
      
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
    
    // Add style for the new inox tier
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
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
      }
      .marker-icon {
        background-size: contain;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .marker-icon:hover {
        transform: scale(1.2);
        z-index: 1000;
      }
      .marker-icon.highlighted {
        transform: scale(1.3);
        box-shadow: 0 0 0 2px rgba(62, 255, 127, 0.8), 0 0 15px rgba(62, 255, 127, 0.6);
        z-index: 1001;
      }
      .marker-icon > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .marker-icon.bar { background-color: rgba(33, 33, 33, 0.8); }
      .marker-icon.restaurante { background-color: rgba(33, 33, 33, 0.8); }
      .marker-icon.mercado { background-color: rgba(33, 33, 33, 0.8); }
      .marker-icon.padaria { background-color: rgba(33, 33, 33, 0.8); }
      .marker-icon.entretenimento { background-color: rgba(33, 33, 33, 0.8); }
      .marker-icon.lanchonete { background-color: rgba(33, 33, 33, 0.8); }
      
      .marker-pin.bg-tactical-bronze { background-color: #CD7F32; }
      .marker-pin.bg-tactical-silver { background-color: #9F9EA1; }
      .marker-pin.bg-tactical-gold { background-color: #FFD700; }
      .marker-pin.bg-blue-400 { background-color: #60A5FA; }
      
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
      
      /* Add grid overlay */
      .leaflet-container:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(rgba(62, 255, 127, 0.05) 1px, transparent 1px), 
          linear-gradient(90deg, rgba(62, 255, 127, 0.05) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: 1000;
      }
      
      /* Add subtle vignette effect */
      .map-vignette {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 150px rgba(0,0,0,0.7);
        pointer-events: none;
        z-index: 1001;
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
  }, [vendedorFilter]); // Add vendedorFilter as a dependency

  // Effect for highlighting markers when hovering over client cards
  useEffect(() => {
    // Remove highlighted class from all markers first
    if (!markers.current) return;
    
    Object.values(markers.current).forEach(marker => {
      const el = marker.getElement();
      if (el) {
        el.querySelector('.marker-icon')?.classList.remove('highlighted');
      }
    });

    // Add highlighted class to the hovered client's marker
    if (highlightedClientId && markers.current[highlightedClientId]) {
      const marker = markers.current[highlightedClientId];
      const el = marker.getElement();
      if (el) {
        el.querySelector('.marker-icon')?.classList.add('highlighted');
      }
      
      // Optionally center map on the highlighted marker
      // if (leafletMap.current) {
      //   leafletMap.current.panTo(marker.getLatLng(), { animate: true });
      // }
    }
  }, [highlightedClientId]);
  
  // Function to create a custom icon for the client
  const createClientIcon = (client: ClientData) => {
    const potentialClass = getPotentialColor(client.potential);
    
    // HTML for the custom icon based on the category
    const iconHtml = `
      <div class="marker-icon ${client.type}">
        <div class="marker-pin ${potentialClass}"></div>
      </div>
    `;
    
    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };
  
  const handleClientClick = (client: ClientData) => {
    if (onSelectClient) {
      onSelectClient(client);
    } else {
      // Create a valid ClientDetails object from ClientData
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
    }
  };

  const handleConfirmConversion = (clientId: string) => {
    console.log(`Conversion confirmed for client ${clientId}`);
    setIsModalOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    // Filter markers based on search term
    Object.entries(markers.current).forEach(([id, marker]) => {
      const client = clientsData.find(c => c.id === id);
      if (!client) return;
      
      const isVisible = 
        client.name.toLowerCase().includes(term) || 
        client.address.street.toLowerCase().includes(term) ||
        client.address.neighborhood.toLowerCase().includes(term) ||
        client.address.city.toLowerCase().includes(term);
      
      if (isVisible) {
        leafletMap.current?.addLayer(marker);
      } else {
        leafletMap.current?.removeLayer(marker);
      }
    });
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {/* Map */}
      <div ref={mapRef} className="w-full h-full z-0" />
      
      {/* Vignette/border effect */}
      <div className="map-vignette" />
      
      {/* Client tier legend - moved to top right corner */}
      <div className="absolute top-4 right-4 bg-tactical-black/80 border border-heineken/20 p-2 rounded-sm z-10">
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
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-tactical-silver mr-1" />
            <span className="text-xs text-tactical-silver">Inox</span>
          </div>
        </div>
      </div>
      
      {/* Client details modal - only used if not delegating to parent component */}
      {!onSelectClient && (
        <ClientDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          client={selectedClient}
          onConfirmConversion={handleConfirmConversion}
        />
      )}
      
      {/* Vendor filter indicator when a filter is active */}
      {vendedorFilter && (
        <div className="absolute top-4 left-4 bg-tactical-black/80 border border-heineken/20 p-2 rounded-sm z-10">
          <p className="text-xs text-heineken-neon">
            Vendedor: {vendedorFilter}
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
