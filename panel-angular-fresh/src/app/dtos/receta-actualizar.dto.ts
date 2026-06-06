export interface ActualizarRecetaDTO {
  titulo?: string;
  descripcion?: string;
  ingredientes_detallados?: string[];
  pasos?: string[];
  tiempo_preparacion?: string;
  dificultad?: 'fácil' | 'medio' | 'difícil';
  pdf_url?: string;
  video_url?: string;
  foto?: string;
}
