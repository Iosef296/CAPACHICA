import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Sparkles, ArrowDown, Mountain, Waves } from 'lucide-react';
import FestividadCard from '../components/FestividadCard';
import { getFestividades } from '../api';

export default function Home() {
  const [festividades, setFestividades] = useState([]);

  useEffect(() => {
    getFestividades()
      .then(data => setFestividades(data))
      .catch(() => setFestividades([]));
  }, []);

  const destacadas = festividades.filter(f => f.destacado);

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-night-950 via-night-900 to-night-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://picsum.photos/seed/titicaca/1920/1080")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-900/60 to-night-800/90" />
        <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-gold-400 animate-float opacity-60" />
        <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-lake-400 animate-float opacity-40" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-6 animate-fade-in">
            <Mountain size={16} />Peninsula de Capachica<Waves size={16} />
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 animate-slide-up">
            <span className="text-white">Festividades</span><br />
            <span className="text-gradient-gold">y Cultura Viva</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Descubre las celebraciones ancestrales de Capachica en las orillas del Lago Titicaca. Tradicion, fe y cosmovision andina en cada festividad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/festividades" className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-600 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/30">
              <Calendar size={20} />Ver Festividades<ChevronRight size={18} />
            </Link>
            <Link to="/calendario" className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold transition-all duration-300 hover:bg-white/5">
              <Sparkles size={20} />Calendario
            </Link>
          </div>
          <div className="mt-16 animate-bounce text-gray-400"><ArrowDown size={24} /></div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white dark:bg-night-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 text-sm font-semibold mb-4">No te lo pierdas</span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white">
              Festividades <span className="text-gradient-gold">Destacadas</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Las celebraciones mas importantes de Capachica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacadas.map(f => <FestividadCard key={f.id} festividad={f} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/festividades" className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-semibold hover:gap-3 transition-all duration-300">
              Ver todas las festividades <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 dark:bg-night-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-lake-500/10 text-lake-600 dark:text-lake-400 text-sm font-semibold mb-4">Nuestra Tierra</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 text-gray-900 dark:text-white">
                Capachica: Joya del <span className="text-gradient-lake">Lago Titicaca</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">La peninsula de Capachica se encuentra en la region de Puno, Peru, a orillas del majestuoso Lago Titicaca, el lago navegable mas alto del mundo a 3,812 m.s.n.m.</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Sus comunidades conservan tradiciones ancestrales que se manifiestan en coloridas festividades y una cosmovision andina unica.</p>
              <div className="flex gap-4">
                <div className="text-center px-4 py-3 rounded-xl bg-white dark:bg-night-800 border border-gray-200 dark:border-night-700">
                  <div className="text-2xl font-bold text-gradient-gold">6+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Festividades</div>
                </div>
                <div className="text-center px-4 py-3 rounded-xl bg-white dark:bg-night-800 border border-gray-200 dark:border-night-700">
                  <div className="text-2xl font-bold text-gradient-lake">3812</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">m.s.n.m.</div>
                </div>
                <div className="text-center px-4 py-3 rounded-xl bg-white dark:bg-night-800 border border-gray-200 dark:border-night-700">
                  <div className="text-2xl font-bold text-gradient-gold">UNESCO</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Patrimonio</div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-96 shadow-2xl shadow-black/20">
              <img src="https://picsum.photos/seed/laketiticaca/800/600" alt="Lago Titicaca" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-display font-bold">Lago Titicaca</p>
                <p className="text-sm opacity-80">Capachica, Puno</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}