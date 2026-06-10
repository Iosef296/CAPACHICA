import React from 'react';
import { ThemeProvider } from './ThemeContext';
import FestividadesNavbar from './FestividadesNavbar';
import StarrySky from './StarrySky';
import FestividadesFooter from './FestividadesFooter';
import Festividades from './Festividades';

export default function FestividadesPageWrapper() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-night-950 text-gray-900 dark:text-white transition-colors duration-500">
        <StarrySky />
        <FestividadesNavbar />
        <main><Festividades /></main>
        <FestividadesFooter />
      </div>
    </ThemeProvider>
  );
}
