
export type ClientCategory = 
  | "Armazém/mercearia"
  | "Restaurante C/D"
  | "Bar C/D"
  | "Padaria/confeitaria"
  | "Entretenimento Espec"
  | "Lanchonete";

export type ClientType = 
  | "bar"
  | "restaurante"
  | "mercado"
  | "padaria"
  | "entretenimento"
  | "lanchonete";

export type ClientPotential = 
  | "bronze"
  | "prata"
  | "ouro"
  | "diamante";

export interface ClientData {
  id: string;
  name: string;
  category: ClientCategory;
  type: ClientType;
  position: {
    lat: number;
    lng: number;
  };
  cluster: number;
  potential: ClientPotential;
  opp: boolean;
  refrigerator: boolean;
  bottle: boolean;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
}

export interface ClientMarker {
  id: string;
  position: [number, number];
  category: ClientCategory;
  potential: ClientPotential;
  name: string;
}
