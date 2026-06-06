import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StarrySky from './components/StarrySky';
import Footer from './components/Footer';
import Home from './pages/Home';
import Festividades from './pages/Festividades';
import FestividadDetail from './pages/FestividadDetail';
import Admin from './pages/Admin';
import Calendario from './pages/Calendario';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-night-950 text-gray-900 dark:text-white transition-colors duration-500">
      <StarrySky />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/festividades" element={<Festividades />} />
          <Route path="/festividades/:id" element={<FestividadDetail />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}