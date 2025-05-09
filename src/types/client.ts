
export interface ClientData {
  id: string;
  name: string;
  type: 'bar' | 'restaurante' | 'mercado' | 'padaria' | 'lanchonete' | 'entretenimento';
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
  potential: 'bronze' | 'silver' | 'gold' | 'diamond';
  lastVisit?: string;
  status?: 'active' | 'inactive' | 'pending';
  notes?: string;
  vendedor?: string; // Add vendedor property to associate clients with vendors
}
