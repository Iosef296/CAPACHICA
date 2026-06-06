// src/app/models/plato.model.ts

export interface Plato {
  id: string;
  restaurante_id: string;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  foto?: string | null;
  ingredientes: string[];
  categoria?: string | null;
  temporada?: string | null;
  disponible: boolean;
  es_recomendado: boolean;
  created_at: Date;
  updated_at: Date;
}
