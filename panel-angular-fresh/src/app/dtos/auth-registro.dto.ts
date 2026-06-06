export interface RegistroDTO {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  rol?: 'turista' | 'proveedor';
}
