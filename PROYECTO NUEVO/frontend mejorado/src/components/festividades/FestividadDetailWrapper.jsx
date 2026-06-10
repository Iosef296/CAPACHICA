import React from 'react';
import { ThemeProvider } from './ThemeContext';
import FestividadesNavbar from './FestividadesNavbar';
import StarrySky from './StarrySky';
import FestividadesFooter from './FestividadesFooter';
import FestividadDetail from './FestividadDetail';

export default function FestividadDetailWrapper({ id }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-night-950 text-gray-900 dark:text-white transition-colors duration-500">
        <StarrySky />
        <FestividadesNavbar />
        <main><FestividadDetail id={id} /></main>
        <FestividadesFooter />
      </div>
    </ThemeProvider>
  );
}
