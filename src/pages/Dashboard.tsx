
import { useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import MissionPanel from "@/components/MissionPanel";
import ProgressBar from "@/components/ProgressBar";
import Radar from "@/components/Radar";
import { Award, Map as MapIcon, Calendar, Target, TrendingUp, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Dummy data for missions
const missions = [
  {
    id: "mission1",
    title: "Conquiste o Cluster 9",
    description: "Visite e converta 5 clientes no Cluster 9 para aumentar a presença da marca.",
    progress: 3,
    total: 5,
    priority: "high",
    deadline: "15/04/2025"
  },
  {
    id: "mission2",
    title: "Expansão de Mix",
    description: "Introduza Heineken 0.0 em 3 estabelecimentos premium.",
    progress: 1,
    total: 3,
    priority: "medium",
    deadline: "20/04/2025"
  },
  {
    id: "mission3",
    title: "Manutenção de PDV",
    description: "Verifique a qualidade dos displays em 8 PDVs estratégicos.",
    progress: 4,
    total: 8,
    priority: "low",
    deadline: "30/04/2025"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("mapa");
  
  return (
    <div className="flex flex-col min-h-screen bg-tactical-black">
      <Header />

      <div className="flex-1 flex flex-col container mx-auto px-4 py-6 max-w-7xl">
        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="tactical-panel p-4">
            <h3 className="text-xs text-tactical-silver mb-1 flex items-center">
              <TrendingUp size={14} className="mr-1" />
              STATUS DE MISSÃO
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-heineken-neon font-bold">NÍVEL 7</span>
              <span className="text-xs text-tactical-silver">2150 / 3000 XP</span>
            </div>
            <ProgressBar value={2150} max={3000} size="md" />
          </div>
          
          <div className="tactical-panel p-4">
            <h3 className="text-xs text-tactical-silver mb-1 flex items-center">
              <Target size={14} className="mr-1" />
              PROGRESSO DIÁRIO
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-heineken-neon font-bold">8 / 12 PDVs</span>
              <span className="text-xs text-tactical-silver">Hoje: 10/04/2025</span>
            </div>
            <ProgressBar value={8} max={12} size="md" />
          </div>
          
          <div className="tactical-panel p-4">
            <h3 className="text-xs text-tactical-silver mb-1 flex items-center">
              <Award size={14} className="mr-1" />
              CONQUISTAS
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-heineken-neon font-bold">15 / 30</span>
              <span className="text-xs text-tactical-silver">Próxima: Mestre do Cluster</span>
            </div>
            <ProgressBar value={15} max={30} size="md" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Missions */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <MissionPanel missions={missions} />
          </div>
          
          {/* Main Panel - Map/Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs defaultValue="mapa" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList className="bg-tactical-darkgray/50 border border-heineken/20">
                  <TabsTrigger value="mapa" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
                    <MapIcon size={14} className="mr-2" />
                    Mapa
                  </TabsTrigger>
                  <TabsTrigger value="agenda" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
                    <Calendar size={14} className="mr-2" />
                    Agenda
                  </TabsTrigger>
                  <TabsTrigger value="conquistas" className="data-[state=active]:bg-heineken data-[state=active]:text-white">
                    <Award size={14} className="mr-2" />
                    Conquistas
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button variant="outline" size="sm" className="border-heineken/30 text-tactical-silver hover:text-heineken">
                <Filter size={14} className="mr-2" />
                Filtrar Clientes
              </Button>
            </div>
            
            <div className="flex-1">
              <TabsContent value="mapa" className="h-full m-0">
                <Map />
              </TabsContent>
              <TabsContent value="agenda" className="h-full m-0">
                <div className="tactical-panel h-full flex flex-col items-center justify-center p-4">
                  <Calendar size={48} className="text-heineken/40 mb-4" />
                  <p className="text-tactical-silver text-sm">Agenda de visitas em breve</p>
                </div>
              </TabsContent>
              <TabsContent value="conquistas" className="h-full m-0">
                <div className="tactical-panel h-full flex flex-col items-center justify-center p-4">
                  <Award size={48} className="text-heineken/40 mb-4" />
                  <p className="text-tactical-silver text-sm">Conquistas em breve</p>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
        
        {/* Tactical footer - Only visible in map view */}
        {activeTab === "mapa" && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="tactical-panel p-4 flex items-center">
              <Radar />
              <div className="ml-4">
                <h3 className="text-xs text-tactical-silver mb-1">STATUS DA ÁREA</h3>
                <p className="text-sm text-heineken-neon mb-1">Cluster 9 - SP Sul</p>
                <p className="text-xs text-tactical-silver">12 PDVs ativos | Presença 78%</p>
              </div>
            </div>
            
            <div className="tactical-panel p-4 sm:col-span-2">
              <h3 className="text-xs text-tactical-silver mb-2">ALERTAS TÁTICOS</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <p className="text-sm text-tactical-silver">3 clientes Premium sem visita há mais de 15 dias</p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <p className="text-sm text-tactical-silver">Concorrência aumentou presença no Cluster 9</p>
                </div>
                <div className="flex items-start">
                  <span className="text-heineken mr-2">•</span>
                  <p className="text-sm text-tactical-silver">Nova promoção disponível para bares</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
