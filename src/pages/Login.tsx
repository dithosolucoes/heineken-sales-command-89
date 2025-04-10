
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("vendedor");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes, we'll just use a simple validation
    // In a real app, you would authenticate against your backend
    setTimeout(() => {
      setIsLoading(false);
      if (username && password) {
        toast({
          title: "Missão iniciada!",
          description: "Bem-vindo ao sistema de comando, agente.",
          duration: 3000,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Acesso negado",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tactical-black bg-grid-pattern p-4">
      <div className="absolute inset-0 bg-gradient-tactical pointer-events-none" />
      
      {/* Logo and branding */}
      <div className="mb-8 relative z-10 animate-tactical-fade [animation-delay:200ms]">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-heineken mb-2 text-tactical">
            HEINEKEN
          </h1>
          <div className="text-xl md:text-2xl font-bold text-tactical-silver mb-1">
            SALES COMMAND
          </div>
          <div className="text-sm text-heineken-neon bg-tactical-darkgray/50 px-3 py-1 rounded-sm">
            SP SUL DIVISION
          </div>
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-md tactical-panel p-6 animate-tactical-fade [animation-delay:400ms]">
        <h2 className="text-lg font-bold text-heineken-neon border-b border-heineken/30 pb-2 mb-6">
          :: INICIAR MISSÃO ::
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-xs text-tactical-silver uppercase tracking-wider mb-1 block">
                ID do Agente
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-tactical-black border-heineken/40 focus:border-heineken-neon text-white"
                placeholder="Insira seu ID"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-xs text-tactical-silver uppercase tracking-wider mb-1 block">
                Código de acesso
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-tactical-black border-heineken/40 focus:border-heineken-neon text-white"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="text-xs text-tactical-silver uppercase tracking-wider mb-1 block">
                Tipo de operador
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={userType === "vendedor" ? "default" : "outline"}
                  onClick={() => setUserType("vendedor")}
                  className={`${userType === "vendedor" ? 'bg-heineken border-heineken' : 'bg-transparent border-heineken/40'} border text-xs h-auto py-1`}
                >
                  Vendedor
                </Button>
                <Button
                  type="button"
                  variant={userType === "supervisor" ? "default" : "outline"}
                  onClick={() => setUserType("supervisor")}
                  className={`${userType === "supervisor" ? 'bg-heineken border-heineken' : 'bg-transparent border-heineken/40'} border text-xs h-auto py-1`}
                >
                  Supervisor
                </Button>
                <Button
                  type="button"
                  variant={userType === "admin" ? "default" : "outline"}
                  onClick={() => setUserType("admin")}
                  className={`${userType === "admin" ? 'bg-heineken border-heineken' : 'bg-transparent border-heineken/40'} border text-xs h-auto py-1`}
                >
                  Admin
                </Button>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full tactical-button py-6"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-heineken-neon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Autenticando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                INICIAR MISSÃO
              </span>
            )}
          </Button>
        </form>
      </div>

      <div className="mt-4 text-sm text-tactical-silver/60 animate-tactical-fade [animation-delay:600ms]">
        © 2025 Heineken SP Sul - Command & Control System v1.0
      </div>
    </div>
  );
};

export default Login;
