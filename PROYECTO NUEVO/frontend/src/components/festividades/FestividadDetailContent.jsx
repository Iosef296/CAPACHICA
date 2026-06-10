import React from 'react';
import { ThemeProvider } from './ThemeContext';
import StarrySky from './StarrySky';
import FestividadDetail from './FestividadDetail';

export default function FestividadDetailContent({ id }) {
  return (
    <ThemeProvider>
      <StarrySky />
      <FestividadDetail id={id} />
    </ThemeProvider>
  );
}
