export interface Destino {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  categoria: string
  comunidad: string
  destacado: boolean
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Alojamiento {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  tipo: string
  precio_noche: number
  capacidad: number
  comunidad: string
  contacto: string
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Gastronomia {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  ingredientes: string
  tipo: string
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Actividad {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  tipo: string
  duracion: string
  dificultad: string
  precio: number
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Artesania {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  tipo: string
  artesano: string
  comunidad: string
  precio: number
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Festividad {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  fecha_texto: string
  mes: number
  comunidad: string
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface Vivencial {
  id: number
  nombre: string
  descripcion: string
  imagen_url: string
  familia: string
  comunidad: string
  actividades_incluidas: string
  precio_por_noche: number
  activo: boolean
  orden: number
  created_at: string
  updated_at: string
}

export interface ContactoForm {
  nombre: string
  email: string
  telefono?: string
  asunto?: string
  mensaje: string
}

export interface User {
  id: number
  email: string
  nombre: string
  role: string
}
