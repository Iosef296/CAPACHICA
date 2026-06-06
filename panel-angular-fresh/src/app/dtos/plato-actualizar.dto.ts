export interface ActualizarPlatoDTO {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  foto?: string;
  ingredientes?: string[];
  categoria?: 'del_lago' | 'ancestral' | 'bebidas' | 'postres';
  temporada?: 'todo_el_año' | 'verano' | 'invierno';
  disponible?: boolean;
  es_recomendado?: boolean;
}
