
import React from "react";
import { X, Store, MapPin, Phone, Package, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "./ProgressBar";

interface Client {
  id: string;
  name: string;
  type: "bar" | "mercado" | "padaria" | "restaurante";
  cluster: number;
  address: string;
  phone: string;
  products: string[];
  observations: string[];
  tier: "bronze" | "prata" | "ouro" | "diamante";
  lastVisit?: string;
}

interface ClientDetailsPanelProps {
  client: Client | null;
  onClose: () => void;
  onConfirmVisit: (clientId: string) => void;
}

const ClientDetailsPanel: React.FC<ClientDetailsPanelProps> = ({
  client,
  onClose,
  onConfirmVisit,
}) => {
  const { toast } = useToast();

  if (!client) return null;

  const handleConfirmVisit = () => {
    onConfirmVisit(client.id);
    toast({
      title: "Missão cumprida!",
      description: `Visita ao cliente ${client.name} confirmada com sucesso.`,
      duration: 3000,
    });
  };

  const getTierColor = (tier: string) => {
    switch(tier) {
      case "diamante":
        return "text-blue-400";
      case "ouro":
        return "text-tactical-gold";
      case "prata":
        return "text-tactical-silver";
      case "bronze":
        return "text-tactical-bronze";
      default:
        return "text-tactical-silver";
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "bar":
        return <Store size={16} />;
      case "mercado":
        return <Package size={16} />;
      case "padaria":
        return <Store size={16} />;
      case "restaurante":
        return <Store size={16} />;
      default:
        return <Store size={16} />;
    }
  };

  return (
    <div className="tactical-panel border-tactical w-full max-w-md animate-tactical-fade">
      {/* Header */}
      <div className="bg-tactical-darkgray border-b border-heineken/20 p-4 flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-heineken-neon">{client.name}</h2>
            <div className={`ml-2 ${getTierColor(client.tier)}`}>
              {Array.from({ length: client.tier === "diamante" ? 4 : 
                                     client.tier === "ouro" ? 3 : 
                                     client.tier === "prata" ? 2 : 1 }).map((_, i) => (
                <Star key={i} size={12} className="inline-block" fill="currentColor" />
              ))}
            </div>
          </div>
          <div className="flex items-center text-xs text-tactical-silver mt-1">
            {getTypeIcon(client.type)}
            <span className="ml-1 capitalize">{client.type}</span>
            <span className="mx-2">•</span>
            <span>Cluster {client.cluster}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-tactical-silver hover:text-white">
          <X size={18} />
        </Button>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-start">
            <MapPin size={16} className="text-tactical-silver mr-2 mt-0.5" />
            <span className="text-sm text-tactical-silver">{client.address}</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="text-tactical-silver mr-2" />
            <span className="text-sm text-tactical-silver">{client.phone}</span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-heineken/10"></div>
        
        {/* Products */}
        <div>
          <h3 className="text-xs font-bold text-tactical-silver uppercase mb-2">Produtos de interesse</h3>
          <div className="flex flex-wrap gap-2">
            {client.products.map((product, i) => (
              <span 
                key={i} 
                className="text-xs bg-tactical-darkgray/50 border border-heineken/20 px-2 py-0.5 rounded-sm text-heineken"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
        
        {/* Strategic Notes */}
        <div>
          <h3 className="text-xs font-bold text-tactical-silver uppercase mb-2">Observações estratégicas</h3>
          <ul className="text-sm text-tactical-silver space-y-1">
            {client.observations.map((obs, i) => (
              <li key={i} className="flex items-start">
                <span className="text-heineken mr-2">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Last Visit Info */}
        {client.lastVisit && (
          <div className="text-xs text-tactical-silver">
            <span className="block text-heineken-neon">Última visita:</span>
            <span>{client.lastVisit}</span>
          </div>
        )}
        
        {/* Relationship Progress */}
        <div>
          <h3 className="text-xs font-bold text-tactical-silver uppercase mb-1">Relacionamento</h3>
          <ProgressBar value={75} max={100} size="md" />
        </div>
      </div>
      
      {/* Footer/Action */}
      <div className="p-4 border-t border-heineken/20">
        <Button 
          onClick={handleConfirmVisit} 
          className="w-full tactical-button py-6"
        >
          <CheckCircle size={16} className="mr-2" />
          CONFIRMAR VISITA
        </Button>
      </div>
    </div>
  );
};

export default ClientDetailsPanel;
