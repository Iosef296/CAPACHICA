import React from 'react';
import { ThemeProvider } from './ThemeContext';
import StarrySky from './StarrySky';
import Calendario from './Calendario';

export default function CalendarioContent() {
  return (
    <ThemeProvider>
      <StarrySky />
      <Calendario />
    </ThemeProvider>
  );
}
