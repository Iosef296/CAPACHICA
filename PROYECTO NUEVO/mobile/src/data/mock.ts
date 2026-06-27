// Mock data — reemplazar por llamadas reales cuando el backend exista.
// Estructura compatible con los HTML originales de Stitch.

export type Recommendation = {
  id: string;
  title: string;
  badge: string;
  badgeTone: 'primary' | 'tertiary';
  rating: { value: number; reviews: number };
  image: string;
};

export type Highlight = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
};

export type Story = { id: string; name: string; image: string };

export type Community = {
  id: string;
  name: string;
  description: string;
  image: string;
  experiencesCount: number;
};

export const stories: Story[] = [
  { id: '1', name: 'María P.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5qZaFCplLpEuyOtEI92lZBsyH0Aw6nZWpdR5y6cgI2dj2ZvOcVJQ33dlOzMMkdnoklh6PrtNUl8wY8k5Y9HRnfTSBTJKS1Q6tdEkt0gMXuhGdEEfl1Vl_RaWyvXOjKLwXevONlo8Mt-IT5tHIJReqZdAjZXNC1AWpFYFaVwhRqI1loH3tK-0Up1rPitP4tWmQvVoT3MMpADTeRLot3SmNWPgI2zGgd-skHr20YsaR9UffjxladYuLkOulF3BtjRIva50ys20C-n8' },
  { id: '2', name: 'Carlos R.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjH_q_Cjvs_GNEgTBOoQenILcRnnvj-40zd6p9eqQGtBVgx9hwkd4LZl7hEJWEZxyxiM82W_-0fRjI1fK5MR7_Srmwxe5moV8Trkca1-KBYChPnJNWCbKxlpUlTIBmz_xIIHWR5J2svfq1Ttjwo407kS6YRGq6ERRwbG5s9WqJMHe_wNOrvScretpx9falIA2ns_wnbaseJDJFoKhSIWHikBRwmzmqjYau0VBEkiGc3wlvZM1dzq5AQ505yVFLRzF2QWwG58JY6kY' },
  { id: '3', name: 'Elena J.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUDAXVYFT4TcEcu5w9PYgMcRod9E54lTIK_qlHfoqHjqUb4SvYEE75bWQL2QBgd8mbYKJ6SOxn4R67-VEueXCBBkfKOphxyJ1XRKCEbNiT8TtMhTQNws5Hz9cUkPrDkA0al4EEY6vsox-vdgPNWFX7M_B5OvEnJf7CnmiFt0oQ_8haue27O7ZA1hEsZ5UhWGTk2zzlbVc42FW4kodAto0qg4KNmmcen5Ac9tXPwAmYPu9NWqS40qJDNmHPUfsMZZdCsQnePr5Saao' },
  { id: '4', name: 'Julian W.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW1DyLbKp8KId55dLrgxnPeu7EY5BMki5xA7G2492QVyxR6hqjJsijoRwyXYDAp-GWlsrYEP__6GoKXhJFeSc5rjAzYmsR-GQrMX1ChKwXaKupajkqXBT6ZA0APQuXY2RvZTji6jmzoqlPY0ShARY8N8AElz9rEM_c3kW9inSCVu1M9tfXI-pim7ONR4UOIHIlNdZ1dFzpL33yrnQK5GEY_DW18xsEuJBS4sM-og0UHgeF0R08Lqml3eSpiWqaUHZmWQBUiEV9drs' },
  { id: '5', name: 'Santi M.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPPBewFtB_hu_8zFAlmTt7MGm4PlIT8a75UXoZzrGfZzO5gcdfHuOItoKDKvESZsHJxoJU4pGnqLtIlgx3yANVm7FNl2b8f_OUiJzxAcF1uvmTqLQhlom10HPCDnjMpIZ_ntvhnNQMnm5oe3MPVbNqbla2wL-4TK5x0c6GRtoeBb9ay6I18TvGsPLd7o5egerO6X4vzOJEBiV6WpKAPI3OdeyADGxEOMj4JIB7a7R2AbukAkYUnhINfu-2rIIoFhKXpNz78-PhZPw' },
];

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    title: 'Estancia Inti Wara',
    badge: 'CULTURA VIVA',
    badgeTone: 'tertiary',
    rating: { value: 4.9, reviews: 120 },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgnkeI29kBBo2SOVvIC_A7jeW7hOk6g19xw5S-k8oB5F1fSPS-w6ExRwEhBs6E-z7kf50Gnj69Zx36m9-1Zuv7duqXDOrVIQzhCkxVduFgB5u7ncNt1DIdPldyokKOHxzEPU1XqVL84n0TQ8OJlkVb7P2Run2fGdJdd62hAOuoq61zAhfdTLWDzXWIbw8EbFpEprCMoB6o4dAjuPPqW3rQ0pCiBSgu28SlMsKGYOKw1aQJ6QmIY5YWcEJh4rijN-_nBiBCRvtRdxY',
  },
  {
    id: 'r2',
    title: 'Taller de Tejido Llachón',
    badge: 'TEXTILERÍA',
    badgeTone: 'primary',
    rating: { value: 4.8, reviews: 85 },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeFBKL5dQMERCdTbShRG4gwcxv5H3zMhK1_JP8jx8LFVxXgOl085H3UaiacKiTMviMtxUg8OwgkDQUr_ReZ3bE-yHOnvEB3wLYQTFgcUnAcRC6lWk2kOdE86kUknTHk58nGqQjou2E5zfDFDf4Q7NyjBT45Q_dvtwdZhziuAplDKk8OV2s6nq1NeRKh-5BnXrgpk79m4aUUvLuKdyzc3mLVOL12W7lYXXIMdDmJk0cRIP-6kPKp9I-pwSkEeZ092qEWOCE4T8ULVI',
  },
];

export const highlights: Highlight[] = [
  {
    id: 'h1',
    category: 'Gastronomía',
    title: 'Trucha Fresca de Ccotos',
    subtitle: 'Prueba la pesca artesanal del día.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKXD5scDmrD2jv-5BJCfOTzcztHMbCjv6WKgfXgzGIWMP4wYeih0pzUs0ym-MM6iMCMwVGSDjdF79Nu3Rwf9Uj9lW1EXkGrH0jTzN9SMV2xr7v0kcTM-gEUk9oY_eFqmS-2ubzRlGPEtFY8SaNOwuKYGnnTaZSIzG_3OHsfFEgu9M2fjdsXAum4PXzeggxcNTlICa6Hwkx7Sv5IxE7B6c9ypqvgnIQ2Z2Kcjaq7VzZ47tw3IjJQpSNprL66qA0YBXXU6qWqgcLto',
  },
  {
    id: 'h2',
    category: 'Aventura',
    title: 'Navegación Ancestral',
    subtitle: 'Explora las orillas ocultas en balsa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtlxKA5QuDZmz_NfXWU9IiZVR9toVX8qU4JobcvU-3ppzUAqzJ24SDOATR6pT4s24bTGYABj0ThXXVSIGGbyiiUIlFOLR_DYx14Z6TCA1WVmLis-Z8GJxpn5D-ZIplDW-Ttk9EeLxtJ6qWkw-QKWo2zH2SELpOsdbl7PJgrbHsNHKhji2KYL4X3IwaWc_rfD0QhpS95Eu2jgJZ54mEi564tMnYnRrV2Z6RjKJp_PNK8JJaBmEyzpebSIkr35rcb7dlv0rSX3Max4c',
  },
];

export const communities: Community[] = [
  { id: 'c1', name: 'Llachón', description: 'Tejidos y vida lacustre.',  image: 'https://picsum.photos/id/1018/800/600', experiencesCount: 12 },
  { id: 'c2', name: 'Ccotos',  description: 'Pesca artesanal de trucha.', image: 'https://picsum.photos/id/1043/800/600', experiencesCount: 8 },
  { id: 'c3', name: 'Siale',   description: 'Caminatas y miradores.',     image: 'https://picsum.photos/id/1015/800/600', experiencesCount: 6 },
];

// Península de Capachica, Puno. Coordenadas reales.
export const capachicaRegion = {
  latitude: -15.6200,
  longitude: -69.8200,
  latitudeDelta: 0.18,
  longitudeDelta: 0.18,
};

export const mapPins = [
  { id: 'p1', title: 'Llachón',          coordinate: { latitude: -15.7203, longitude: -69.7039 } },
  { id: 'p2', title: 'Ccotos',           coordinate: { latitude: -15.6092, longitude: -69.8261 } },
  { id: 'p3', title: 'Capachica Centro', coordinate: { latitude: -15.6428, longitude: -69.8378 } },
  { id: 'p4', title: 'Siale',            coordinate: { latitude: -15.6717, longitude: -69.7572 } },
  { id: 'p5', title: 'Escallani',        coordinate: { latitude: -15.5853, longitude: -69.8156 } },
];

export const hostFamilies = [
  { id: 'f1', name: 'Familia Quispe', community: 'Llachón', img: 'https://picsum.photos/id/1062/600/700' },
  { id: 'f2', name: 'Familia Coila',  community: 'Ccotos',  img: 'https://picsum.photos/id/1027/600/700' },
  { id: 'f3', name: 'Familia Flores', community: 'Chifrón', img: 'https://picsum.photos/id/1011/600/700' },
];

export const stays = [
  { id: 's1', name: 'Posada de Doña Paula', community: 'Llachón', price: 120, img: 'https://picsum.photos/id/106/400/400' },
  { id: 's2', name: 'Eco-Refugio Ccotos',    community: 'Ccotos',  price: 185, img: 'https://picsum.photos/id/164/400/400' },
  { id: 's3', name: 'Hospedaje Samary',     community: 'Chifrón', price: 95,  img: 'https://picsum.photos/id/137/400/400' },
];

export const activities = [
  { id: 'a1', name: 'Kayak al Atardecer',    duration: '2h', price: 45, img: 'https://picsum.photos/id/110/600/400' },
  { id: 'a2', name: 'Taller de Tejido',      duration: '4h', price: 60, img: 'https://picsum.photos/id/177/600/400' },
  { id: 'a3', name: 'Pachamanca Ritual',     duration: '3h', price: 55, img: 'https://picsum.photos/id/431/600/400' },
  { id: 'a4', name: 'Pesca Tradicional',     duration: '3h', price: 40, img: 'https://picsum.photos/id/115/600/400' },
];

export const dishes = [
  { id: 'd1', name: 'Trucha a la Plancha',     desc: 'Pesca fresca con papas nativas.', tipo: 'Platos Fuertes',  img: 'https://picsum.photos/id/292/800/600' },
  { id: 'd2', name: 'Pachamanca Capachiqueña', desc: 'Ritual de cocción bajo tierra.',  tipo: 'Tradición Viva',  img: 'https://picsum.photos/id/425/800/600' },
  { id: 'd3', name: 'Caldo de Carachi',        desc: 'Peces nativos y chuchoca.',       tipo: 'Sopas',           img: 'https://picsum.photos/id/365/800/600' },
  { id: 'd4', name: 'Sopa de Quinua',          desc: 'Caldo de quinua negra del altiplano.', tipo: 'Sopas',      img: 'https://picsum.photos/id/431/800/600' },
  { id: 'd5', name: 'Chairo Andino',           desc: 'Guiso de cordero con chuño.',      tipo: 'Platos Fuertes', img: 'https://picsum.photos/id/461/800/600' },
];

export const crafts = [
  { id: 'cr1', name: 'Poncho Ceremonial',     price: 240, img: 'https://picsum.photos/id/175/600/600' },
  { id: 'cr2', name: 'Chumpi Tradicional',    price: 95,  img: 'https://picsum.photos/id/325/600/600' },
  { id: 'cr3', name: 'Chullo de Gala',        price: 70,  img: 'https://picsum.photos/id/30/600/600' },
];

export const masters = [
  { id: 'm1', name: 'Mamá Victoria',  craft: 'Alpaca',  img: 'https://i.pravatar.cc/300?img=44' },
  { id: 'm2', name: 'Mateo Huatta',   craft: 'Chumpis', img: 'https://i.pravatar.cc/300?img=68' },
];

export const guides = [
  { id: 'g1', title: 'Historia de Capachica', excerpt: 'Mil años de tradición lacustre.', img: 'https://picsum.photos/id/1018/800/500' },
  { id: 'g2', title: 'Mitos del Titicaca',    excerpt: 'Manco Cápac y Mama Ocllo.',       img: 'https://picsum.photos/id/1043/800/500' },
  { id: 'g3', title: 'Cómo llegar',           excerpt: 'Rutas desde Puno y Juliaca.',     img: 'https://picsum.photos/id/1015/800/500' },
];

export const profile = {
  name: 'Cristofer Dua',
  handle: '@viajero_ancestral',
  bio: 'Explorador de saberes andinos y rutas lacustres.',
  avatar: 'https://i.pravatar.cc/300?img=12',
  stats: { trips: 8, reviews: 14, badges: 5 },
};
