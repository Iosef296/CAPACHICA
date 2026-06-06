export interface CrearTallerDTO {
  restaurante_id: string;
  nombre: string;
  descripcion?: string;
  duracion?: string;
  precio: number;
  capacidad_maxima?: number;
  horarios?: string[];
  incluye_materiales?: boolean;
  plato_principal?: string;
  fotos?: string[];
}
