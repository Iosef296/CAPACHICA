import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Sparkles } from 'lucide-react';

export default function FestividadCard({ festividad }) {
  const tipoColor = {
    Religiosa: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    Ceremonial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    Tradicional: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  };
  const colorClass = tipoColor[festividad.tipo] || tipoColor.Tradicional;

  return (
    <div className="card-festividad rounded-2xl bg-white dark:bg-night-800 border border-gray-200 dark:border-night-700 overflow-hidden group">
      <div className="relative h-52 overflow-hidden">
        <img src={festividad.imagen} alt={festividad.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`badge ${colorClass}`}>{festividad.tipo}</span>
        </div>
        {festividad.destacado && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-gold-500 text-black animate-glow-pulse">
              <Sparkles size={12} className="mr-1" />Destacado
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-xl text-white drop-shadow-lg">{festividad.nombre}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} className="text-gold-500" />{festividad.fecha}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={14} className="text-lake-500" />{festividad.ubicacion}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{festividad.descripcion}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {festividad.actividades?.slice(0, 3).map((act, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-night-700 text-gray-600 dark:text-gray-400">{act}</span>
          ))}
          {festividad.actividades?.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400">+{festividad.actividades.length - 3} mas</span>
          )}
        </div>
        <Link to={`/festividades/${festividad.id}`} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-black font-semibold text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold-500/20">
          Explorar <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}