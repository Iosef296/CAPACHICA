import React from 'react';
import { ThemeProvider } from './ThemeContext';
import StarrySky from './StarrySky';
import Festividades from './Festividades';

export default function FestividadesContent() {
  return (
    <ThemeProvider>
      <StarrySky />
      <Festividades />
    </ThemeProvider>
  );
}
