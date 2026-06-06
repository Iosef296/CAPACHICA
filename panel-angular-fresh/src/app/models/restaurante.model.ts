// src/app/models/restaurante.model.ts

export interface Restaurante {
  id: string;
  nombre: string;
  descripcion?: string | null;
  ubicacion: {
    latitud: number;
    longitud: number;
  };
  direccion: string;
  whatsapp?: string | null;
  telefono?: string | null;
  email_contacto?: string | null;
  tipo_comida?: string | null;
  especialidades: string[];
  precio_promedio?: number | null;
  capacidad_mesas?: number | null;
  horarios?: Record<string, string>;
  fotos: string[];
  aprobado: boolean;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}
