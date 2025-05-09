
import { ClientData } from "@/types/client";

// Helper function for UI to get the color for a client's potential level
export const getPotentialColor = (potential: ClientData['potential']): string => {
  switch (potential) {
    case 'gold':
    case 'ouro':
      return 'bg-tactical-gold';
    case 'silver':
    case 'prata':
      return 'bg-tactical-silver';
    case 'bronze':
      return 'bg-tactical-bronze';
    case 'diamond':
    case 'diamante':
      return 'bg-blue-400';
    case 'inox':
      return 'bg-tactical-silver';
    default:
      return 'bg-tactical-silver';
  }
};

// Sample client data for demonstration
export const clientsData: ClientData[] = [
  {
    id: "1",
    name: "Bar do João",
    type: "bar",
    address: {
      street: "Rua Augusta",
      number: "1200",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP",
      zipcode: "01304-001"
    },
    phone: "11 3213-4567",
    email: "contato@bardojoao.com.br",
    position: {
      lat: -23.551262,
      lng: -46.654747
    },
    products: ["Heineken", "Amstel", "Sol"],
    potential: "gold",
    lastVisit: "2025-03-25",
    status: "active",
    notes: "Cliente VIP, grande volume de vendas.",
    vendedor: "Carlos Silva"
  },
  {
    id: "2",
    name: "Restaurante Sabor & Arte",
    type: "restaurante",
    address: {
      street: "Rua Oscar Freire",
      number: "987",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipcode: "01426-001"
    },
    position: {
      lat: -23.562431,
      lng: -46.669231
    },
    products: ["Heineken", "Heineken 0.0"],
    potential: "silver",
    lastVisit: "2025-03-20",
    vendedor: "Ana Duarte"
  },
  {
    id: "3",
    name: "Mercado São Pedro",
    type: "mercado",
    address: {
      street: "Av. Brigadeiro Faria Lima",
      number: "1234",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipcode: "05426-100"
    },
    position: {
      lat: -23.566508,
      lng: -46.692166
    },
    products: ["Heineken", "Amstel", "Sol", "Desperados"],
    potential: "bronze",
    vendedor: "Bruno Santos"
  },
  {
    id: "4",
    name: "Padaria Nova Paulista",
    type: "padaria",
    address: {
      street: "Av. Paulista",
      number: "900",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipcode: "01310-100"
    },
    position: {
      lat: -23.565638,
      lng: -46.652449
    },
    products: ["Heineken", "Amstel"],
    potential: "gold",
    status: "active",
    lastVisit: "2025-03-28",
    vendedor: "Carlos Silva"
  },
  {
    id: "5",
    name: "Bar Esquina da Noite",
    type: "bar",
    address: {
      street: "Rua da Consolação",
      number: "3456",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP",
      zipcode: "01302-000"
    },
    position: {
      lat: -23.553868,
      lng: -46.659389
    },
    products: ["Heineken", "Sol"],
    potential: "silver",
    vendedor: "Mariana Costa"
  },
  {
    id: "6",
    name: "Empório Vila Nova",
    type: "mercado",
    address: {
      street: "Rua dos Pinheiros",
      number: "540",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipcode: "05422-000"
    },
    position: {
      lat: -23.564761,
      lng: -46.678669
    },
    products: ["Heineken", "Heineken 0.0", "Eisenbahn"],
    potential: "diamond",
    vendedor: "Pedro Lima"
  },
  {
    id: "7",
    name: "Café Cultural",
    type: "lanchonete",
    address: {
      street: "Al. Santos",
      number: "876",
      neighborhood: "Jardim Paulista",
      city: "São Paulo",
      state: "SP",
      zipcode: "01418-000"
    },
    position: {
      lat: -23.569347,
      lng: -46.649117
    },
    products: ["Heineken"],
    potential: "bronze",
    vendedor: "Ana Duarte"
  },
  {
    id: "8",
    name: "Arena Games",
    type: "entretenimento",
    address: {
      street: "Av. Rebouças",
      number: "3210",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipcode: "05401-400"
    },
    position: {
      lat: -23.574041,
      lng: -46.685341
    },
    products: ["Heineken", "Heineken 0.0", "Sol"],
    potential: "gold",
    status: "active",
    vendedor: "Bruno Santos"
  },
  {
    id: "9",
    name: "Bar do Zé",
    type: "bar",
    address: {
      street: "Rua Teodoro Sampaio",
      number: "1020",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP",
      zipcode: "05406-050"
    },
    position: {
      lat: -23.557103,
      lng: -46.680187
    },
    products: ["Heineken", "Devassa", "Eisenbahn"],
    potential: "silver",
    vendedor: "Mariana Costa"
  },
  {
    id: "10",
    name: "Boteco Tradicional",
    type: "bar",
    address: {
      street: "Rua Augusta",
      number: "2340",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipcode: "01304-002"
    },
    position: {
      lat: -23.559096,
      lng: -46.656360
    },
    products: ["Heineken", "Amstel", "Kaiser"],
    potential: "bronze",
    vendedor: "Pedro Lima"
  }
];
