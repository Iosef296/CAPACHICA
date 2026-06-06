import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Calendar, Filter } from 'lucide-react';
import FestividadCard from '../components/FestividadCard';
import { getFestividades } from '../api';

const meses = [
  { value: 0, label: 'Todos' },
  { value: 2, label: 'Febrero' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 11, label: 'Noviembre' }
];

const tipos = ['Todos', 'Religiosa', 'Ceremonial', 'Tradicional'];

export default function Festividades() {
  const [festividades, setFestividades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mesFiltro, setMesFiltro] = useState(0);
  const [tipoFiltro, setTipoFiltro] = useState('Todos');
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFestividades()
      .then(data => { setFestividades(data); setLoading(false); })
      .catch(() => { setFestividades([]); setLoading(false); });
  }, []);

  const filtradas = useMemo(() => {
    return festividades.filter(f => {
      const coincideBusqueda = f.nombre.toLowerCase().includes(busqueda.toLowerCase()) || f.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      const coincideMes = mesFiltro === 0 || f.mes === mesFiltro;
      const coincideTipo = tipoFiltro === 'Todos' || f.tipo === tipoFiltro;
      return coincideBusqueda && coincideMes && coincideTipo;
    });
  }, [festividades, busqueda, mesFiltro, tipoFiltro]);

  const limpiarFiltros = () => { setBusqueda(''); setMesFiltro(0); setTipoFiltro('Todos'); };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-white dark:bg-night-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-sm font-semibold mb-4">
            <Calendar size={14} className="inline mr-1" />Calendario Festivo
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-3 text-gray-900 dark:text-white">
            Nuestras <span className="text-gradient-gold">Festividades</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Explora las celebraciones ancestrales de Capachica.</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Buscar festividades..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-night-700 bg-gray-50 dark:bg-night-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all" />
              {busqueda && <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={16} /></button>}
            </div>
            <button onClick={() => setFiltrosOpen(!filtrosOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all ${filtrosOpen ? 'border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400' : 'border-gray-200 dark:border-night-700 bg-gray-50 dark:bg-night-800 text-gray-600 dark:text-gray-300'}`}>
              <SlidersHorizontal size={18} />Filtros
            </button>
          </div>

          {filtrosOpen && (
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-night-800 border border-gray-200 dark:border-night-700 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"><Filter size={14} className="inline mr-1" />Filtrar por Mes</label>
                  <div className="flex flex-wrap gap-2">
                    {meses.map(m => (
                      <button key={m.value} onClick={() => setMesFiltro(m.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${mesFiltro === m.value ? 'bg-gold-500 text-black' : 'bg-white dark:bg-night-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-night-600 hover:border-gold-500'}`}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"><Filter size={14} className="inline mr-1" />Filtrar por Tipo</label>
                  <div className="flex flex-wrap gap-2">
                    {tipos.map(t => (
                      <button key={t} onClick={() => setTipoFiltro(t)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${tipoFiltro === t ? 'bg-gold-500 text-black' : 'bg-white dark:bg-night-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-night-600 hover:border-gold-500'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={limpiarFiltros} className="mt-4 text-sm text-gold-600 dark:text-gold-400 hover:underline">Limpiar filtros</button>
            </div>
          )}
        </div>

        <div className="mb-4"><p className="text-sm text-gray-500 dark:text-gray-400">{filtradas.length} festividad{filtradas.length !== 1 ? 'es' : ''} encontrada{filtradas.length !== 1 ? 's' : ''}</p></div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : filtradas.length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron festividades</p>
            <button onClick={limpiarFiltros} className="mt-4 text-gold-600 dark:text-gold-400 hover:underline text-sm">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtradas.map(f => <FestividadCard key={f.id} festividad={f} />)}
          </div>
        )}
      </div>
    </div>
  );
}