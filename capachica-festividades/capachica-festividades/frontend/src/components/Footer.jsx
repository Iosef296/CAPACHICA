import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-night-900 border-t border-gray-200 dark:border-night-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-gold-500" />
              <span className="font-display font-bold text-lg text-gradient-gold">Capachica</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Descubre las festividades y la cultura viva de la peninsula de Capachica en las orillas del Lago Titicaca, Puno.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Explorar</h4>
            <div className="flex flex-col gap-2">
              <Link to="/festividades" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 transition-colors">Festividades</Link>
              <Link to="/calendario" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 transition-colors">Calendario</Link>
              <Link to="/admin" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 transition-colors">Administrar</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Contacto</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><Phone size={14} />+51 51 123 456</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><Mail size={14} />info@capachica.pe</div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><MapPin size={14} />Capachica, Puno, Peru</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Redes Sociales</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-night-700 hover:bg-gold-500 hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400"><Facebook size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-night-700 hover:bg-gold-500 hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400"><Instagram size={18} /></a>
              <a href="#" className="p-2 rounded-full bg-gray-200 dark:bg-night-700 hover:bg-gold-500 hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-400"><Twitter size={18} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-night-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">2024 Capachica - Peninsula del Lago Titicaca. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Hecho con amor en Puno, Peru</p>
        </div>
      </div>
    </footer>
  );
}