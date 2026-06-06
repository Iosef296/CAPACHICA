export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'proveedor' | 'turista';
  telefono?: string;
  foto?: string;
  activo: boolean;
  fecha_registro: Date;
}
