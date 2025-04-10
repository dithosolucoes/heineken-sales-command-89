
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BellRing, 
  User, 
  LogOut, 
  Settings, 
  Menu,
  X
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  vendedorNome?: string;
  vendedorNivel?: number;
}

const Header = ({ 
  vendedorNome = "Carlos Silva", 
  vendedorNivel = 7 
}: HeaderProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-tactical-darkgray/90 border-b border-heineken/30 backdrop-blur-md z-50 sticky top-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-heineken text-tactical">HEINEKEN</span>
              <span className="text-xs text-tactical-silver -mt-1">SALES COMMAND</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="link" className="text-tactical-silver hover:text-heineken-neon">
              Missões
            </Button>
            <Button variant="link" className="text-tactical-silver hover:text-heineken-neon">
              Mapa
            </Button>
            <Button variant="link" className="text-tactical-silver hover:text-heineken-neon">
              Conquistas
            </Button>
            <Button variant="link" className="text-tactical-silver hover:text-heineken-neon">
              Relatórios
            </Button>
          </div>

          {/* User Menu and Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellRing className="h-5 w-5 text-tactical-silver" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-heineken animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-tactical-black border-heineken/30">
                <div className="text-xs font-bold text-heineken-neon p-2 border-b border-heineken/20">
                  :: NOTIFICAÇÕES ::
                </div>
                <div className="p-2">
                  <div className="py-2 text-sm text-tactical-silver border-b border-heineken/10">
                    <p className="font-bold">Nova missão disponível</p>
                    <p className="text-xs">Conquiste 3 PDVs no Cluster 9</p>
                  </div>
                  <div className="py-2 text-sm text-tactical-silver">
                    <p className="font-bold">Conquista desbloqueada</p>
                    <p className="text-xs">Rota perfeita: 5 visitas em sequência</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-heineken/10">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-heineken text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm text-tactical-silver">{vendedorNome}</p>
                    <p className="text-xs text-heineken-neon">Nível {vendedorNivel}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-tactical-black border-heineken/30">
                <DropdownMenuItem className="text-tactical-silver hover:text-heineken-neon hover:bg-heineken/10">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-tactical-silver hover:text-heineken-neon hover:bg-heineken/10">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-heineken" /> : <Menu className="h-5 w-5 text-tactical-silver" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-2 border-t border-heineken/20 mt-3 animate-tactical-fade">
            <Button variant="ghost" className="w-full justify-start text-tactical-silver hover:text-heineken-neon">
              Missões
            </Button>
            <Button variant="ghost" className="w-full justify-start text-tactical-silver hover:text-heineken-neon">
              Mapa
            </Button>
            <Button variant="ghost" className="w-full justify-start text-tactical-silver hover:text-heineken-neon">
              Conquistas
            </Button>
            <Button variant="ghost" className="w-full justify-start text-tactical-silver hover:text-heineken-neon">
              Relatórios
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
