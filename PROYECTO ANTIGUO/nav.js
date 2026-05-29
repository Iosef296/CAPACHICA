// Capachica Turismo — Nav + Lang System
const CAPA_NAV = {
  pages: [
    { key:'home',        href:'index.html',       label:{es:'Inicio',      en:'Home',       fr:'Accueil'} },
    { key:'destinos',    href:'destinos.html',     label:{es:'Destinos',    en:'Destinations',fr:'Destinations'} },
    { key:'vivencial',   href:'vivencial.html',    label:{es:'Vivencial',   en:'Vivencial',  fr:'Vivenciel'} },
    { key:'actividades', href:'actividades.html',  label:{es:'Actividades', en:'Activities', fr:'Activités'} },
    { key:'gastronomia', href:'gastronomia.html',  label:{es:'Gastronomía', en:'Gastronomy', fr:'Gastronomie'} },
    { key:'festividades',href:'festividades.html', label:{es:'Festividades',en:'Festivals',  fr:'Festivals'} },
    { key:'artesania',   href:'artesania.html',    label:{es:'Artesanía',   en:'Crafts',     fr:'Artisanat'} },
    { key:'alojamiento', href:'alojamiento.html',  label:{es:'Alojamiento', en:'Stay',       fr:'Séjour'} },
    { key:'como-llegar', href:'como-llegar.html',  label:{es:'Cómo Llegar', en:'Getting Here',fr:'Y Aller'} },
    { key:'contacto',    href:'contacto.html',     label:{es:'Contacto',    en:'Contact',    fr:'Contact'} },
  ],

  getLang() { return localStorage.getItem('capa_lang') || 'es'; },
  setLang(l) {
    localStorage.setItem('capa_lang', l);
    CAPA_NAV.inject(document.body.dataset.page || 'home');
    CAPA_TRANSLATE.apply();
    capaFooter();
  },

  inject(activeKey) {
    const el = document.getElementById('capa-nav');
    if (!el) return;
    const lang = CAPA_NAV.getLang();
    const visiblePages = CAPA_NAV.pages.slice(0, 8); // show first 8 in nav

    el.innerHTML = `
      <nav class="nav" id="capa-nav-inner">
        <div class="nav-inner">
          <a href="index.html" class="nav-logo">
            <div class="nav-logo-mark">C</div>
            <div class="nav-logo-text">
              <span class="nav-logo-name">Capachica</span>
              <span class="nav-logo-sub">Turismo Vivencial</span>
            </div>
          </a>
          <div class="nav-links">
            ${visiblePages.map(p => `
              <a href="${p.href}" class="nav-link${p.key === activeKey ? ' active' : ''}">${p.label[lang]}</a>
            `).join('')}
          </div>
          <div class="nav-actions">
            <div class="nav-lang">
              ${['es','en','fr'].map(l => `
                <button class="lang-btn${lang===l?' active':''}" onclick="CAPA_NAV.setLang('${l}')">${l.toUpperCase()}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </nav>
    `;

    // Scroll behavior
    const nav = document.getElementById('capa-nav-inner');
    const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
};

// CAPA_TRANSLATE is defined in translations.js

// ── Footer ──────────────────────────────────────────────────────────────
function capaFooter() {
  const el = document.getElementById('capa-footer');
  if (!el) return;
  const lang = CAPA_NAV.getLang();
  const T = {
    tagline: {es:'La joya escondida del Lago Titicaca', en:'The hidden gem of Lake Titicaca', fr:'Le joyau caché du lac Titicaca'},
    destinos: {es:'Destinos', en:'Destinations', fr:'Destinations'},
    info: {es:'Información', en:'Information', fr:'Informations'},
    copy: {es:'© 2026 Capachica Turismo. Todos los derechos reservados.', en:'© 2026 Capachica Tourism. All rights reserved.', fr:'© 2026 Capachica Tourisme. Tous droits réservés.'},
    made: {es:'Hecho con ♥ a las orillas del lago Titicaca', en:'Made with ♥ on the shores of Lake Titicaca', fr:'Fait avec ♥ sur les rives du lac Titicaca'},
  };
  el.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">
              <div class="footer-logo-mark">C</div>
              <span class="footer-logo-name">Capachica</span>
            </div>
            <p class="footer-tagline">${T.tagline[lang]}</p>
            <div style="display:flex;gap:8px;">
              ${['IG','FB','YT','TW'].map(s=>`<div style="width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:rgba(255,255,255,0.45);cursor:pointer;">${s}</div>`).join('')}
            </div>
          </div>
          <div>
            <div class="footer-col-title">${T.destinos[lang]}</div>
            ${['Playas de Capachica','Mirador del Amaru','Isla Ticonata','Comunidad Llachon','Isla Capachica'].map(l=>`<a href="destinos.html" class="footer-link">${l}</a>`).join('')}
          </div>
          <div>
            <div class="footer-col-title">${lang==='es'?'Experiencias':lang==='en'?'Experiences':'Expériences'}</div>
            ${CAPA_NAV.pages.slice(2,7).map(p=>`<a href="${p.href}" class="footer-link">${p.label[lang]}</a>`).join('')}
          </div>
          <div>
            <div class="footer-col-title">${T.info[lang]}</div>
            ${CAPA_NAV.pages.slice(7).map(p=>`<a href="${p.href}" class="footer-link">${p.label[lang]}</a>`).join('')}
          </div>
        </div>
        <hr class="footer-divider">
        <div class="footer-copy">
          <span>${T.copy[lang]}</span>
          <span>${T.made[lang]}</span>
        </div>
      </div>
    </footer>
  `;
}

// ── FadeIn ──────────────────────────────────────────────────────────────
function capaFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// Init — runs after ALL scripts load
window.addEventListener('load', () => {
  const page = document.body.dataset.page || 'home';
  CAPA_NAV.inject(page);
  capaFooter();
  capaFadeIn();
  CAPA_TRANSLATE.apply();
});
