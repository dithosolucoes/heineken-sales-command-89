
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ImportarRotasCard } from "@/components/supervisor/rotas/ImportarRotasCard";
import { FiltrarRotasCard } from "@/components/supervisor/rotas/FiltrarRotasCard";
import { RotasCadastradasCard } from "@/components/supervisor/rotas/RotasCadastradasCard";
import { MapaRotasCard } from "@/components/supervisor/rotas/MapaRotasCard";
import { rotasData } from "@/components/supervisor/rotas/mockData";

const SupervisorRotas = () => {
  const [selectedVendedor, setSelectedVendedor] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Rotas | Supervisor Heineken SP SUL";
  }, []);

  return (
    <DashboardLayout userType="supervisor" pageTitle="Gerenciamento de Rotas">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <ImportarRotasCard />
        <FiltrarRotasCard 
          rotasData={rotasData}
          selectedVendedor={selectedVendedor}
          setSelectedVendedor={setSelectedVendedor}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <RotasCadastradasCard 
            rotasData={rotasData}
            selectedVendedor={selectedVendedor}
          />
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <MapaRotasCard selectedVendedor={selectedVendedor} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupervisorRotas;
