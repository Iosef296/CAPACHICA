import React from 'react';
import { ThemeProvider } from './ThemeContext';
import Navbar from '../Navbar';
import StarrySky from './StarrySky';
import Footer from '../Footer';
import Festividades from './Festividades';

export default function FestividadesPageWrapper() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-night-950 text-gray-900 dark:text-white transition-colors duration-500">
        <StarrySky />
        <Navbar />
        <main><Festividades /></main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
