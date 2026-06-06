import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ChevronLeft, ChevronRight, X, Sparkles, Users, Music } from 'lucide-react';
import { getFestividad } from '../api';

export default function FestividadDetail() {
  const { id } = useParams();
  const [festividad, setFestividad] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFestividad(id)
      .then(data => { setFestividad(data); setLoading(false); })
      .catch(() => { setFestividad(null); setLoading(false); });
  }, [id]);

  if (loading) return <div className="pt-24 min-h-screen flex items-center justify-center bg-white dark:bg-night-950"><div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>;

  if (!festividad) return (
    <div className="pt-24 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-night-950">
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">Festividad no encontrada</p>
      <Link to="/festividades" className="text-gold-500 hover:underline">Volver a festividades</Link>
    </div>
  );

  const galeria = festividad.galeria || [];
  const allImages = [festividad.imagen, ...galeria];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-white dark:bg-night-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <Link to="/festividades" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 mb-6 transition-colors">
          <ArrowLeft size={16} />Volver a festividades
        </Link>

        <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 mb-8 group">
          <img src={allImages[imgIndex]} alt={festividad.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {allImages.length > 1 && (
            <>
              <button onClick={() => setImgIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"><ChevronLeft size={20} /></button>
              <button onClick={() => setImgIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"><ChevronRight size={20} /></button>
            </>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge bg-gold-500 text-black">{festividad.tipo}</span>
              {festividad.destacado && <span className="badge bg-white/20 text-white"><Sparkles size={12} className="mr-1" />Destacado</span>}
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white drop-shadow-lg">{festividad.nombre}</h1>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {allImages.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? 'bg-gold-400 w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-display font-bold text-2xl mb-4 text-gray-900 dark:text-white">Sobre esta Festividad</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{festividad.descripcion}</p>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white"><Music size={18} className="inline mr-2 text-gold-500" />Actividades Principales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {festividad.actividades?.map((act, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-night-800 border border-gray-200 dark:border-night-700">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-500 font-bold text-sm">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{act}</span>
                </div>
              ))}
            </div>
            {galeria.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Galeria de Fotos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {galeria.map((img, i) => (
                    <div key={i} className="gallery-img rounded-xl overflow-hidden h-40" onClick={() => { setImgIndex(i + 1); setLightbox(true); }}>
                      <img src={img} alt={`Galeria ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-night-800 border border-gray-200 dark:border-night-700 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Detalles</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><Calendar size={18} className="text-gold-500 mt-0.5 flex-shrink-0" /><div><p className="text-xs text-gray-500 dark:text-gray-400">Fecha</p><p className="font-medium text-gray-900 dark:text-white">{festividad.fecha}</p></div></div>
                <div className="flex items-start gap-3"><MapPin size={18} className="text-lake-500 mt-0.5 flex-shrink-0" /><div><p className="text-xs text-gray-500 dark:text-gray-400">Ubicacion</p><p className="font-medium text-gray-900 dark:text-white">{festividad.ubicacion}</p></div></div>
                <div className="flex items-start gap-3"><Users size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" /><div><p className="text-xs text-gray-500 dark:text-gray-400">Tipo</p><p className="font-medium text-gray-900 dark:text-white">{festividad.tipo}</p></div></div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-night-700">
                <Link to="/calendario" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-black font-semibold text-sm transition-all"><Calendar size={16} />Ver en Calendario</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(false)}>
          <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(false)} className="absolute -top-10 right-0 text-white hover:text-gold-400"><X size={28} /></button>
            <img src={allImages[imgIndex]} alt="Vista ampliada" className="w-full rounded-xl" />
            <div className="flex justify-between mt-4">
              <button onClick={() => setImgIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft size={24} /></button>
              <span className="text-white text-sm self-center">{imgIndex + 1} / {allImages.length}</span>
              <button onClick={() => setImgIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0)} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}