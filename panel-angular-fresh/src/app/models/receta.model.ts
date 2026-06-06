// src/app/models/receta.model.ts

export interface Receta {
  id: string;
  plato_id: string;
  titulo: string;
  descripcion?: string | null;
  ingredientes_detallados: string[];
  pasos: string[];
  tiempo_preparacion?: string | null;
  dificultad?: string | null;
  pdf_url?: string | null;
  video_url?: string | null;
  foto?: string | null;
  created_at: Date;
  updated_at: Date;
}
