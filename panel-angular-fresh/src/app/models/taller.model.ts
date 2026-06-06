// src/app/models/taller.model.ts

export interface Taller {
  id: string;
  restaurante_id: string;
  nombre: string;
  descripcion?: string | null;
  duracion?: string | null;
  precio: number;
  capacidad_maxima?: number | null;
  horarios: string[];
  incluye_materiales: boolean;
  plato_principal?: string | null;
  fotos: string[];
  disponible: boolean;
  created_at: Date;
  updated_at: Date;
}
