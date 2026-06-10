export const familias = [
  {
    id: 1,
    nombre: "Familia Quispe",
    comunidad: "Llachón",
    especialidad: "pesca",
    descripcion:
      "Pescadores artesanales. Pesca artesanal al amanecer en el lago.",
    habitaciones: 2,
    disponible: true,
    calificacion: 4.9,
    idiomas: ["Español", "Aimara"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Pesca al amanecer"],
    precio_noche: 120,
  },
  {
    id: 2,
    nombre: "Familia Mamani",
    comunidad: "Capachica Centro",
    especialidad: "tejido",
    descripcion: "Artesanas de tejidos. Mejor vista al lago Titicaca.",
    habitaciones: 2,
    disponible: true,
    calificacion: 5.0,
    idiomas: ["Español", "Aimara", "Quechua"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Taller de tejido"],
    precio_noche: 120,
  },
  {
    id: 3,
    nombre: "Familia Coila",
    comunidad: "Siale",
    especialidad: "agricultura",
    descripcion: "Agricultores orgánicos. Siembra de quinua y papas nativas.",
    habitaciones: 3,
    disponible: false,
    calificacion: 4.8,
    idiomas: ["Español", "Quechua"],
    servicios: ["Desayuno", "Almuerzo", "Cena", "Siembra de quinua"],
    precio_noche: 120,
  },
];

export const timeline = [
  {
    hora: "6:00 am",
    icono: "🌅",
    titulo: "Amanecer en el lago",
    desc: "Observa el amanecer sobre el Titicaca junto a la familia",
  },
  {
    hora: "7:30 am",
    icono: "🎣",
    titulo: "Pesca artesanal",
    desc: "Aprende a pescar con técnicas ancestrales de totora",
  },
  {
    hora: "9:00 am",
    icono: "🍽️",
    titulo: "Desayuno andino",
    desc: "Desayuno tradicional con productos locales de la chacra",
  },
  {
    hora: "11:00 am",
    icono: "🪡",
    titulo: "Tejido y artesanía",
    desc: "Aprende tejido en telar de cintura o bordado andino",
  },
  {
    hora: "1:00 pm",
    icono: "🌿",
    titulo: "Almuerzo y chacra",
    desc: "Almuerzo con quinua y papas nativas, visita a los cultivos",
  },
  {
    hora: "7:00 pm",
    icono: "🌟",
    titulo: "Fogón y estrellas",
    desc: "Cena junto al fogón, música andina y cielo estrellado",
  },
];

export const PRECIO_POR_PERSONA_NOCHE = 120;
