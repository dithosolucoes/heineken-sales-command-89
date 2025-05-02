
import { ClientData } from "@/types/client";

// Dados fictícios dos clientes para demonstração
export const clientsData: ClientData[] = [
  {
    id: "1",
    name: "Bar do Zé",
    category: "Bar C/D",
    type: "bar",
    position: { lat: -23.5505, lng: -46.6333 },
    cluster: 9,
    potential: "prata",
    opp: false,
    refrigerator: true,
    bottle: false,
    converted: true,
    address: {
      street: "Av. Paulista, 1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      zipCode: "01310-100"
    },
    nextVisit: new Date(2025, 4, 3) // Tomorrow
  },
  {
    id: "2",
    name: "Padaria Estrela",
    category: "Padaria/confeitaria",
    type: "padaria",
    position: { lat: -23.5605, lng: -46.6233 },
    cluster: 9,
    potential: "bronze",
    opp: true,
    refrigerator: false,
    bottle: true,
    converted: false,
    address: {
      street: "Rua Augusta, 500",
      neighborhood: "Consolação",
      city: "São Paulo",
      zipCode: "01304-000"
    },
    nextVisit: new Date(2025, 4, 4) // In two days
  },
  {
    id: "3",
    name: "Supermercado Azul",
    category: "Armazém/mercearia",
    type: "mercado",
    position: { lat: -23.5405, lng: -46.6433 },
    cluster: 7,
    potential: "ouro",
    opp: true,
    refrigerator: true,
    bottle: true,
    converted: true,
    address: {
      street: "Av. Rebouças, 2000",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      zipCode: "05402-300"
    },
    nextVisit: new Date(2025, 4, 15) // In two weeks
  },
  {
    id: "4",
    name: "Bar e Restaurante Maravilha",
    category: "Restaurante C/D",
    type: "restaurante",
    position: { lat: -23.5705, lng: -46.6533 },
    cluster: 8,
    potential: "diamante",
    opp: false,
    refrigerator: true,
    bottle: false,
    converted: true,
    address: {
      street: "Rua Oscar Freire, 300",
      neighborhood: "Jardim Paulista",
      city: "São Paulo",
      zipCode: "01426-000"
    },
    nextVisit: new Date(2025, 4, 10) // In a week
  },
  {
    id: "5",
    name: "Game Center Alpha",
    category: "Entretenimento Espec",
    type: "entretenimento",
    position: { lat: -23.5805, lng: -46.6333 },
    cluster: 10,
    potential: "inox", // Updated to the new tier
    opp: true,
    refrigerator: false,
    bottle: false,
    converted: false,
    address: {
      street: "Av. Brigadeiro Faria Lima, 1500",
      neighborhood: "Jardim Paulistano",
      city: "São Paulo",
      zipCode: "01452-001"
    },
    nextVisit: new Date(2025, 4, 5) // In three days
  },
  {
    id: "6",
    name: "Lanchonete Express",
    category: "Lanchonete",
    type: "lanchonete",
    position: { lat: -23.5505, lng: -46.6433 },
    cluster: 9,
    potential: "bronze",
    opp: false,
    refrigerator: true,
    bottle: true,
    converted: false,
    address: {
      street: "Av. Paulista, 2000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      zipCode: "01310-200"
    },
    nextVisit: new Date(2025, 4, 3) // Tomorrow
  },
  {
    id: "7",
    name: "Mercearia do José",
    category: "Armazém/mercearia",
    type: "mercado",
    position: { lat: -23.5858, lng: -48.0477 },
    cluster: 9,
    potential: "prata",
    opp: false,
    refrigerator: false,
    bottle: false,
    converted: false,
    address: {
      street: "R. Cel. Fernando Prestes, 100",
      neighborhood: "Centro",
      city: "Itapetininga",
      zipCode: "18200-230"
    },
    nextVisit: new Date(2025, 4, 20) // In three weeks
  }
];

// Funções auxiliares para manipular os dados dos clientes
export const getClientById = (id: string): ClientData | undefined => {
  return clientsData.find(client => client.id === id);
};

// Função para obter o ícone baseado na categoria do cliente
export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "Armazém/mercearia":
      return "store";
    case "Restaurante C/D":
      return "utensils";
    case "Bar C/D":
      return "glass";
    case "Padaria/confeitaria":
      return "bread";
    case "Entretenimento Espec":
      return "gamepad";
    case "Lanchonete":
      return "burger";
    default:
      return "store";
  }
};

// Função para obter a cor do potencial do cliente
export const getPotentialColor = (potential: string): string => {
  switch (potential) {
    case "inox":
      return "bg-tactical-silver"; // Using the #9F9EA1 color already in the palette
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

// Function to filter clients by date range
export const filterClientsByDate = (clients: ClientData[], filter: 'day' | 'week' | 'month'): ClientData[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Set hours to 0 for consistent date comparison
  today.setHours(0, 0, 0, 0);
  
  return clients.filter(client => {
    if (!client.nextVisit) return false;
    
    const visitDate = new Date(client.nextVisit);
    visitDate.setHours(0, 0, 0, 0);
    
    switch (filter) {
      case 'day':
        // Today only
        return visitDate.getTime() === today.getTime();
      
      case 'week':
        // Next 7 days
        const weekLater = new Date(today);
        weekLater.setDate(weekLater.getDate() + 7);
        return visitDate >= today && visitDate <= weekLater;
      
      case 'month':
        // Next 30 days
        const monthLater = new Date(today);
        monthLater.setDate(monthLater.getDate() + 30);
        return visitDate >= today && visitDate <= monthLater;
      
      default:
        return true;
    }
  });
};
