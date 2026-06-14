import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { h as renderTemplate, g as addAttribute, o as renderComponent, p as renderHead } from './server_DrLwvc76.mjs';
import { N as Navbar } from './Navbar_R42--hHp.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Festividades = createComponent(async ($$result, $$props, $$slots) => {
  let festividades = [];
  try {
    const res = await fetch("http://localhost:3000/api/festividades");
    if (res.ok) festividades = await res.json();
  } catch {
  }
  if (!festividades.length) {
    festividades = [
      { id: 1, nombre: "Virgen de la Candelaria", fecha: "1 al 14 de Febrero", mes: 2, tipo: "Religiosa", ubicacion: "Capachica, Puno", descripcion: "Una de las festividades más importantes de la región. Misa, procesión por el lago y danzas tradicionales en honor a la Virgen.", actividades: ["Procesión por el lago", "Danzas tradicionales", "Misa solemne"], imagen: "https://picsum.photos/seed/candelaria/800/500", galeria: ["https://picsum.photos/seed/candel1/600/400", "https://picsum.photos/seed/candel2/600/400"], destacado: true },
      { id: 2, nombre: "Carnavales de Capachica", fecha: "20 al 25 de Febrero", mes: 2, tipo: "Tradicional", ubicacion: "Capachica", descripcion: "Celebración con ch'alla, cortamonte, danzas autóctonas y comparsas.", actividades: ["Ch'alla", "Cortamonte", "Danzas autóctonas"], imagen: "https://picsum.photos/seed/carnavales/800/500", galeria: ["https://picsum.photos/seed/carn1/600/400"], destacado: false },
      { id: 3, nombre: "Inti Raymi", fecha: "21 al 24 de Junio", mes: 6, tipo: "Ceremonial", ubicacion: "Orillas del Lago Titicaca", descripcion: "Ceremonia al dios Sol en el solsticio de invierno. Rituales ancestrales agradeciendo al Inti.", actividades: ["Rituales ancestrales", "Ofrendas al Sol", "Música ceremonial"], imagen: "https://picsum.photos/seed/intiraymi/800/500", galeria: ["https://picsum.photos/seed/inti1/600/400"], destacado: true },
      { id: 4, nombre: "Pachamama Raymi", fecha: "1 al 15 de Agosto", mes: 8, tipo: "Ceremonial", ubicacion: "Cerros sagrados de Capachica", descripcion: "Ritual ancestral de agradecimiento a la Madre Tierra. Ofrendas y ceremonias en los cerros sagrados.", actividades: ["Ofrendas a la tierra", "Ritual del challaco", "Banquete comunitario"], imagen: "https://picsum.photos/seed/pachamama/800/500", galeria: ["https://picsum.photos/seed/pacha1/600/400"], destacado: true },
      { id: 5, nombre: "Día de Todos los Santos", fecha: "1 al 2 de Noviembre", mes: 11, tipo: "Tradicional", ubicacion: "Cementerio de Capachica", descripcion: "Visita al cementerio con ofrendas, flores y velas. Las familias preparan panes tradicionales.", actividades: ["Visita al cementerio", "Ofrendas florales", "Vigilia comunitaria"], imagen: "https://picsum.photos/seed/todossantos/800/500", galeria: ["https://picsum.photos/seed/santos1/600/400"], destacado: false },
      { id: 6, nombre: "Navidad en Capachica", fecha: "25 de Diciembre", mes: 12, tipo: "Religiosa", ubicacion: "Capachica", descripcion: "Misa de gallo, cena familiar y la alegría del pueblo junto al Lago Titicaca.", actividades: ["Misa de gallo", "Cena familiar", "Pesebre comunitario"], imagen: "https://picsum.photos/seed/navidad/800/500", galeria: ["https://picsum.photos/seed/nav1/600/400"], destacado: false }
    ];
  }
  const tipos = ["Todos", ...new Set(festividades.map((f) => f.tipo).filter(Boolean))];
  const NOMBRES_MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const tipoIcon = { Religiosa: "⛪", Ceremonial: "☀️", Tradicional: "💃", Cultural: "🎭", Nacional: "🏛️" };
  const tipoColor = { Religiosa: "#9333ea", Ceremonial: "#f59e0b", Tradicional: "#FF6B35", Cultural: "#3b82f6", Nacional: "#10b981" };
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Festividades · Capachica Turismo</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- HERO --> <section class="hero" id="inicio"> <div class="hero-sky"></div> <canvas class="stars-layer" id="starsCanvas"></canvas> <div class="hero-moon"></div> <div class="hero-sun" id="heroSun"> <div class="sun-rays"></div> <div class="sun-body"></div> </div> <div class="hero-birds" id="heroBirds"></div> <div class="hero-lake"> <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0,30 C200,55 420,5 720,30 C1020,55 1260,10 1440,28 L1440,80 L0,80Z" fill="rgba(20,60,120,0.55)" style="animation:lakeWave 6s ease-in-out infinite;"></path> <path d="M0,48 C260,28 520,62 840,42 C1100,28 1300,58 1440,44 L1440,80 L0,80Z" fill="rgba(15,45,90,0.45)"></path> </svg> <div style="position:absolute;bottom:18px;left:30%;width:35%;height:2px;background:rgba(255,255,255,0.18);border-radius:50%;animation:lakeShimmer 3s ease-in-out infinite;"></div> </div> <div class="hero-content"> <div class="hero-badge">🎉 Festividades · Capachica · Lago Titicaca</div> <h1 class="hero-title">\nCelebraciones\n<em>Ancestrales</em> </h1> <p class="hero-subtitle">\nTradición, fe y cultura viva a orillas del lago más alto del mundo.\n      Cada festividad es una ventana al alma del pueblo capachiquense.\n</p> <div class="hero-ctas"> <a href="#festividades" class="hero-cta-primary">🎉 Ver Festividades</a> <a href="#calendario" class="hero-cta-secondary">📅 Calendario</a> </div> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">', '+</div> <div class="stat-label">Festividades</div> </div> <div class="stat-item"> <div class="stat-val">12</div> <div class="stat-label">Meses activos</div> </div> <div class="stat-item"> <div class="stat-val">500+</div> <div class="stat-label">Años de tradición</div> </div> </div> </div> <div class="hero-wave"> <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0,20 C360,55 720,0 1080,35 C1260,50 1380,15 1440,25 L1440,60 L0,60Z" fill="#0f2240"></path> </svg> </div> </section> <!-- MAIN CONTENT --> <main id="festividades"> <div class="section-header reveal"> <div class="section-eyebrow">Cultura Viva · Capachica</div> <h2 class="section-title">Nuestras Festividades</h2> </div> <!-- FILTER BAR --> <div class="filter-bar" id="filterBar"> <div class="filter-group"> <span class="filter-label">Mes</span> <button class="month-chip active" data-mes="0">Todos</button> ', ' </div> <div class="filter-group"> <span class="filter-label">Tipo</span> ', ' </div> <span class="result-count" id="resultCount">', ' festividades</span> </div> <!-- FESTIVAL GRID --> <div class="fest-grid" id="festGrid"> ', ' </div> <div style="padding-bottom:5rem;"></div> </main> <!-- CALENDAR SECTION --> <section class="calendar-section" id="calendario"> <div class="section-header reveal"> <div class="section-eyebrow">Planifica tu visita</div> <h2 class="section-title">Calendario Festivo</h2> </div> <div class="calendar-grid" id="calendarGrid"></div> </section> <!-- GALLERY SECTION --> ', ` <!-- Gallery modal --> <div class="gallery-modal" id="galleryModal"> <button class="gallery-modal-close" id="galleryClose">×</button> <img id="galleryModalImg" src="" alt=""> <p id="galleryModalLabel" style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:10px;"></p> </div> <!-- BOTTOM WAVE --> <div class="bottom-wave"> <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="position:absolute;bottom:0;left:-5%;width:110%;height:100%;" xmlns="http://www.w3.org/2000/svg"> <path d="M0,20 C220,55 480,5 720,30 C980,55 1240,8 1440,22 L1440,80 L0,80Z" fill="rgba(74,58,40,0.55)"></path> <path d="M0,40 C300,20 600,55 960,35 C1200,22 1380,50 1440,40 L1440,80 L0,80Z" fill="rgba(74,58,40,0.4)"></path> </svg> </div> <!-- FOOTER --> <footer class="arena-footer"> <div class="arena-footer-body"> <div class="arena-footer-grid"> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,812 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos/playa-llacho" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos/mirador-amaru" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos/isla-ticonata" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos/comunidad" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos/islas-flotantes" class="arena-link">Islas flotantes</a></li> </ul> </div> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencias" class="arena-link">Vivencias</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/nosotros" class="arena-link">Nosotros</a></li> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:12px;margin-bottom:0.8rem;line-height:1.55;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:11px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:13px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:12px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <!-- FLOATING CALENDAR --> <div class="floating-cal" id="floatingCal"> <div class="fc-header" id="fcHeader"> <div class="fc-header-left"> <span>📅</span> <span>Próxima Festividad</span> </div> <button class="fc-minimize" id="fcMinimize">−</button> </div> <div class="fc-body"> <div class="fc-next-fest" id="fcNextFest"></div> <div class="fc-mini-cal" id="fcMiniCal"></div> </div> </div> <button class="fc-icon-btn" id="fcIconBtn" aria-label="Abrir calendario">📅</button> <script>
  /* ─── DATA (for client-side calendar & filter) ─── */
  const FEST_DATA = [
    { id:'epifania',      nombre:'Epifanía',                 mes:1,  dia:6,  icono:'👑' },
    { id:'candelaria',    nombre:'Virgen de la Candelaria',  mes:2,  dia:2,  icono:'🕯️' },
    { id:'carnavales',    nombre:'Carnavales de Capachica',  mes:2,  dia:20, icono:'🎭' },
    { id:'fiesta-cruz',   nombre:'Fiesta de la Cruz',        mes:5,  dia:3,  icono:'✝️' },
    { id:'danza-triunfal',nombre:'Danza de la Triunfal',     mes:5,  dia:3,  icono:'💃' },
    { id:'corpus-christi',nombre:'Corpus Christi',           mes:6,  dia:19, icono:'⛪' },
    { id:'inti-raymi',    nombre:'Inti Raymi',                mes:6,  dia:21, icono:'☀️' },
    { id:'san-juan',      nombre:'San Juan Bautista',        mes:6,  dia:24, icono:'🔥' },
    { id:'santos',        nombre:'Fiesta de los Santos',     mes:7,  dia:25, icono:'🙏' },
    { id:'llachon',       nombre:'Aniv. Llachón',            mes:7,  dia:28, icono:'🏘️' },
    { id:'pachamama',     nombre:'Pachamama Raymi',          mes:8,  dia:1,  icono:'🌍' },
    { id:'asuncion',      nombre:'Virgen de la Asunción',    mes:8,  dia:15, icono:'🕊️' },
    { id:'primavera',     nombre:'Fiesta de la Primavera',   mes:9,  dia:21, icono:'🌸' },
    { id:'milagros',      nombre:'Señor de los Milagros',    mes:10, dia:18, icono:'✝️' },
    { id:'todos-santos',  nombre:'Día de Todos los Santos',  mes:11, dia:1,  icono:'🕯️' },
    { id:'difuntos',      nombre:'Día de los Difuntos',      mes:11, dia:2,  icono:'🪔' },
    { id:'inmaculada',    nombre:'Inmaculada Concepción',    mes:12, dia:8,  icono:'🌟' },
    { id:'novena',        nombre:'Novena de Navidad',        mes:12, dia:16, icono:'🎶' },
    { id:'navidad',       nombre:'Navidad en Capachica',     mes:12, dia:25, icono:'🎄' },
  ];
  const MESES_NOMBRES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DIAS_CORTOS = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

  /* ─── STARS CANVAS ─── */
  (function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive:true });
    const stars = Array.from({ length:160 }, () => ({
      x: Math.random(), y: Math.random() * 0.75,
      r: 0.8 + Math.random() * 2.2,
      a: Math.random(), da: 0.003 + Math.random() * 0.008,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a = Math.abs(Math.sin(Date.now() * s.da / 500));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255,255,240,\${0.35 + s.a * 0.65})\`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ─── FLYING BIRDS (light mode) ─── */
  (function initBirds() {
    const container = document.getElementById('heroBirds');
    if (!container) return;
    const birds = [
      { w:58, stroke:2.4, flap:'flapSlow', dur:'1.5s', top:'12%', left:'8%',  float:'birdFloat1', floatDur:'9s' },
      { w:46, stroke:2.0, flap:'flapMed',  dur:'1.1s', top:'18%', left:'70%', float:'birdFloat2', floatDur:'11s' },
      { w:52, stroke:2.2, flap:'flapFast', dur:'0.8s', top:'24%', left:'32%', float:'birdFloat3', floatDur:'7.5s' },
      { w:38, stroke:1.8, flap:'flapSlow', dur:'1.4s', top:'9%',  left:'86%', float:'birdFloat4', floatDur:'10s' },
    ];
    birds.forEach(b => {
      const el = document.createElement('div');
      el.className = 'bird';
      el.style.cssText = \`position:absolute;top:\${b.top};left:\${b.left};animation:\${b.float} \${b.floatDur} ease-in-out infinite;\`;
      el.innerHTML = \`<svg width="\${b.w}" height="\${b.w*0.55}" viewBox="-16 -12 32 20" fill="none" stroke="currentColor" stroke-width="\${b.stroke}" stroke-linecap="round"><path d="M0,0 Q-8,-8 -16,0" style="animation:\${b.flap} \${b.dur} ease-in-out infinite;"/><path d="M0,0 Q8,-8 16,0" style="animation:\${b.flap} \${b.dur} ease-in-out infinite;"/></svg>\`;
      container.appendChild(el);
    });
  })();

  /* ─── LAKE WAVE ─── */
  const style = document.createElement('style');
  style.textContent = \`
    @keyframes lakeWave { 0%,100%{d:path('M0,30 C200,55 420,5 720,30 C1020,55 1260,10 1440,28 L1440,80 L0,80Z')} 50%{d:path('M0,38 C200,18 450,58 720,35 C990,15 1240,52 1440,36 L1440,80 L0,80Z')} }
    @keyframes lakeShimmer { 0%,100%{opacity:0.4;transform:scaleX(1)} 50%{opacity:0.8;transform:scaleX(1.15)} }
  \`;
  document.head.appendChild(style);

  /* ─── FESTIVAL FILTER ─── */
  (function initFilter() {
    const monthChips = document.querySelectorAll('.month-chip');
    const tipoChips  = document.querySelectorAll('.tipo-chip');
    const cards = document.querySelectorAll('.fest-card');
    const resultCount = document.getElementById('resultCount');
    let activeMes = 0, activeTipo = 'Todos';

    function applyFilter() {
      let count = 0;
      cards.forEach(card => {
        const mes = parseInt(card.dataset.mes || '0');
        const tipo = card.dataset.tipo || '';
        const show = (activeMes === 0 || mes === activeMes) && (activeTipo === 'Todos' || tipo === activeTipo);
        card.style.display = show ? '' : 'none';
        if (show) count++;
      });
      if (resultCount) resultCount.textContent = \`\${count} festividade\${count !== 1 ? 's' : ''}\`;
    }

    monthChips.forEach(chip => {
      chip.addEventListener('click', () => {
        monthChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeMes = parseInt(chip.dataset.mes || '0');
        applyFilter();
      });
    });
    tipoChips.forEach(chip => {
      chip.addEventListener('click', () => {
        tipoChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeTipo = chip.dataset.tipo || 'Todos';
        applyFilter();
      });
    });
  })();

  /* ─── 12-MONTH CALENDAR ─── */
  (function initCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = now.getMonth();
    const today = now.getDate();

    for (let m = 0; m < 12; m++) {
      const isCurrent = m === currentMonth;
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const festMonth = FEST_DATA.filter(f => f.mes === m + 1);

      const card = document.createElement('div');
      card.className = 'cal-month-card reveal' + (isCurrent ? ' current' : '');

      let html = \`<div class="cal-month-name">\${MESES_NOMBRES[m]} \${year}</div>\`;
      html += \`<table class="cal-table"><thead><tr>\`;
      DIAS_CORTOS.forEach(d => { html += \`<th>\${d}</th>\`; });
      html += \`</tr></thead><tbody><tr>\`;

      let col = 0;
      for (let i = 0; i < firstDay; i++) { html += \`<td></td>\`; col++; }
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = isCurrent && d === today;
        const fest = festMonth.find(f => f.dia === d);
        let cls = 'cal-day';
        if (isToday) cls += ' today';
        else if (fest) cls += ' has-fest';
        html += \`<td><span class="\${cls}" title="\${fest ? fest.icono + ' ' + fest.nombre : ''}">\${d}</span></td>\`;
        col++;
        if (col % 7 === 0 && d < daysInMonth) { html += \`</tr><tr>\`; col = 0; }
      }
      html += \`</tr></tbody></table>\`;

      if (festMonth.length > 0) {
        html += \`<div class="cal-fest-list">\`;
        festMonth.forEach(f => {
          html += \`<div class="cal-fest-item"><span>\${f.icono}</span><span>\${f.nombre} (\${f.dia})</span></div>\`;
        });
        html += \`</div>\`;
      }
      card.innerHTML = html;
      grid.appendChild(card);
    }
  })();

  /* ─── FLOATING CALENDAR ─── */
  (function initFloatingCal() {
    const fc = document.getElementById('floatingCal');
    const iconBtn = document.getElementById('fcIconBtn');
    const minimize = document.getElementById('fcMinimize');
    const nextFestEl = document.getElementById('fcNextFest');
    const miniCalEl = document.getElementById('fcMiniCal');

    // Find next festivity
    const now = new Date();
    const year = now.getFullYear();
    const today = new Date(year, now.getMonth(), now.getDate());
    const upcoming = FEST_DATA
      .map(f => {
        let d = new Date(year, f.mes - 1, f.dia);
        if (d < today) d = new Date(year + 1, f.mes - 1, f.dia);
        return { ...f, daysLeft: Math.ceil((d - today) / 86400000), date: d };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
    const next = upcoming[0];

    if (next && nextFestEl) {
      nextFestEl.innerHTML = \`
        <div class="fc-next-icon">\${next.icono}</div>
        <div class="fc-next-name">\${next.nombre}</div>
        <div class="fc-next-date">\${next.date.toLocaleDateString('es-PE',{day:'numeric',month:'long'})}</div>
        <div class="fc-days-left">\${next.daysLeft}</div>
        <div class="fc-days-label">días restantes</div>
      \`;
    }

    // Mini calendar for current month
    if (miniCalEl) {
      const m = now.getMonth(); const d0 = now.getDate();
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const festDays = FEST_DATA.filter(f => f.mes === m + 1).map(f => f.dia);
      let html = \`<table class="fc-mini-table"><thead><tr>\`;
      DIAS_CORTOS.forEach(d => { html += \`<th>\${d}</th>\`; });
      html += \`</tr></thead><tbody><tr>\`;
      let col = 0;
      for (let i = 0; i < firstDay; i++) { html += \`<td></td>\`; col++; }
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === d0;
        const hasFest = festDays.includes(d);
        let cls = 'fc-mini-day';
        if (isToday) cls = 'fc-mini-today';
        else if (hasFest) cls = 'fc-mini-fest';
        html += \`<td><span class="\${cls}">\${d}</span></td>\`;
        col++;
        if (col % 7 === 0) html += \`</tr><tr>\`;
      }
      html += \`</tr></tbody></table>\`;
      miniCalEl.innerHTML = html;
    }

    // Minimize/maximize
    minimize && minimize.addEventListener('click', () => {
      fc && fc.classList.add('hidden');
      iconBtn && iconBtn.classList.add('visible');
    });
    iconBtn && iconBtn.addEventListener('click', () => {
      iconBtn.classList.remove('visible');
      fc && fc.classList.remove('hidden');
    });

    // Drag
    let dragging = false, ox = 0, oy = 0;
    const fcHeader = document.getElementById('fcHeader');
    function startDrag(cx, cy) {
      dragging = true;
      const r = fc.getBoundingClientRect();
      ox = cx - r.left; oy = cy - r.top;
    }
    function moveDrag(cx, cy) {
      if (!dragging || !fc) return;
      fc.style.left = (cx - ox) + 'px'; fc.style.top = (cy - oy) + 'px';
      fc.style.right = 'auto'; fc.style.bottom = 'auto';
    }
    function endDrag() { dragging = false; }
    fcHeader && fcHeader.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);
    fcHeader && fcHeader.addEventListener('touchstart', e => { const t = e.touches[0]; startDrag(t.clientX, t.clientY); }, { passive:true });
    document.addEventListener('touchmove', e => { if (!dragging) return; const t = e.touches[0]; moveDrag(t.clientX, t.clientY); }, { passive:true });
    document.addEventListener('touchend', endDrag);
  })();

  /* ─── GALLERY MODAL ─── */
  (function initGallery() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    const modalLabel = document.getElementById('galleryModalLabel');
    const closeBtn = document.getElementById('galleryClose');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!modal || !modalImg) return;
        modalImg.src = item.dataset.src || item.querySelector('img')?.src || '';
        if (modalLabel) modalLabel.textContent = item.dataset.label || '';
        modal.classList.add('open');
      });
    });
    closeBtn && closeBtn.addEventListener('click', () => modal && modal.classList.remove('open'));
    modal && modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  })();

  /* ─── NEWSLETTER ─── */
  (function initNewsletter() {
    const form = document.getElementById('arenaNewsletterForm');
    const input = document.getElementById('arenaEmailInput');
    const btn = document.getElementById('arenaSubscribeBtn');
    const msg = document.getElementById('arenaSubscribedMsg');
    if (!btn || !input || !form || !msg) return;
    async function subscribe() {
      const email = input.value.trim();
      if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        input.style.borderColor = 'rgba(220,60,60,0.6)';
        setTimeout(() => input.style.borderColor = '', 1200); return;
      }
      btn.disabled = true; btn.textContent = 'Enviando…';
      try {
        const res = await fetch('http://localhost:3030/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
        const data = await res.json();
        if (!data.success) { alert(data.message || 'Error'); btn.disabled = false; btn.textContent = 'Suscribirme'; return; }
      } catch {}
      form.style.display = 'none'; msg.style.display = 'block';
    }
    btn.addEventListener('click', subscribe);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });
  })();

  /* ─── REVEAL ON SCROLL ─── */
  (function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold:0.1 });
    els.forEach(el => io.observe(el));
  })();
<\/script> </body> </html>`], ['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Festividades · Capachica Turismo</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- HERO --> <section class="hero" id="inicio"> <div class="hero-sky"></div> <canvas class="stars-layer" id="starsCanvas"></canvas> <div class="hero-moon"></div> <div class="hero-sun" id="heroSun"> <div class="sun-rays"></div> <div class="sun-body"></div> </div> <div class="hero-birds" id="heroBirds"></div> <div class="hero-lake"> <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0,30 C200,55 420,5 720,30 C1020,55 1260,10 1440,28 L1440,80 L0,80Z" fill="rgba(20,60,120,0.55)" style="animation:lakeWave 6s ease-in-out infinite;"></path> <path d="M0,48 C260,28 520,62 840,42 C1100,28 1300,58 1440,44 L1440,80 L0,80Z" fill="rgba(15,45,90,0.45)"></path> </svg> <div style="position:absolute;bottom:18px;left:30%;width:35%;height:2px;background:rgba(255,255,255,0.18);border-radius:50%;animation:lakeShimmer 3s ease-in-out infinite;"></div> </div> <div class="hero-content"> <div class="hero-badge">🎉 Festividades · Capachica · Lago Titicaca</div> <h1 class="hero-title">\nCelebraciones\n<em>Ancestrales</em> </h1> <p class="hero-subtitle">\nTradición, fe y cultura viva a orillas del lago más alto del mundo.\n      Cada festividad es una ventana al alma del pueblo capachiquense.\n</p> <div class="hero-ctas"> <a href="#festividades" class="hero-cta-primary">🎉 Ver Festividades</a> <a href="#calendario" class="hero-cta-secondary">📅 Calendario</a> </div> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">', '+</div> <div class="stat-label">Festividades</div> </div> <div class="stat-item"> <div class="stat-val">12</div> <div class="stat-label">Meses activos</div> </div> <div class="stat-item"> <div class="stat-val">500+</div> <div class="stat-label">Años de tradición</div> </div> </div> </div> <div class="hero-wave"> <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0,20 C360,55 720,0 1080,35 C1260,50 1380,15 1440,25 L1440,60 L0,60Z" fill="#0f2240"></path> </svg> </div> </section> <!-- MAIN CONTENT --> <main id="festividades"> <div class="section-header reveal"> <div class="section-eyebrow">Cultura Viva · Capachica</div> <h2 class="section-title">Nuestras Festividades</h2> </div> <!-- FILTER BAR --> <div class="filter-bar" id="filterBar"> <div class="filter-group"> <span class="filter-label">Mes</span> <button class="month-chip active" data-mes="0">Todos</button> ', ' </div> <div class="filter-group"> <span class="filter-label">Tipo</span> ', ' </div> <span class="result-count" id="resultCount">', ' festividades</span> </div> <!-- FESTIVAL GRID --> <div class="fest-grid" id="festGrid"> ', ' </div> <div style="padding-bottom:5rem;"></div> </main> <!-- CALENDAR SECTION --> <section class="calendar-section" id="calendario"> <div class="section-header reveal"> <div class="section-eyebrow">Planifica tu visita</div> <h2 class="section-title">Calendario Festivo</h2> </div> <div class="calendar-grid" id="calendarGrid"></div> </section> <!-- GALLERY SECTION --> ', ` <!-- Gallery modal --> <div class="gallery-modal" id="galleryModal"> <button class="gallery-modal-close" id="galleryClose">×</button> <img id="galleryModalImg" src="" alt=""> <p id="galleryModalLabel" style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:10px;"></p> </div> <!-- BOTTOM WAVE --> <div class="bottom-wave"> <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="position:absolute;bottom:0;left:-5%;width:110%;height:100%;" xmlns="http://www.w3.org/2000/svg"> <path d="M0,20 C220,55 480,5 720,30 C980,55 1240,8 1440,22 L1440,80 L0,80Z" fill="rgba(74,58,40,0.55)"></path> <path d="M0,40 C300,20 600,55 960,35 C1200,22 1380,50 1440,40 L1440,80 L0,80Z" fill="rgba(74,58,40,0.4)"></path> </svg> </div> <!-- FOOTER --> <footer class="arena-footer"> <div class="arena-footer-body"> <div class="arena-footer-grid"> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,812 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos/playa-llacho" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos/mirador-amaru" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos/isla-ticonata" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos/comunidad" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos/islas-flotantes" class="arena-link">Islas flotantes</a></li> </ul> </div> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencias" class="arena-link">Vivencias</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/nosotros" class="arena-link">Nosotros</a></li> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:12px;margin-bottom:0.8rem;line-height:1.55;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:11px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:13px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:12px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <!-- FLOATING CALENDAR --> <div class="floating-cal" id="floatingCal"> <div class="fc-header" id="fcHeader"> <div class="fc-header-left"> <span>📅</span> <span>Próxima Festividad</span> </div> <button class="fc-minimize" id="fcMinimize">−</button> </div> <div class="fc-body"> <div class="fc-next-fest" id="fcNextFest"></div> <div class="fc-mini-cal" id="fcMiniCal"></div> </div> </div> <button class="fc-icon-btn" id="fcIconBtn" aria-label="Abrir calendario">📅</button> <script>
  /* ─── DATA (for client-side calendar & filter) ─── */
  const FEST_DATA = [
    { id:'epifania',      nombre:'Epifanía',                 mes:1,  dia:6,  icono:'👑' },
    { id:'candelaria',    nombre:'Virgen de la Candelaria',  mes:2,  dia:2,  icono:'🕯️' },
    { id:'carnavales',    nombre:'Carnavales de Capachica',  mes:2,  dia:20, icono:'🎭' },
    { id:'fiesta-cruz',   nombre:'Fiesta de la Cruz',        mes:5,  dia:3,  icono:'✝️' },
    { id:'danza-triunfal',nombre:'Danza de la Triunfal',     mes:5,  dia:3,  icono:'💃' },
    { id:'corpus-christi',nombre:'Corpus Christi',           mes:6,  dia:19, icono:'⛪' },
    { id:'inti-raymi',    nombre:'Inti Raymi',                mes:6,  dia:21, icono:'☀️' },
    { id:'san-juan',      nombre:'San Juan Bautista',        mes:6,  dia:24, icono:'🔥' },
    { id:'santos',        nombre:'Fiesta de los Santos',     mes:7,  dia:25, icono:'🙏' },
    { id:'llachon',       nombre:'Aniv. Llachón',            mes:7,  dia:28, icono:'🏘️' },
    { id:'pachamama',     nombre:'Pachamama Raymi',          mes:8,  dia:1,  icono:'🌍' },
    { id:'asuncion',      nombre:'Virgen de la Asunción',    mes:8,  dia:15, icono:'🕊️' },
    { id:'primavera',     nombre:'Fiesta de la Primavera',   mes:9,  dia:21, icono:'🌸' },
    { id:'milagros',      nombre:'Señor de los Milagros',    mes:10, dia:18, icono:'✝️' },
    { id:'todos-santos',  nombre:'Día de Todos los Santos',  mes:11, dia:1,  icono:'🕯️' },
    { id:'difuntos',      nombre:'Día de los Difuntos',      mes:11, dia:2,  icono:'🪔' },
    { id:'inmaculada',    nombre:'Inmaculada Concepción',    mes:12, dia:8,  icono:'🌟' },
    { id:'novena',        nombre:'Novena de Navidad',        mes:12, dia:16, icono:'🎶' },
    { id:'navidad',       nombre:'Navidad en Capachica',     mes:12, dia:25, icono:'🎄' },
  ];
  const MESES_NOMBRES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DIAS_CORTOS = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

  /* ─── STARS CANVAS ─── */
  (function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive:true });
    const stars = Array.from({ length:160 }, () => ({
      x: Math.random(), y: Math.random() * 0.75,
      r: 0.8 + Math.random() * 2.2,
      a: Math.random(), da: 0.003 + Math.random() * 0.008,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a = Math.abs(Math.sin(Date.now() * s.da / 500));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = \\\`rgba(255,255,240,\\\${0.35 + s.a * 0.65})\\\`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ─── FLYING BIRDS (light mode) ─── */
  (function initBirds() {
    const container = document.getElementById('heroBirds');
    if (!container) return;
    const birds = [
      { w:58, stroke:2.4, flap:'flapSlow', dur:'1.5s', top:'12%', left:'8%',  float:'birdFloat1', floatDur:'9s' },
      { w:46, stroke:2.0, flap:'flapMed',  dur:'1.1s', top:'18%', left:'70%', float:'birdFloat2', floatDur:'11s' },
      { w:52, stroke:2.2, flap:'flapFast', dur:'0.8s', top:'24%', left:'32%', float:'birdFloat3', floatDur:'7.5s' },
      { w:38, stroke:1.8, flap:'flapSlow', dur:'1.4s', top:'9%',  left:'86%', float:'birdFloat4', floatDur:'10s' },
    ];
    birds.forEach(b => {
      const el = document.createElement('div');
      el.className = 'bird';
      el.style.cssText = \\\`position:absolute;top:\\\${b.top};left:\\\${b.left};animation:\\\${b.float} \\\${b.floatDur} ease-in-out infinite;\\\`;
      el.innerHTML = \\\`<svg width="\\\${b.w}" height="\\\${b.w*0.55}" viewBox="-16 -12 32 20" fill="none" stroke="currentColor" stroke-width="\\\${b.stroke}" stroke-linecap="round"><path d="M0,0 Q-8,-8 -16,0" style="animation:\\\${b.flap} \\\${b.dur} ease-in-out infinite;"/><path d="M0,0 Q8,-8 16,0" style="animation:\\\${b.flap} \\\${b.dur} ease-in-out infinite;"/></svg>\\\`;
      container.appendChild(el);
    });
  })();

  /* ─── LAKE WAVE ─── */
  const style = document.createElement('style');
  style.textContent = \\\`
    @keyframes lakeWave { 0%,100%{d:path('M0,30 C200,55 420,5 720,30 C1020,55 1260,10 1440,28 L1440,80 L0,80Z')} 50%{d:path('M0,38 C200,18 450,58 720,35 C990,15 1240,52 1440,36 L1440,80 L0,80Z')} }
    @keyframes lakeShimmer { 0%,100%{opacity:0.4;transform:scaleX(1)} 50%{opacity:0.8;transform:scaleX(1.15)} }
  \\\`;
  document.head.appendChild(style);

  /* ─── FESTIVAL FILTER ─── */
  (function initFilter() {
    const monthChips = document.querySelectorAll('.month-chip');
    const tipoChips  = document.querySelectorAll('.tipo-chip');
    const cards = document.querySelectorAll('.fest-card');
    const resultCount = document.getElementById('resultCount');
    let activeMes = 0, activeTipo = 'Todos';

    function applyFilter() {
      let count = 0;
      cards.forEach(card => {
        const mes = parseInt(card.dataset.mes || '0');
        const tipo = card.dataset.tipo || '';
        const show = (activeMes === 0 || mes === activeMes) && (activeTipo === 'Todos' || tipo === activeTipo);
        card.style.display = show ? '' : 'none';
        if (show) count++;
      });
      if (resultCount) resultCount.textContent = \\\`\\\${count} festividade\\\${count !== 1 ? 's' : ''}\\\`;
    }

    monthChips.forEach(chip => {
      chip.addEventListener('click', () => {
        monthChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeMes = parseInt(chip.dataset.mes || '0');
        applyFilter();
      });
    });
    tipoChips.forEach(chip => {
      chip.addEventListener('click', () => {
        tipoChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeTipo = chip.dataset.tipo || 'Todos';
        applyFilter();
      });
    });
  })();

  /* ─── 12-MONTH CALENDAR ─── */
  (function initCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = now.getMonth();
    const today = now.getDate();

    for (let m = 0; m < 12; m++) {
      const isCurrent = m === currentMonth;
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const festMonth = FEST_DATA.filter(f => f.mes === m + 1);

      const card = document.createElement('div');
      card.className = 'cal-month-card reveal' + (isCurrent ? ' current' : '');

      let html = \\\`<div class="cal-month-name">\\\${MESES_NOMBRES[m]} \\\${year}</div>\\\`;
      html += \\\`<table class="cal-table"><thead><tr>\\\`;
      DIAS_CORTOS.forEach(d => { html += \\\`<th>\\\${d}</th>\\\`; });
      html += \\\`</tr></thead><tbody><tr>\\\`;

      let col = 0;
      for (let i = 0; i < firstDay; i++) { html += \\\`<td></td>\\\`; col++; }
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = isCurrent && d === today;
        const fest = festMonth.find(f => f.dia === d);
        let cls = 'cal-day';
        if (isToday) cls += ' today';
        else if (fest) cls += ' has-fest';
        html += \\\`<td><span class="\\\${cls}" title="\\\${fest ? fest.icono + ' ' + fest.nombre : ''}">\\\${d}</span></td>\\\`;
        col++;
        if (col % 7 === 0 && d < daysInMonth) { html += \\\`</tr><tr>\\\`; col = 0; }
      }
      html += \\\`</tr></tbody></table>\\\`;

      if (festMonth.length > 0) {
        html += \\\`<div class="cal-fest-list">\\\`;
        festMonth.forEach(f => {
          html += \\\`<div class="cal-fest-item"><span>\\\${f.icono}</span><span>\\\${f.nombre} (\\\${f.dia})</span></div>\\\`;
        });
        html += \\\`</div>\\\`;
      }
      card.innerHTML = html;
      grid.appendChild(card);
    }
  })();

  /* ─── FLOATING CALENDAR ─── */
  (function initFloatingCal() {
    const fc = document.getElementById('floatingCal');
    const iconBtn = document.getElementById('fcIconBtn');
    const minimize = document.getElementById('fcMinimize');
    const nextFestEl = document.getElementById('fcNextFest');
    const miniCalEl = document.getElementById('fcMiniCal');

    // Find next festivity
    const now = new Date();
    const year = now.getFullYear();
    const today = new Date(year, now.getMonth(), now.getDate());
    const upcoming = FEST_DATA
      .map(f => {
        let d = new Date(year, f.mes - 1, f.dia);
        if (d < today) d = new Date(year + 1, f.mes - 1, f.dia);
        return { ...f, daysLeft: Math.ceil((d - today) / 86400000), date: d };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
    const next = upcoming[0];

    if (next && nextFestEl) {
      nextFestEl.innerHTML = \\\`
        <div class="fc-next-icon">\\\${next.icono}</div>
        <div class="fc-next-name">\\\${next.nombre}</div>
        <div class="fc-next-date">\\\${next.date.toLocaleDateString('es-PE',{day:'numeric',month:'long'})}</div>
        <div class="fc-days-left">\\\${next.daysLeft}</div>
        <div class="fc-days-label">días restantes</div>
      \\\`;
    }

    // Mini calendar for current month
    if (miniCalEl) {
      const m = now.getMonth(); const d0 = now.getDate();
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const festDays = FEST_DATA.filter(f => f.mes === m + 1).map(f => f.dia);
      let html = \\\`<table class="fc-mini-table"><thead><tr>\\\`;
      DIAS_CORTOS.forEach(d => { html += \\\`<th>\\\${d}</th>\\\`; });
      html += \\\`</tr></thead><tbody><tr>\\\`;
      let col = 0;
      for (let i = 0; i < firstDay; i++) { html += \\\`<td></td>\\\`; col++; }
      for (let d = 1; d <= daysInMonth; d++) {
        const isToday = d === d0;
        const hasFest = festDays.includes(d);
        let cls = 'fc-mini-day';
        if (isToday) cls = 'fc-mini-today';
        else if (hasFest) cls = 'fc-mini-fest';
        html += \\\`<td><span class="\\\${cls}">\\\${d}</span></td>\\\`;
        col++;
        if (col % 7 === 0) html += \\\`</tr><tr>\\\`;
      }
      html += \\\`</tr></tbody></table>\\\`;
      miniCalEl.innerHTML = html;
    }

    // Minimize/maximize
    minimize && minimize.addEventListener('click', () => {
      fc && fc.classList.add('hidden');
      iconBtn && iconBtn.classList.add('visible');
    });
    iconBtn && iconBtn.addEventListener('click', () => {
      iconBtn.classList.remove('visible');
      fc && fc.classList.remove('hidden');
    });

    // Drag
    let dragging = false, ox = 0, oy = 0;
    const fcHeader = document.getElementById('fcHeader');
    function startDrag(cx, cy) {
      dragging = true;
      const r = fc.getBoundingClientRect();
      ox = cx - r.left; oy = cy - r.top;
    }
    function moveDrag(cx, cy) {
      if (!dragging || !fc) return;
      fc.style.left = (cx - ox) + 'px'; fc.style.top = (cy - oy) + 'px';
      fc.style.right = 'auto'; fc.style.bottom = 'auto';
    }
    function endDrag() { dragging = false; }
    fcHeader && fcHeader.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => moveDrag(e.clientX, e.clientY));
    document.addEventListener('mouseup', endDrag);
    fcHeader && fcHeader.addEventListener('touchstart', e => { const t = e.touches[0]; startDrag(t.clientX, t.clientY); }, { passive:true });
    document.addEventListener('touchmove', e => { if (!dragging) return; const t = e.touches[0]; moveDrag(t.clientX, t.clientY); }, { passive:true });
    document.addEventListener('touchend', endDrag);
  })();

  /* ─── GALLERY MODAL ─── */
  (function initGallery() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('galleryModalImg');
    const modalLabel = document.getElementById('galleryModalLabel');
    const closeBtn = document.getElementById('galleryClose');
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        if (!modal || !modalImg) return;
        modalImg.src = item.dataset.src || item.querySelector('img')?.src || '';
        if (modalLabel) modalLabel.textContent = item.dataset.label || '';
        modal.classList.add('open');
      });
    });
    closeBtn && closeBtn.addEventListener('click', () => modal && modal.classList.remove('open'));
    modal && modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  })();

  /* ─── NEWSLETTER ─── */
  (function initNewsletter() {
    const form = document.getElementById('arenaNewsletterForm');
    const input = document.getElementById('arenaEmailInput');
    const btn = document.getElementById('arenaSubscribeBtn');
    const msg = document.getElementById('arenaSubscribedMsg');
    if (!btn || !input || !form || !msg) return;
    async function subscribe() {
      const email = input.value.trim();
      if (!email || !/^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/.test(email)) {
        input.style.borderColor = 'rgba(220,60,60,0.6)';
        setTimeout(() => input.style.borderColor = '', 1200); return;
      }
      btn.disabled = true; btn.textContent = 'Enviando…';
      try {
        const res = await fetch('http://localhost:3030/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
        const data = await res.json();
        if (!data.success) { alert(data.message || 'Error'); btn.disabled = false; btn.textContent = 'Suscribirme'; return; }
      } catch {}
      form.style.display = 'none'; msg.style.display = 'block';
    }
    btn.addEventListener('click', subscribe);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });
  })();

  /* ─── REVEAL ON SCROLL ─── */
  (function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold:0.1 });
    els.forEach(el => io.observe(el));
  })();
<\/script> </body> </html>`])), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/Navbar", "client:component-export": "default" }), festividades.length, NOMBRES_MESES.map((nombre, i) => {
    const tiene = festividades.some((f) => f.mes === i + 1);
    return tiene ? renderTemplate`<button class="month-chip"${addAttribute(i + 1, "data-mes")}>${nombre}</button>` : null;
  }), tipos.map((t, i) => renderTemplate`<button${addAttribute(["tipo-chip", [i === 0 && "active"]], "class:list")}${addAttribute(t, "data-tipo")}>${t}</button>`), festividades.length, festividades.map((f) => renderTemplate`<article${addAttribute(["fest-card reveal", f.destacado && "destacado"], "class:list")}${addAttribute(f.mes, "data-mes")}${addAttribute(f.tipo || "", "data-tipo")}> <div class="fest-card-img-wrap"> <img class="fest-card-img"${addAttribute(f.imagen, "src")}${addAttribute(f.nombre, "alt")} loading="lazy"> ${f.tipo && renderTemplate`<span class="fest-card-badge"${addAttribute(`background:${tipoColor[f.tipo] || "#666"}22;color:${tipoColor[f.tipo] || "#999"};border:1px solid ${tipoColor[f.tipo] || "#666"}44;`, "style")}> ${tipoIcon[f.tipo] || "🎉"} ${f.tipo} </span>`} </div> <div class="fest-card-body"> <div class="fest-card-date">📅 ${f.fecha || `Mes ${f.mes}`}</div> <h3 class="fest-card-name">${f.nombre}</h3> ${f.descripcion && renderTemplate`<p class="fest-card-desc">${f.descripcion}</p>`} ${f.actividades && f.actividades.length > 0 && renderTemplate`<div class="fest-actividades"> ${f.actividades.slice(0, 3).map((a) => renderTemplate`<span class="fest-actividad-pill">${a}</span>`)} </div>`} <div class="fest-card-footer"> <span class="fest-card-location">📍 ${f.ubicacion || "Capachica"}</span> ${f.destacado && renderTemplate`<span class="fest-destacado-star" title="Festividad destacada">⭐</span>`} </div> </div> </article>`), festividades.some((f) => f.galeria && f.galeria.length > 0) && renderTemplate`<section class="gallery-section"> <div style="max-width:1100px;margin:0 auto;"> <div class="section-header reveal"> <div class="section-eyebrow">Momentos capturados</div> <h2 class="section-title">Galería</h2> </div> <div class="gallery-grid"> ${festividades.flatMap((f) => (f.galeria || []).slice(0, 2).map((img, i) => renderTemplate`<div class="gallery-item reveal"${addAttribute(img, "data-src")}${addAttribute(f.nombre, "data-label")}> <img${addAttribute(img, "src")}${addAttribute(f.nombre, "alt")} loading="lazy"> <div class="gallery-item-overlay"> <span class="gallery-item-label">${f.nombre}</span> </div> </div>`)).slice(0, 9)} </div> </div> </section>`);
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/festividades.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/festividades.astro";
const $$url = "/festividades";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Festividades,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
