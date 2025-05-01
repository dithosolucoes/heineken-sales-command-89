
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas Login e NotFound
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Páginas do Vendedor
import VendedorDashboard from "./pages/vendedor/Dashboard";

// Páginas do Supervisor
import SupervisorDashboard from "./pages/supervisor/Dashboard";
import SupervisorRotas from "./pages/supervisor/Rotas";
import SupervisorMissoes from "./pages/supervisor/Missoes";
import SupervisorRelatorios from "./pages/supervisor/Relatorios";

// Páginas do Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRelatorios from "./pages/admin/Relatorios";
import AdminMissoes from "./pages/admin/Missoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota raiz - redireciona para login */}
          <Route path="/" element={<Login />} />
          
          {/* Rotas do Vendedor */}
          <Route path="/vendedor/dashboard" element={<VendedorDashboard />} />
          
          {/* Rotas do Supervisor */}
          <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor/rotas" element={<SupervisorRotas />} />
          <Route path="/supervisor/missoes" element={<SupervisorMissoes />} />
          <Route path="/supervisor/relatorios" element={<SupervisorRelatorios />} />
          
          {/* Rotas do Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/relatorios" element={<AdminRelatorios />} />
          <Route path="/admin/missoes" element={<AdminMissoes />} />
          
          {/* Rotas legadas (redirecionamento) */}
          <Route path="/dashboard" element={<Navigate to="/vendedor/dashboard" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
