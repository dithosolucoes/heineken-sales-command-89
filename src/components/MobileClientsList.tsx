
import { useState } from "react";
import { Client } from "@/types/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Users, MapPin, Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MobileClientsListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onOpenModal: () => void;
}

const MobileClientsList = ({
  clients,
  onSelectClient,
  onOpenModal,
}: MobileClientsListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClient = (client: Client) => {
    onSelectClient(client);
    onOpenModal();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:hidden z-10">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="tactical-button rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg border-tactical">
          <Users className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="bottom" className="bg-tactical-black border-heineken/30 h-[75vh] rounded-t-lg px-0">
          <div className="p-4 pb-0">
            <h2 className="text-lg font-bold text-heineken-neon mb-2">Clientes</h2>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-tactical-silver" />
              <Input
                placeholder="Buscar cliente..."
                className="pl-8 bg-tactical-darkgray/80 border-heineken/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-auto h-full pb-20 px-4">
            {filteredClients.length === 0 ? (
              <div className="text-center py-8 text-tactical-silver">
                Nenhum cliente encontrado.
              </div>
            ) : (
              <div className="grid gap-2">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className="p-3 bg-tactical-darkgray/80 border border-heineken/30 rounded-md cursor-pointer hover:border-heineken hover:bg-tactical-darkgray transition-all"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-heineken-neon">{client.name}</h3>
                      <span className="text-xs bg-tactical-black px-2 py-0.5 rounded text-tactical-silver">{client.type}</span>
                    </div>
                    <div className="mt-1 text-xs text-tactical-silver flex items-start">
                      <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{client.address}</span>
                    </div>
                    <div className="mt-1 text-xs text-tactical-silver flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileClientsList;
