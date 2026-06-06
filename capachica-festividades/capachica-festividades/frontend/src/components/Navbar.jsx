import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import {
  Sun, Moon, Menu, X,
  MapPin, Calendar, Settings, Home as HomeIcon
} from 'lucide-react';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Inicio', icon: <HomeIcon size={18} /> },
    { to: '/festividades', label: 'Festividades', icon: <Calendar size={18} /> },
    { to: '/calendario', label: 'Calendario', icon: <Calendar size={18} /> },
    { to: '/admin', label: 'Admin', icon: <Settings size={18} /> }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-night-900/80 backdrop-blur-md border-b border-gray-200 dark:border-night-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <MapPin size={24} className="text-gold-500" />
          <span className="font-display font-bold text-xl text-gradient-gold">Capachica</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? 'bg-gold-500/20 text-gold-500 dark:text-gold-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-night-700'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-night-700 hover:bg-gray-200 dark:hover:bg-night-600 transition-all duration-300"
          >
            {darkMode ? <Sun size={20} className="text-gold-400 animate-float" /> : <Moon size={20} className="text-lake-700" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-night-700"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-night-900 border-t border-gray-200 dark:border-night-700 animate-fade-in">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border-l-4 border-gold-500'
                  : 'text-gray-600 dark:text-gray-300 border-l-4 border-transparent'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}