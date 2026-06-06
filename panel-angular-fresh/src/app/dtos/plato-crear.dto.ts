export interface CrearPlatoDTO {
  restaurante_id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  foto?: string;
  ingredientes?: string[];
  categoria?: 'del_lago' | 'ancestral' | 'bebidas' | 'postres';
  temporada?: 'todo_el_año' | 'verano' | 'invierno';
  es_recomendado?: boolean;
}
