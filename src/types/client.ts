
// Definindo os tipos necessários para o componente ClientDetailsModal
export type ClientCategory = 'Armazém/mercearia' | 'Restaurante C/D' | 'Bar C/D' | 'Padaria/confeitaria' | 'Entretenimento Espec' | 'Lanchonete';
export type ClientType = 'bar' | 'restaurante' | 'mercado' | 'padaria' | 'lanchonete' | 'entretenimento';
export type ClientPotential = 'bronze' | 'prata' | 'ouro' | 'diamante' | 'inox';

export interface ClientData {
  id: string;
  name: string;
  type: ClientType;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
  };
  phone?: string;
  email?: string;
  position: {
    lat: number;
    lng: number;
  };
  products: string[];
  potential: ClientPotential;
  lastVisit?: string;
  status?: 'active' | 'inactive' | 'pending';
  notes?: string;
  vendedor?: string;
  
  // Adicionando propriedades que faltam
  nextVisit?: Date;
  converted?: boolean;
  
  // Propriedades para compatibilidade com o tipo ClientDetails
  category?: ClientCategory;
  cluster?: number;
  opp?: boolean;
  refrigerator?: boolean;
  bottle?: boolean;
}

// Definição de interface para uso no componente ClientDetailsModal
export interface ClientDetails {
  id: string;
  name: string;
  category: ClientCategory;
  type: ClientType;
  cluster: number;
  opp: boolean;
  refrigerator: boolean;
  potential: ClientPotential;
  bottle: boolean;
  converted: boolean;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
  position: {
    lat: number;
    lng: number;
  };
}
