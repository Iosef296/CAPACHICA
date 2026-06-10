export interface Festivity {
  id: string;
  name: string;
  month: number;
  day: number;
  endDay?: number;
  description: string;
  location: string;
  category: 'religious' | 'cultural' | 'national' | 'traditional';
  highlights: string[];
  icon: string;
}

export const festivities: Festivity[] = [
  // ── ENERO - FEBRERO ──
  {
    id: 'epifania',
    name: 'Epifanía - Reyes Magos',
    month: 1, day: 6,
    description: 'Celebración de la Epifanía con participación activa de la comunidad de Capachica. Misa solemne y procesión por las calles del pueblo.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Misa solemne', 'Procesión comunitaria', 'Participación de Capachica'],
    icon: '👑',
  },
  {
    id: 'candelaria',
    name: 'Virgen de la Candelaria',
    month: 2, day: 2,
    description: 'Una de las festividades más importantes de la región. Misa, procesión por el lago y danzas tradicionales en honor a la Virgen.',
    location: 'Capachica - Lago Titicaca',
    category: 'religious',
    highlights: ['Procesión por el lago', 'Danzas tradicionales', 'Misa solemne'],
    icon: '🕯️',
  },
  {
    id: 'carnavales-capachica',
    name: 'Carnavales de Capachica',
    month: 2, day: 20, endDay: 25,
    description: 'Celebración con chp\'alla, cortamonte, danzas autóctonas y comparsas. La alegría del pueblo se refleja en cada esquina.',
    location: 'Capachica',
    category: 'cultural',
    highlights: ['Ch\'alla', 'Cortamonte', 'Danzas autóctonas', 'Comparsas'],
    icon: '🎭',
  },

  // ── MAYO ──
  {
    id: 'fiesta-cruz',
    name: 'Fiesta de la Cruz',
    month: 5, day: 3,
    description: 'Celebración religiosa con la Danza de la Triunfal, una de las danzas más representativas de Capachica. La cruz es llevada en procesión.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Danza de la Triunfal', 'Procesión de la Cruz', 'Misa festiva'],
    icon: '✝️',
  },
  {
    id: 'danza-triunfal',
    name: 'Danza de la Triunfal',
    month: 5, day: 3, endDay: 5,
    description: 'Danza emblemática de Capachica presentada durante la Fiesta de la Cruz. Los danzantes visten trajes coloridos con máscaras tradicionales.',
    location: 'Capachica',
    category: 'traditional',
    highlights: ['Trajes coloridos', 'Máscaras tradicionales', 'Música andina', 'Tres días de celebración'],
    icon: '💃',
  },

  // ── JUNIO ──
  {
    id: 'inti-raymi',
    name: 'Ceremonia del Inti Raymi',
    month: 6, day: 21,
    description: 'Ceremonia al dios Sol en el solsticio de invierno. Rituales ancestrales en las orillas del Lago Titicaca agradeciendo al Inti.',
    location: 'Orillas del Lago Titicaca - Capachica',
    category: 'traditional',
    highlights: ['Rituales ancestrales', 'Ofrendas al Sol', 'Ceremonia en el lago', 'Música ceremonial'],
    icon: '☀️',
  },
  {
    id: 'san-juan',
    name: 'San Juan Bautista',
    month: 6, day: 24,
    description: 'Celebración de San Juan con fogatas a la orilla del lago, música andina y comida tradicional. Una noche mágica en Capachica.',
    location: 'Capachica - Lago Titicaca',
    category: 'religious',
    highlights: ['Fogatas en el lago', 'Música andina', 'Comida tradicional', 'Noche de San Juan'],
    icon: '🔥',
  },
  {
    id: 'corpus-christi',
    name: 'Corpus Christi',
    month: 6, day: 19,
    description: 'Procesión solemme con alfombras de flores y aserrín en las calles de Capachica. La comunidad entera participa en la decoración.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Alfombras de flores', 'Procesión solemne', 'Decoración comunitaria'],
    icon: '⛪',
  },

  // ── JULIO ──
  {
    id: 'fiesta-santos',
    name: 'Fiesta de los Santos',
    month: 7, day: 25, endDay: 27,
    description: 'Tres días de celebración en honor a los Santos patronos. Danzas, música, comida típica y la participación de toda la comunidad.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Tres días de fiesta', 'Danzas patronales', 'Comida típica', 'Misa solemne'],
    icon: '🙏',
  },
  {
    id: 'comunidad-llachon',
    name: 'Aniversario de Llachón',
    month: 7, day: 28,
    description: 'Celebración del aniversario de la comunidad de Llachón con actividades culturales, feria gastronómica y presentaciones artísticas.',
    location: 'Llachón - Capachica',
    category: 'cultural',
    highlights: ['Feria gastronómica', 'Actividades culturales', 'Presentaciones artísticas'],
    icon: '🏘️',
  },

  // ── AGOSTO ──
  {
    id: 'pachamama',
    name: 'Ceremonia a la Pachamama',
    month: 8, day: 1,
    description: 'Ritual ancestral de agradecimiento a la Madre Tierra. Ofrendas, pago a la tierra y ceremonias en los cerros sagrados de Capachica.',
    location: 'Cerros sagrados - Capachica',
    category: 'traditional',
    highlights: ['Ritual ancestral', 'Ofrendas a la tierra', 'Ceremonia en los cerros', 'Pago a la Pachamama'],
    icon: '🌍',
  },
  {
    id: 'virgen-asuncion',
    name: 'Virgen de la Asunción',
    month: 8, day: 15,
    description: 'Fiesta patronal con procesión, danzas y celebración comunitaria. Una de las fiestas más esperadas del año en Capachica.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Procesión patronal', 'Danzas festivas', 'Celebración comunitaria'],
    icon: '🕊️',
  },

  // ── SEPTIEMBRE ──
  {
    id: 'primavera',
    name: 'Fiesta de la Primavera',
    month: 9, day: 21,
    description: 'Celebración del inicio de la primavera con actividades culturales y la belleza del Lago Titicaca en su esplendor.',
    location: 'Capachica - Lago Titicaca',
    category: 'cultural',
    highlights: ['Actividades culturales', 'Belleza del lago', 'Celebración primaveral'],
    icon: '🌸',
  },

  // ── OCTUBRE ──
  {
    id: 'senor-milagros',
    name: 'Señor de los Milagros',
    month: 10, day: 18,
    description: 'Procesión del Señor de los Milagros con fervor religioso. Los fieles acompañan la imagen por las calles de Capachica.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Procesión religiosa', 'Fervor comunitario', 'Misa solemne'],
    icon: '✝️',
  },

  // ── NOVIEMBRE ──
  {
    id: 'todos-santos',
    name: 'Día de Todos los Santos',
    month: 11, day: 1,
    description: 'Visita al cementerio con ofrendas, flores y velas. Las familias preparan panes y comida típica para recibir a las almas.',
    location: 'Cementerio de Capachica',
    category: 'religious',
    highlights: ['Visita al cementerio', 'Ofrendas florales', 'Panes tradicionales', 'Velas encendidas'],
    icon: '🕯️',
  },
  {
    id: 'dia-difuntos',
    name: 'Día de los Difuntos',
    month: 11, day: 2,
    description: 'Actividades en el cementerio con misa, música y la tradición de acompañar a los difuntos. Noche de vigilia comunitaria.',
    location: 'Cementerio de Capachica',
    category: 'religious',
    highlights: ['Misa en el cementerio', 'Vigilia comunitaria', 'Música fúnebre', 'Tradición ancestral'],
    icon: '🪔',
  },

  // ── DICIEMBRE ──
  {
    id: 'inmaculada',
    name: 'Inmaculada Concepción',
    month: 12, day: 8,
    description: 'Celebración con misa, procesión y el inicio de las festividades navideñas en Capachica.',
    location: 'Capachica',
    category: 'religious',
    highlights: ['Misa solemne', 'Procesión', 'Inicio navideño'],
    icon: '🌟',
  },
  {
    id: 'novena',
    name: 'Novena de Navidad',
    month: 12, day: 16, endDay: 24,
    description: 'Nueve noches de oración, villancicos y chocolate caliente en las casas de Capachica. Tradición que une a toda la comunidad.',
    location: 'Hogares de Capachica',
    category: 'traditional',
    highlights: ['Villancicos andinos', 'Chocolate caliente', 'Oraciones comunitarias', 'Nacimiento'],
    icon: '🎶',
  },
  {
    id: 'navidad',
    name: 'Navidad en Capachica',
    month: 12, day: 25,
    description: 'Celebración del nacimiento del Niño Jesús con misa de gallo, cena familiar y la alegría del pueblo junto al Lago Titicaca.',
    location: 'Capachica',
    category: 'national',
    highlights: ['Misa de gallo', 'Cena familiar', 'Música andina', 'Pesebre comunitario'],
    icon: '🎄',
  },
];

export function getNextFestivity(fromDate: Date = new Date()) {
  const currentYear = fromDate.getFullYear();
  const sorted = festivities
    .map((f) => {
      const d = new Date(currentYear, f.month - 1, f.day);
      if (d < fromDate) d.setFullYear(currentYear + 1);
      const daysUntil = Math.ceil((d.getTime() - fromDate.getTime()) / 86400000);
      return { festivity: f, daysUntil, dateThisYear: d };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil);
  return sorted[0] || null;
}

export function getFestivitiesByMonth(month: number) {
  return festivities.filter((f) => f.month === month);
}

export function getAllSorted() {
  return [...festivities].sort((a, b) => a.month !== b.month ? a.month - b.month : a.day - b.day);
}