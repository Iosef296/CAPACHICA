export interface ActualizarRestauranteDTO {
  nombre?: string;
  descripcion?: string;
  ubicacion?: { latitud: number; longitud: number };
  direccion?: string;
  whatsapp?: string;
  telefono?: string;
  email_contacto?: string;
  tipo_comida?: string;
  especialidades?: string[];
  precio_promedio?: number;
  capacidad_mesas?: number;
  horarios?: Record<string, string>;
  fotos?: string[];
  activo?: boolean;
}
