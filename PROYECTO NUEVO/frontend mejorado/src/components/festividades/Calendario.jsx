import React, { useState, useEffect } from 'react';
import { Link, ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import { getFestividades } from '../../services/festividades.api.js';

const NOMBRES_MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'];

export default function Calendario() {
  const [festividades, setFestividades] = useState([]);
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());

  useEffect(() => { getFestividades().then(data => setFestividades(data)).catch(() => setFestividades([])); }, []);

  const festMes = festividades.filter(f => f.mes === mesActual + 1);
  const primerDia = new Date(anioActual, mesActual, 1).getDay();
  const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate();
  const diaInicio = primerDia === 0 ? 6 : primerDia - 1;

  const mesAnterior = () => { if (mesActual === 0) { setMesActual(11); setAnioActual(prev => prev - 1); } else { setMesActual(prev => prev - 1); } };
  const mesSiguiente = () => { if (mesActual === 11) { setMesActual(0); setAnioActual(prev => prev + 1); } else { setMesActual(prev => prev + 1); } };

  const celdas = [];
  for (let i = 0; i < diaInicio; i++) celdas.push(<div key={`empty-${i}`} className="h-12" />);
  for (let dia = 1; dia <= diasEnMes; dia++) {
    const hasEvent = festMes.some(f => parseInt(f.fecha.match(/\d+/)?.[0] || '0') === dia);
    celdas.push(
      <div key={dia} className={`cal-day h-12 flex items-center justify-center rounded-xl text-sm font-medium relative ${hasEvent ? 'bg-gold-500/20 text-gold-600 dark:text-gold-400 border border-gold-500/30' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-night-800'}`}>
        {dia}
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-white dark:bg-night-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-sm font-semibold mb-4"><CalIcon size={14} className="inline mr-1" />Calendario Interactivo</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-3 text-gray-900 dark:text-white">Calendario <span className="text-gradient-gold">Festivo</span></h1>
          <p className="text-gray-500 dark:text-gray-400">Navega por los meses para ver las festividades</p>
        </div>

        <div className="flex items-center justify-between mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-night-800 border border-gray-200 dark:border-night-700">
          <button onClick={mesAnterior} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-night-700"><ChevronLeft size={20} /></button>
          <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">{NOMBRES_MESES[mesActual]} {anioActual}</h2>
          <button onClick={mesSiguiente} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-night-700"><ChevronRight size={20} /></button>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-night-700 overflow-hidden mb-8">
          <div className="grid grid-cols-7 bg-gray-100 dark:bg-night-800">
            {DIAS_SEMANA.map(dia => <div key={dia} className="py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{dia}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 p-2 bg-white dark:bg-night-900">{celdas}</div>
        </div>

        {festMes.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Festividades en {NOMBRES_MESES[mesActual]}</h3>
            <div className="space-y-3">
              {festMes.map(f => (
                <Link key={f.id} to={`/festividades/${f.id}`} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-night-800 border border-gray-200 dark:border-night-700 hover:border-gold-500/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0"><CalIcon size={20} className="text-gold-500" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-gold-500 transition-colors">{f.nombre}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{f.fecha} · {f.ubicacion}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-gold-500" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {festMes.length === 0 && (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            <CalIcon size={40} className="mx-auto mb-3 opacity-50" />
            <p>No hay festividades en {NOMBRES_MESES[mesActual]}</p>
          </div>
        )}

        <div className="mt-12">
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">Resumen Anual</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {NOMBRES_MESES.map((nombre, i) => {
              const count = festividades.filter(f => f.mes === i + 1).length;
              return (
                <button key={i} onClick={() => setMesActual(i)} className={`p-3 rounded-xl text-center border transition-all ${mesActual === i ? 'border-gold-500 bg-gold-500/10' : 'border-gray-200 dark:border-night-700 hover:border-gold-500/50'}`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{nombre}</p>
                  <p className={`text-2xl font-bold ${count > 0 ? 'text-gold-500' : 'text-gray-300 dark:text-gray-600'}`}>{count}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}