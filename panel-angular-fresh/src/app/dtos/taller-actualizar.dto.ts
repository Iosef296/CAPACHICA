export interface ActualizarTallerDTO {
  nombre?: string;
  descripcion?: string;
  duracion?: string;
  precio?: number;
  capacidad_maxima?: number;
  horarios?: string[];
  incluye_materiales?: boolean;
  plato_principal?: string;
  fotos?: string[];
  disponible?: boolean;
}
