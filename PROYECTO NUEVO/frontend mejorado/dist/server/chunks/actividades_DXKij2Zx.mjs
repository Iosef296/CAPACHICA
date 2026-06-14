import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { h as renderTemplate, o as renderComponent, p as renderHead } from './server_DrLwvc76.mjs';
import { N as Navbar } from './Navbar_R42--hHp.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Actividades = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Actividades · Capachica Turismo</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">', "</head> <body> <!-- NAV --> ", ` <!-- HERO --> <section class="hero"> <div class="hero-sky"></div> <div class="sky-glow" id="skyGlow"></div> <canvas class="stars-layer" id="starsCanvas"></canvas> <!-- Flying birds --> <div class="hero-birds" id="heroBirds"></div> <div class="hero-moon"></div> <div class="hero-content"> <div class="hero-badge">Actividades · Capachica · 3,812 msnm</div> <h1 class="hero-title">
Nuestras
<em>Actividades</em> </h1> <p class="hero-subtitle">
Aventura, cultura y naturaleza a orillas del lago más alto del mundo.
        Cada actividad es una ventana al alma del Titicaca.
</p> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">15+</div> <div class="stat-label">Actividades</div> </div> <div class="stat-item"> <div class="stat-val">3,812</div> <div class="stat-label">msnm</div> </div> <div class="stat-item"> <div class="stat-val">4.9 ★</div> <div class="stat-label">Valoración</div> </div> <div class="stat-item"> <div class="stat-val">Todo</div> <div class="stat-label">El año</div> </div> </div> </div> <div class="hero-waves"> <div class="wave wave-water"></div> <div class="wave wave-sand"></div> </div> </section> <!-- MAIN --> <main> <!-- FILTERS --> <section class="filter-section"> <div class="filter-section-header reveal"> <div> <div class="section-eyebrow">Experiencias únicas</div> <h2 class="section-title">Elige tu aventura</h2> </div> <div class="result-count"> <span id="countNum">15</span> actividades
</div> </div> <div class="filter-pills reveal"> <button class="pill active" data-cat="all"> <span class="pill-emoji">🌊</span> Todas
</button> <button class="pill" data-cat="aquatic"> <span class="pill-emoji">🚣</span> Acuáticas
</button> <button class="pill" data-cat="terrestrial"> <span class="pill-emoji">🏔️</span> Terrestres
</button> <button class="pill" data-cat="cultural"> <span class="pill-emoji">🎨</span> Culturales
</button> <button class="pill" data-cat="gastro"> <span class="pill-emoji">🍽️</span> Gastronómicas
</button> </div> <div class="filter-selects reveal"> <select class="filter-select" id="diffFilter"> <option value="all">Dificultad: Todas</option> <option value="easy">Fácil</option> <option value="medium">Moderada</option> <option value="hard">Exigente</option> </select> <select class="filter-select" id="durFilter"> <option value="all">Duración: Todas</option> <option value="2h">2 horas</option> <option value="half">Medio día</option> <option value="full">Día completo</option> </select> <select class="filter-select" id="priceFilter"> <option value="all">Precio: Todos</option> <option value="cheap">Hasta S/.40</option> <option value="mid">S/.40 – S/.80</option> <option value="premium">Más de S/.80</option> </select> </div> </section> <!-- ACTIVITIES GRID --> <section class="activities-section"> <div class="activities-grid" id="activitiesGrid"> <!-- 1. Kayak --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="medium" data-dur="half" data-price-tier="mid" data-price="60" data-name="Kayak en el Titicaca" data-age="10"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🚣</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Kayak en el Titicaca</h3> <p class="card-desc">Navega las aguas sagradas del lago más alto del mundo en kayak, rodeado de totorales y el silencio del altiplano.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 10 años</span> <span class="meta-item"><span class="meta-icon">🎒</span> Equipo incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.60 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Kayak en el Titicaca', 60)">Reservar</button> </div> </div> </div> <!-- 2. Ciclismo --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="medium" data-dur="full" data-price-tier="mid" data-price="55" data-name="Ciclismo Panorámico 35km" data-age="14"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🚴</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Ciclismo Panorámico 35km</h3> <p class="card-desc">Recorre la peninsula entera en bicicleta con vistas impresionantes al lago Titicaca, comunidades y campos de quinua.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Día completo</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 14 años</span> <span class="meta-item"><span class="meta-icon">🚲</span> Bici incluida</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.55 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Ciclismo Panorámico 35km', 55)">Reservar</button> </div> </div> </div> <!-- 3. Pesca --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="easy" data-dur="half" data-price-tier="cheap" data-price="35" data-name="Pesca Artesanal al Amanecer" data-age="6"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🎣</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Pesca Artesanal al Amanecer</h3> <p class="card-desc">Acompaña a pescadores locales en sus balsas de totora al rayar el alba. La trucha del Titicaca como protagonista.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 6 años</span> <span class="meta-item"><span class="meta-icon">🌅</span> Sale 5am</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Pesca Artesanal al Amanecer', 35)">Reservar</button> </div> </div> </div> <!-- 4. Senderismo --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="hard" data-dur="full" data-price-tier="mid" data-price="45" data-name="Senderismo al Mirador 4000m" data-age="12"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🥾</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-hard">Exigente</span> </div> <h3 class="card-title">Senderismo al Mirador del Amaru</h3> <p class="card-desc">Asciende hasta 4,000 msnm con guía local. Vistas panorámicas 360° del Titicaca, la península y la cordillera boliviana.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Día completo</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 12 años</span> <span class="meta-item"><span class="meta-icon">🧗</span> Guía incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.45 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Senderismo al Mirador del Amaru', 45)">Reservar</button> </div> </div> </div> <!-- 5. Aves --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="half" data-price-tier="cheap" data-price="30" data-name="Avistamiento de Aves" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🦅</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Avistamiento de Aves</h3> <p class="card-desc">Descubre el flamenco andino, el pato de los torrentes y más de 60 especies que habitan los totorales del Titicaca.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🔭</span> Binoculares incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Avistamiento de Aves', 30)">Reservar</button> </div> </div> </div> <!-- 6. Tejido --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="35" data-name="Taller de Tejido de Alpaca" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🧶</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Tejido de Alpaca</h3> <p class="card-desc">Aprende la técnica milenaria del telar de cintura con artesanas de la comunidad. Te llevas la pieza que creas.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🎁</span> Pieza incluida</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Tejido de Alpaca', 35)">Reservar</button> </div> </div> </div> <!-- 7. Cocina --> <div class="activity-card cat-gastro reveal" data-cat="gastro" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="50" data-name="Taller de Cocina Andina" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🫕</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Gastronómico</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Cocina Andina</h3> <p class="card-desc">Prepara trucha al ají amarillo, chairo y quinua con madres de familia locales en fogón de leña. Almuerzo incluido.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🍽️</span> Almuerzo incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.50 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Cocina Andina', 50)">Reservar</button> </div> </div> </div> <!-- 8. Estrellas --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="40" data-name="Observación de Estrellas" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🔭</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Noche de Estrellas 3,812m</h3> <p class="card-desc">El cielo nocturno del altiplano es inigualable. Telescopios, guía astronómico y mate de coca bajo la Vía Láctea.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">🌙</span> Horario nocturno</span> <span class="meta-item"><span class="meta-icon">☕</span> Bebidas incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.40 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Noche de Estrellas 3812m', 40)">Reservar</button> </div> </div> </div> <!-- 9. Aimara --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="25" data-name="Clase de Idioma Aimara" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🗣️</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Clase de Idioma Aimara</h3> <p class="card-desc">Aprende frases esenciales del aimara, idioma ancestral del altiplano. Saludos, números, colores y palabras del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">📖</span> Manual incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.25 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Clase de Idioma Aimara', 25)">Reservar</button> </div> </div> </div> <!-- 10. Instrumentos --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="30" data-name="Taller de Instrumentos Andinos" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🎵</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Instrumentos Andinos</h3> <p class="card-desc">Zampoña, quena y bombo en manos de músicos de la comunidad. Aprende melodías del lago y te llevas recuerdo sonoro.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🎶</span> Grabación incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Instrumentos Andinos', 30)">Reservar</button> </div> </div> </div> <!-- 11. Snorkel --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="medium" data-dur="half" data-price-tier="mid" data-price="70" data-name="Snorkel en el Titicaca" data-age="12"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🤿</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Snorkel en el Titicaca</h3> <p class="card-desc">Sumerge en las cristalinas aguas del Titicaca y descubre el ecosistema subacuático único de la rana gigante del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 12 años</span> <span class="meta-item"><span class="meta-icon">🌊</span> Traje incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.70 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Snorkel en el Titicaca', 70)">Reservar</button> </div> </div> </div> <!-- 12. Pachamama --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="35" data-name="Ceremonia Pachamama" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🌿</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Ceremonia Pachamama</h3> <p class="card-desc">Participa en el ritual ancestral de ofrenda a la Madre Tierra con un yatiri (sabio andino) a la orilla del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">🌄</span> Al atardecer</span> <span class="meta-item"><span class="meta-icon">🙏</span> Ceremonial</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Ceremonia Pachamama', 35)">Reservar</button> </div> </div> </div> <!-- 13. Chicha --> <div class="activity-card cat-gastro reveal" data-cat="gastro" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="30" data-name="Elaboración de Chicha de Jora" data-age="18"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🍺</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Gastronómico</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Chicha de Jora Artesanal</h3> <p class="card-desc">Elabora la bebida ceremonial andina con receta de siglos. Maíz, fermentación y tradición viva en manos de la comunidad.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 18 años</span> <span class="meta-item"><span class="meta-icon">🌽</span> Degustación incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Chicha de Jora Artesanal', 30)">Reservar</button> </div> </div> </div> <!-- 14. Bote Amanecer --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="55" data-name="Amanecer en Bote al Centro del Lago" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">⛵</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Amanecer en Bote al Centro del Lago</h3> <p class="card-desc">Navega hasta el corazón del Titicaca en barca de totora y vive el amanecer más mágico de tu vida a 3,812 msnm.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">🌅</span> Sale 5:30am</span> <span class="meta-item"><span class="meta-icon">☕</span> Desayuno incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.55 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Amanecer en Bote al Centro del Lago', 55)">Reservar</button> </div> </div> </div> <!-- 15. Fotografía --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="45" data-name="Tour de Fotografía de Paisajes" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">📸</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Tour de Fotografía de Paisajes</h3> <p class="card-desc">Guía fotógrafo profesional te lleva a los miradores secretos de Capachica para capturas épicas del Titicaca y la cordillera.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">📷</span> Guía prof. incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.45 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Tour de Fotografía de Paisajes', 45)">Reservar</button> </div> </div> </div> </div><!-- /grid --> </section> </main> <!-- BOTTOM SAND WAVE --> <div class="bottom-wave"> <div class="sand-wave"></div> </div> <!-- ARENA FOOTER --> <footer class="arena-footer"> <!-- Campfires (dark mode only) --> <div class="illo-campfire" id="illoCampfire"> <div class="campfire-ground-glow"></div> <div class="illo-flame illo-flame-outer"></div> <div class="illo-flame illo-flame-mid"></div> <div class="illo-flame illo-flame-inner"></div> <div class="illo-flame illo-flame-core"></div> <div class="illo-flame illo-flame-white"></div> <div class="illo-logs"> <div class="illo-log illo-log-left"></div> <div class="illo-log illo-log-right"></div> </div> <div class="illo-ember-container" id="illoEmberContainer"></div> <div class="illo-spark-container" id="illoSparkContainer"></div> <div class="illo-smoke-container" id="illoSmokeContainer"></div> </div> <div class="illo-campfire2" id="illoCampfire2"> <div class="campfire-ground-glow"></div> <div class="illo-flame illo-flame-outer"></div> <div class="illo-flame illo-flame-mid"></div> <div class="illo-flame illo-flame-inner"></div> <div class="illo-flame illo-flame-core"></div> <div class="illo-flame illo-flame-white"></div> <div class="illo-logs"> <div class="illo-log illo-log-left"></div> <div class="illo-log illo-log-right"></div> </div> <div class="illo-ember-container" id="illoEmberContainer2"></div> <div class="illo-spark-container" id="illoSparkContainer2"></div> <div class="illo-smoke-container" id="illoSmokeContainer2"></div> </div> <!-- Beach balls (light mode only) --> <div class="beach-ball-wrap" style="bottom:22px;right:65px;"> <div class="beach-ball" style="width:100px;height:100px;--bb-dur:2.9s;--bb-delay:0s;"></div> <div class="beach-ball-shadow" style="width:100px;height:26px;"></div> </div> <div class="beach-ball-wrap" style="bottom:22px;left:65px;"> <div class="beach-ball" style="width:100px;height:100px;--bb-dur:3.3s;--bb-delay:0.55s;"></div> <div class="beach-ball-shadow" style="width:100px;height:26px;"></div> </div> <!-- Footer content --> <div class="arena-footer-body"> <div class="arena-footer-grid"> <!-- Col 1: Brand + Social --> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,812 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <!-- Col 2: Destinos --> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos/playa-llacho" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos/mirador-amaru" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos/isla-ticonata" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos/comunidad" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos/islas-flotantes" class="arena-link">Islas flotantes</a></li> <li><a href="/destinos" class="arena-link">Ver todos →</a></li> </ul> </div> <!-- Col 3: Experiencias + Info --> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencias" class="arena-link">Vivencias</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/nosotros" class="arena-link">Nosotros</a></li> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <!-- Col 4: Newsletter + Contacto --> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:12px;margin-bottom:0.8rem;line-height:1.55;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:11px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:13px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <!-- Bottom bar --> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:12px;letter-spacing:0.2px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <!-- PACKAGE SIDEBAR --> <div class="pkg-sidebar" id="pkgSidebar"> <div class="pkg-header"> <div class="pkg-title">Mi paquete personalizado</div> <button class="pkg-close" onclick="closePkg()">×</button> </div> <div class="pkg-body" id="pkgBody"> <div class="pkg-empty" id="pkgEmpty"> <div style="font-size:2.5rem;margin-bottom:8px;">🎒</div> <p>Agrega actividades para armar tu paquete ideal</p> </div> <div id="pkgList"></div> </div> <div class="pkg-footer"> <div class="pkg-persons"> <label>Personas</label> <div class="persons-control"> <button class="persons-btn" onclick="changePeople(-1)">−</button> <span class="persons-val" id="personCount">1</span> <button class="persons-btn" onclick="changePeople(1)">+</button> </div> </div> <div class="pkg-total"> <span class="pkg-total-label">Total estimado</span> <span class="pkg-total-val">S/.<span id="pkgTotal">0</span></span> </div> <button class="btn-pkg-reserve" onclick="openModal('Paquete personalizado', 0, true)">
Reservar paquete →
</button> </div> </div> <button class="pkg-fab" id="pkgFab" onclick="togglePkg()" title="Ver mi paquete">
🎒
<span class="pkg-fab-badge" id="pkgBadge">0</span> </button> <!-- MODAL DE RESERVA --> <div class="modal-overlay" id="modalOverlay" onclick="closeModal(event)"> <div class="modal"> <div class="modal-header"> <div> <div class="modal-title">Reservar actividad</div> <div class="modal-subtitle" id="modalSubtitle">Completa los datos para confirmar</div> </div> <button class="modal-close" onclick="closeModal()">×</button> </div> <div class="form-row"> <div class="form-group"> <label>Nombre completo</label> <input type="text" id="mNombre" placeholder="Tu nombre"> </div> <div class="form-group"> <label>Email</label> <input type="email" id="mEmail" placeholder="tu@email.com"> </div> </div> <div class="form-row"> <div class="form-group"> <label>Fecha de visita</label> <input type="date" id="modalDate"> </div> <div class="form-group"> <label>Personas</label> <input type="number" id="mPersonas" min="1" max="30" value="1"> </div> </div> <div class="form-row"> <div class="form-group"> <label>Idioma de atención</label> <select> <option>Español</option> <option>English</option> <option>Français</option> </select> </div> <div class="form-group"> <label>Actividad</label> <input type="text" id="modalActivity" readonly style="color:#2dd4bf;"> </div> </div> <div class="form-group"> <label>Necesidades especiales</label> <textarea rows="2" placeholder="Dieta, accesibilidad, alergias..."></textarea> </div> <div class="cancel-policy">
📋 <strong>Política de cancelación:</strong> Cancelación gratuita hasta 48h antes. Cancelaciones con menos de 24h de anticipación no son reembolsables.
</div> <div style="text-align:right;margin-bottom:1rem;"> <span style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#d4a843;">
S/.<span id="modalPrice">0</span> <span style="font-size:0.8rem;color:rgba(240,237,232,0.5);">/persona</span> </span> </div> <button class="btn-submit" onclick="submitReserva()">Confirmar reserva →</button> </div> </div> <script>
    /* ── STARS ── */
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random() * 0.65,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random(),
      speed: 0.003 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2
    }));

    function drawStars(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255, 255, 240, \${alpha})\`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    requestAnimationFrame(drawStars);

    /* ── THEME TRANSITION (triggered by Navbar's data-theme change) ── */
    const html = document.documentElement;

    // MutationObserver watches data-theme set by the shared Navbar component
    let lastTheme = html.getAttribute('data-theme') || 'dark';
    new MutationObserver(() => {
      const currentTheme = lastTheme;
      const newTheme = html.getAttribute('data-theme');
      if (newTheme === currentTheme) return;
      lastTheme = newTheme;

      // Organic wash overlay — masks the hard jump of main/footer backgrounds
      const wash = document.createElement('div');
      wash.style.cssText = 'position:fixed;inset:0;z-index:180;pointer-events:none;opacity:0;transition:opacity 0.45s ease;';
      wash.style.background = currentTheme === 'dark'
        ? 'linear-gradient(180deg,rgba(14,72,160,0.18) 0%,rgba(0,100,120,0.26) 50%,rgba(190,170,55,0.18) 100%)'
        : 'linear-gradient(180deg,rgba(4,13,28,0.26) 0%,rgba(4,58,72,0.30) 55%,rgba(26,16,8,0.18) 100%)';
      document.body.appendChild(wash);

      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

      const moon = document.querySelector('.hero-moon');
      const sky  = document.querySelector('.hero-sky');
      const glow = document.getElementById('skyGlow');
      const birds = document.getElementById('heroBirds');
      moon.classList.remove('theme-switching-down', 'theme-switching-up');
      glow.classList.remove('glow-sunrise', 'glow-sunset');
      void moon.offsetWidth;

      if (currentTheme === 'dark') {
        moon.classList.add('theme-switching-down');
        sky.classList.add('sky-transitioning');
        glow.classList.add('glow-sunrise');
        canvas.style.transition = 'opacity 2.4s cubic-bezier(0.33, 0, 0.12, 1)';
        canvas.style.opacity = '0';
        birds.classList.add('birds-fade-in');
        birds.classList.remove('birds-fade-out');
        setTimeout(() => { wash.style.opacity = '1'; }, 1900);
        setTimeout(() => {
          moon.classList.remove('theme-switching-down');
          sky.classList.remove('sky-transitioning');
          glow.classList.remove('glow-sunrise');
          void moon.offsetWidth;
          moon.classList.add('theme-switching-up');
          wash.style.transition = 'opacity 1.1s cubic-bezier(0.33, 0, 0.12, 1)';
          wash.style.opacity = '0';
          setTimeout(() => { moon.classList.remove('theme-switching-up'); wash.remove(); }, 2500);
        }, 2400);
      } else {
        moon.classList.add('theme-switching-down');
        sky.classList.add('sky-transitioning-reverse');
        glow.classList.add('glow-sunset');
        canvas.style.transition = 'opacity 1.2s cubic-bezier(0.33, 0, 0.12, 1)';
        canvas.style.opacity = '1';
        birds.classList.add('birds-fade-out');
        birds.classList.remove('birds-fade-in');
        setTimeout(() => { wash.style.opacity = '1'; }, 1900);
        setTimeout(() => {
          moon.classList.remove('theme-switching-down');
          sky.classList.remove('sky-transitioning-reverse');
          glow.classList.remove('glow-sunset');
          void moon.offsetWidth;
          moon.classList.add('theme-switching-up');
          wash.style.transition = 'opacity 1.1s cubic-bezier(0.33, 0, 0.12, 1)';
          wash.style.opacity = '0';
          setTimeout(() => { moon.classList.remove('theme-switching-up'); wash.remove(); }, 2500);
        }, 2400);
      }
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    /* ── LANG BUTTONS (removed — now in Navbar) ── */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('lang', btn.id.split('-')[1]);
      });
    });
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('lang-' + savedLang);
      if (btn) btn.classList.add('active');
    }

    /* ── REVEAL ON SCROLL ── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 40);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => observer.observe(el));

    /* ── FILTERS ── */
    let activeCat = 'all';

    document.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCat = pill.dataset.cat;
        applyFilters();
      });
    });

    document.getElementById('diffFilter').addEventListener('change', applyFilters);
    document.getElementById('durFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);

    function applyFilters() {
      const diff = document.getElementById('diffFilter').value;
      const dur  = document.getElementById('durFilter').value;
      const price = document.getElementById('priceFilter').value;
      const cards = document.querySelectorAll('.activity-card');
      let count = 0;
      cards.forEach(card => {
        const catOk  = activeCat === 'all' || card.dataset.cat === activeCat;
        const diffOk = diff === 'all' || card.dataset.diff === diff;
        const durOk  = dur === 'all' || card.dataset.dur === dur;
        const p = parseInt(card.dataset.price);
        const priceOk = price === 'all' ||
          (price === 'cheap' && p <= 40) ||
          (price === 'mid' && p > 40 && p <= 80) ||
          (price === 'premium' && p > 80);
        const show = catOk && diffOk && durOk && priceOk;
        card.classList.toggle('hidden', !show);
        if (show) count++;
      });
      document.getElementById('countNum').textContent = count;
    }

    /* ── PACKAGE ── */
    let pkgItems = [];
    let persons = 1;

    function addToPackage(btn) {
      const card = btn.closest('.activity-card');
      const name  = card.dataset.name;
      const price = parseInt(card.dataset.price);
      if (pkgItems.find(i => i.name === name)) {
        btn.textContent = '✓ Agregado';
        btn.classList.add('added');
        return;
      }
      pkgItems.push({ name, price });
      btn.textContent = '✓ En paquete';
      btn.classList.add('added');
      renderPkg();
      if (pkgItems.length === 1) openPkg();
      updateFabBadge();
    }

    function renderPkg() {
      const list = document.getElementById('pkgList');
      const empty = document.getElementById('pkgEmpty');
      empty.style.display = pkgItems.length ? 'none' : 'block';
      list.innerHTML = pkgItems.map((item, i) => \`
        <div class="pkg-item">
          <span class="pkg-item-name">\${item.name}</span>
          <span class="pkg-item-price">S/.\${item.price}</span>
          <button class="pkg-item-remove" onclick="removePkgItem(\${i})">✕</button>
        </div>
      \`).join('');
      calcTotal();
    }

    function removePkgItem(i) {
      const name = pkgItems[i].name;
      pkgItems.splice(i, 1);
      // Re-enable button
      document.querySelectorAll('.activity-card').forEach(card => {
        if (card.dataset.name === name) {
          const btn = card.querySelector('.btn-add');
          btn.textContent = '+ Paquete';
          btn.classList.remove('added');
        }
      });
      renderPkg();
      updateFabBadge();
    }

    function calcTotal() {
      const sum = pkgItems.reduce((a, b) => a + b.price, 0);
      document.getElementById('pkgTotal').textContent = sum * persons;
    }

    function changePeople(delta) {
      persons = Math.max(1, Math.min(20, persons + delta));
      document.getElementById('personCount').textContent = persons;
      calcTotal();
    }

    function openPkg() { document.getElementById('pkgSidebar').classList.add('open'); }
    function closePkg() { document.getElementById('pkgSidebar').classList.remove('open'); }
    function togglePkg() { document.getElementById('pkgSidebar').classList.toggle('open'); }

    function updateFabBadge() {
      const badge = document.getElementById('pkgBadge');
      badge.textContent = pkgItems.length;
      badge.style.display = pkgItems.length ? 'flex' : 'none';
    }

    /* ── MODAL ── */
    function openModal(name, price, isPkg = false) {
      const overlay = document.getElementById('modalOverlay');
      document.getElementById('modalActivity').value = name;
      document.getElementById('modalPrice').textContent = isPkg
        ? pkgItems.reduce((a,b) => a+b.price, 0) * persons
        : price;
      document.getElementById('modalSubtitle').textContent = isPkg
        ? \`Paquete de \${pkgItems.length} actividades · \${persons} persona(s)\`
        : name;
      const dateInput = document.getElementById('modalDate');
      dateInput.min = new Date().toISOString().split('T')[0];
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(e) {
      if (!e || e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    async function submitReserva() {
      // Usar IDs específicos para evitar selectors frágiles
      const nombreEl   = document.getElementById('mNombre');
      const emailEl    = document.getElementById('mEmail');
      const fechaEl    = document.getElementById('modalDate');
      const personasEl = document.getElementById('mPersonas');
      const actividad  = document.getElementById('modalActivity').value;

      const nombre   = nombreEl  ? nombreEl.value.trim()  : '';
      const email    = emailEl   ? emailEl.value.trim()   : '';
      const fecha    = fechaEl   ? fechaEl.value           : '';
      const personas = personasEl? personasEl.value        : '1';

      // Limpiar errores previos
      [nombreEl, emailEl, fechaEl].forEach(el => el && el.classList.remove('input-error'));

      let valid = true;
      if (!nombre) { nombreEl && nombreEl.classList.add('input-error'); valid = false; }
      if (!email || !email.includes('@')) { emailEl && emailEl.classList.add('input-error'); valid = false; }
      if (!fecha) { fechaEl && fechaEl.classList.add('input-error'); valid = false; }
      if (!valid) {
        showToast('⚠️ Completa los campos requeridos');
        return;
      }

      const btn = document.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = '⏳ Enviando...';
      btn.disabled = true;

      try {
        const precioEl = document.getElementById('modalPrice');
        const precio = precioEl ? parseInt(precioEl.textContent) || 0 : 0;
        const esPaquete = actividad.includes('Paquete') || actividad.includes('paquete');

        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre, email,
            fecha_visita:        fecha,
            personas:            parseInt(personas) || 1,
            actividad,
            precio_total:        precio,
            es_paquete:          esPaquete,
            actividades_paquete: esPaquete ? pkgItems : null,
          }),
        });

        const data = await res.json();

        if (data.success) {
          document.getElementById('modalOverlay').classList.remove('open');
          document.body.style.overflow = '';
          const shortId = data.reserva_id ? data.reserva_id.slice(0,8).toUpperCase() : '—';
          showToast('🎉 ¡Reserva guardada! ID: ' + shortId);
          if (esPaquete) { pkgItems = []; renderPkg(); updateFabBadge(); }
          // Limpiar form
          [nombreEl, emailEl, fechaEl].forEach(el => el && (el.value = ''));
        } else {
          showToast('❌ ' + (data.error || 'Error al guardar'));
        }
      } catch(err) {
        console.error('submitReserva error:', err);
        showToast('❌ Error de conexión. Verifica que el servidor esté activo.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }

    // Toast helper (si no existe ya)
    function showToast(msg) {
      let t = document.getElementById('toast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(16px);background:rgba(10,22,40,0.97);border:1px solid rgba(45,212,191,0.35);border-radius:12px;padding:13px 22px;font-size:15px;color:#f0ede8;opacity:0;pointer-events:none;transition:all 0.4s;z-index:600;backdrop-filter:blur(12px);white-space:nowrap;';
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
      clearTimeout(t._timer);
      t._timer = setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateX(-50%) translateY(16px)';
      }, 3800);
    }
        /* ── PARTICLES: EMBERS + SPARKS + SMOKE (ENHANCED) ── */
    (function initParticles() {
      const colors = ['#ff5500', '#ff8800', '#ffbb00', '#ff4400', '#ff7700', '#ffaa00', '#ff3300', '#ffcc00'];

      function fillCampfire(emberId, sparkId, smokeId) {
        const emberContainer = document.getElementById(emberId);
        if (emberContainer) {
          for (let i = 0; i < 18; i++) {
            const ember = document.createElement('div');
            ember.className = 'illo-ember';
            ember.style.setProperty('--ember-color', colors[i % colors.length]);
            ember.style.setProperty('--dur', (2.0 + Math.random() * 3.0) + 's');
            ember.style.setProperty('--delay', (Math.random() * 4.0) + 's');
            ember.style.setProperty('--dx1', (Math.random() * 24 - 12) + 'px');
            ember.style.setProperty('--dx2', (Math.random() * 28 - 14) + 'px');
            ember.style.setProperty('--dx3', (Math.random() * 20 - 10) + 'px');
            ember.style.setProperty('--drift', (Math.random() * 36 - 18) + 'px');
            ember.style.left = (Math.random() * 50 + 10) + '%';
            const size = 2 + Math.floor(Math.random() * 5);
            ember.style.width = size + 'px';
            ember.style.height = size + 'px';
            emberContainer.appendChild(ember);
          }
        }
        const sparkContainer = document.getElementById(sparkId);
        if (sparkContainer) {
          for (let i = 0; i < 14; i++) {
            const spark = document.createElement('div');
            spark.className = 'illo-spark';
            spark.style.setProperty('--sdur', (0.4 + Math.random() * 0.6) + 's');
            spark.style.setProperty('--sdelay', (Math.random() * 3.0) + 's');
            spark.style.setProperty('--sdx1', (Math.random() * 14 - 7) + 'px');
            spark.style.setProperty('--sdx2', (Math.random() * 18 - 9) + 'px');
            spark.style.setProperty('--sdrift', (Math.random() * 26 - 13) + 'px');
            spark.style.left = (Math.random() * 45 + 8) + '%';
            sparkContainer.appendChild(spark);
          }
        }
        const smokeContainer = document.getElementById(smokeId);
        if (smokeContainer) {
          for (let i = 0; i < 8; i++) {
            const wisp = document.createElement('div');
            wisp.className = 'illo-smoke';
            wisp.style.setProperty('--smdur', (4 + Math.random() * 4) + 's');
            wisp.style.setProperty('--smdelay', (Math.random() * 5) + 's');
            wisp.style.setProperty('--smx1', (Math.random() * 16 - 8) + 'px');
            wisp.style.setProperty('--smx2', (Math.random() * 24 - 12) + 'px');
            wisp.style.setProperty('--smdrift', (6 + Math.random() * 28) + 'px');
            wisp.style.left = (Math.random() * 35 + 5) + '%';
            const size = 5 + Math.floor(Math.random() * 12);
            wisp.style.width = size + 'px';
            wisp.style.height = size + 'px';
            smokeContainer.appendChild(wisp);
          }
        }
      }

      fillCampfire('illoEmberContainer',  'illoSparkContainer',  'illoSmokeContainer');
      fillCampfire('illoEmberContainer2', 'illoSparkContainer2', 'illoSmokeContainer2');
    })();

    /* ── NEWSLETTER FORM ── */
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
          setTimeout(() => input.style.borderColor = '', 1200);
          return;
        }
        btn.disabled = true;
        btn.textContent = 'Enviando…';
        try {
          const res = await fetch('http://localhost:3030/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!data.success) { alert(data.message || 'Error al suscribirse'); btn.disabled = false; btn.textContent = 'Suscribirme'; return; }
        } catch { /* backend not available — show success anyway */ }
        form.style.display = 'none';
        msg.style.display = 'block';
      }

      btn.addEventListener('click', subscribe);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });
    })();

    /* ── FLYING BIRDS ── */
    (function initBirds() {
      const container = document.getElementById('heroBirds');
      if (!container) return;

      const birds = [
        { id: 1, w: 60, stroke: 2.5, flap: 'flapSlow', dur: '1.5s', top: '10%', left: '8%',  float: 'birdFloat1', floatDur: '8s' },
        { id: 2, w: 48, stroke: 2.0, flap: 'flapMed',  dur: '1.1s', top: '16%', left: '72%', float: 'birdFloat2', floatDur: '10s' },
        { id: 3, w: 54, stroke: 2.2, flap: 'flapFast', dur: '0.8s', top: '22%', left: '28%', float: 'birdFloat3', floatDur: '7s' },
        { id: 4, w: 40, stroke: 1.8, flap: 'flapSlow', dur: '1.4s', top: '8%',  left: '88%', float: 'birdFloat4', floatDur: '11s' },
        { id: 5, w: 52, stroke: 2.2, flap: 'flapMed',  dur: '1.2s', top: '28%', left: '50%', float: 'birdFloat5', floatDur: '9s' },
        { id: 6, w: 36, stroke: 1.6, flap: 'flapFast', dur: '0.75s',top: '14%', left: '42%', float: 'birdFloat6', floatDur: '12s' },
        { id: 7, w: 46, stroke: 2.0, flap: 'flapSlow', dur: '1.6s', top: '18%', left: '15%', float: 'birdFloat7', floatDur: '8.5s' },
      ];

      birds.forEach(b => {
        const el = document.createElement('div');
        el.className = 'bird';
        el.style.position = 'absolute';
        el.style.top = b.top;
        el.style.left = b.left;
        el.style.animation = b.float + ' ' + b.floatDur + ' ease-in-out infinite';
        el.style.willChange = 'transform';
        const h = b.w * 0.45;
        const cx = b.w / 2;
        const cy = h * 0.6;
        const wingUp = cy - h * 0.7;
        const wingMid = cy + h * 0.1;

        el.innerHTML = \`<svg width="\${b.w}" height="\${h}" viewBox="0 0 \${b.w} \${h}" fill="none">
          <path d="M\${cx} \${cy} Q\${cx - b.w*0.3} \${wingUp} 2 \${wingMid}"
                stroke="currentColor" stroke-width="\${b.stroke}" stroke-linecap="round" fill="none"
                style="animation:\${b.flap} \${b.dur} ease-in-out infinite;transform-origin:\${cx}px \${cy}px"/>
          <path d="M\${cx} \${cy} Q\${cx + b.w*0.3} \${wingUp} \${b.w - 2} \${wingMid}"
                stroke="currentColor" stroke-width="\${b.stroke}" stroke-linecap="round" fill="none"
                style="animation:\${b.flap} \${b.dur} ease-in-out infinite;transform-origin:\${cx}px \${cy}px;animation-delay:0.06s"/>
        </svg>\`;
        container.appendChild(el);
      });
    })();
  <\/script> </body> </html>`], ['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Actividades · Capachica Turismo</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">', "</head> <body> <!-- NAV --> ", ` <!-- HERO --> <section class="hero"> <div class="hero-sky"></div> <div class="sky-glow" id="skyGlow"></div> <canvas class="stars-layer" id="starsCanvas"></canvas> <!-- Flying birds --> <div class="hero-birds" id="heroBirds"></div> <div class="hero-moon"></div> <div class="hero-content"> <div class="hero-badge">Actividades · Capachica · 3,812 msnm</div> <h1 class="hero-title">
Nuestras
<em>Actividades</em> </h1> <p class="hero-subtitle">
Aventura, cultura y naturaleza a orillas del lago más alto del mundo.
        Cada actividad es una ventana al alma del Titicaca.
</p> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">15+</div> <div class="stat-label">Actividades</div> </div> <div class="stat-item"> <div class="stat-val">3,812</div> <div class="stat-label">msnm</div> </div> <div class="stat-item"> <div class="stat-val">4.9 ★</div> <div class="stat-label">Valoración</div> </div> <div class="stat-item"> <div class="stat-val">Todo</div> <div class="stat-label">El año</div> </div> </div> </div> <div class="hero-waves"> <div class="wave wave-water"></div> <div class="wave wave-sand"></div> </div> </section> <!-- MAIN --> <main> <!-- FILTERS --> <section class="filter-section"> <div class="filter-section-header reveal"> <div> <div class="section-eyebrow">Experiencias únicas</div> <h2 class="section-title">Elige tu aventura</h2> </div> <div class="result-count"> <span id="countNum">15</span> actividades
</div> </div> <div class="filter-pills reveal"> <button class="pill active" data-cat="all"> <span class="pill-emoji">🌊</span> Todas
</button> <button class="pill" data-cat="aquatic"> <span class="pill-emoji">🚣</span> Acuáticas
</button> <button class="pill" data-cat="terrestrial"> <span class="pill-emoji">🏔️</span> Terrestres
</button> <button class="pill" data-cat="cultural"> <span class="pill-emoji">🎨</span> Culturales
</button> <button class="pill" data-cat="gastro"> <span class="pill-emoji">🍽️</span> Gastronómicas
</button> </div> <div class="filter-selects reveal"> <select class="filter-select" id="diffFilter"> <option value="all">Dificultad: Todas</option> <option value="easy">Fácil</option> <option value="medium">Moderada</option> <option value="hard">Exigente</option> </select> <select class="filter-select" id="durFilter"> <option value="all">Duración: Todas</option> <option value="2h">2 horas</option> <option value="half">Medio día</option> <option value="full">Día completo</option> </select> <select class="filter-select" id="priceFilter"> <option value="all">Precio: Todos</option> <option value="cheap">Hasta S/.40</option> <option value="mid">S/.40 – S/.80</option> <option value="premium">Más de S/.80</option> </select> </div> </section> <!-- ACTIVITIES GRID --> <section class="activities-section"> <div class="activities-grid" id="activitiesGrid"> <!-- 1. Kayak --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="medium" data-dur="half" data-price-tier="mid" data-price="60" data-name="Kayak en el Titicaca" data-age="10"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🚣</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Kayak en el Titicaca</h3> <p class="card-desc">Navega las aguas sagradas del lago más alto del mundo en kayak, rodeado de totorales y el silencio del altiplano.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 10 años</span> <span class="meta-item"><span class="meta-icon">🎒</span> Equipo incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.60 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Kayak en el Titicaca', 60)">Reservar</button> </div> </div> </div> <!-- 2. Ciclismo --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="medium" data-dur="full" data-price-tier="mid" data-price="55" data-name="Ciclismo Panorámico 35km" data-age="14"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🚴</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Ciclismo Panorámico 35km</h3> <p class="card-desc">Recorre la peninsula entera en bicicleta con vistas impresionantes al lago Titicaca, comunidades y campos de quinua.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Día completo</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 14 años</span> <span class="meta-item"><span class="meta-icon">🚲</span> Bici incluida</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.55 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Ciclismo Panorámico 35km', 55)">Reservar</button> </div> </div> </div> <!-- 3. Pesca --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="easy" data-dur="half" data-price-tier="cheap" data-price="35" data-name="Pesca Artesanal al Amanecer" data-age="6"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🎣</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Pesca Artesanal al Amanecer</h3> <p class="card-desc">Acompaña a pescadores locales en sus balsas de totora al rayar el alba. La trucha del Titicaca como protagonista.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 6 años</span> <span class="meta-item"><span class="meta-icon">🌅</span> Sale 5am</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Pesca Artesanal al Amanecer', 35)">Reservar</button> </div> </div> </div> <!-- 4. Senderismo --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="hard" data-dur="full" data-price-tier="mid" data-price="45" data-name="Senderismo al Mirador 4000m" data-age="12"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🥾</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-hard">Exigente</span> </div> <h3 class="card-title">Senderismo al Mirador del Amaru</h3> <p class="card-desc">Asciende hasta 4,000 msnm con guía local. Vistas panorámicas 360° del Titicaca, la península y la cordillera boliviana.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Día completo</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 12 años</span> <span class="meta-item"><span class="meta-icon">🧗</span> Guía incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.45 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Senderismo al Mirador del Amaru', 45)">Reservar</button> </div> </div> </div> <!-- 5. Aves --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="half" data-price-tier="cheap" data-price="30" data-name="Avistamiento de Aves" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🦅</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Avistamiento de Aves</h3> <p class="card-desc">Descubre el flamenco andino, el pato de los torrentes y más de 60 especies que habitan los totorales del Titicaca.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🔭</span> Binoculares incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Avistamiento de Aves', 30)">Reservar</button> </div> </div> </div> <!-- 6. Tejido --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="35" data-name="Taller de Tejido de Alpaca" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🧶</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Tejido de Alpaca</h3> <p class="card-desc">Aprende la técnica milenaria del telar de cintura con artesanas de la comunidad. Te llevas la pieza que creas.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🎁</span> Pieza incluida</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Tejido de Alpaca', 35)">Reservar</button> </div> </div> </div> <!-- 7. Cocina --> <div class="activity-card cat-gastro reveal" data-cat="gastro" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="50" data-name="Taller de Cocina Andina" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🫕</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Gastronómico</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Cocina Andina</h3> <p class="card-desc">Prepara trucha al ají amarillo, chairo y quinua con madres de familia locales en fogón de leña. Almuerzo incluido.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🍽️</span> Almuerzo incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.50 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Cocina Andina', 50)">Reservar</button> </div> </div> </div> <!-- 8. Estrellas --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="40" data-name="Observación de Estrellas" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🔭</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Noche de Estrellas 3,812m</h3> <p class="card-desc">El cielo nocturno del altiplano es inigualable. Telescopios, guía astronómico y mate de coca bajo la Vía Láctea.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2-3 horas</span> <span class="meta-item"><span class="meta-icon">🌙</span> Horario nocturno</span> <span class="meta-item"><span class="meta-icon">☕</span> Bebidas incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.40 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Noche de Estrellas 3812m', 40)">Reservar</button> </div> </div> </div> <!-- 9. Aimara --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="25" data-name="Clase de Idioma Aimara" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🗣️</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Clase de Idioma Aimara</h3> <p class="card-desc">Aprende frases esenciales del aimara, idioma ancestral del altiplano. Saludos, números, colores y palabras del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">📖</span> Manual incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.25 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Clase de Idioma Aimara', 25)">Reservar</button> </div> </div> </div> <!-- 10. Instrumentos --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="30" data-name="Taller de Instrumentos Andinos" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🎵</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Taller de Instrumentos Andinos</h3> <p class="card-desc">Zampoña, quena y bombo en manos de músicos de la comunidad. Aprende melodías del lago y te llevas recuerdo sonoro.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">🎶</span> Grabación incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Taller de Instrumentos Andinos', 30)">Reservar</button> </div> </div> </div> <!-- 11. Snorkel --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="medium" data-dur="half" data-price-tier="mid" data-price="70" data-name="Snorkel en el Titicaca" data-age="12"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🤿</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-medium">Moderado</span> </div> <h3 class="card-title">Snorkel en el Titicaca</h3> <p class="card-desc">Sumerge en las cristalinas aguas del Titicaca y descubre el ecosistema subacuático único de la rana gigante del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 12 años</span> <span class="meta-item"><span class="meta-icon">🌊</span> Traje incluido</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.70 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Snorkel en el Titicaca', 70)">Reservar</button> </div> </div> </div> <!-- 12. Pachamama --> <div class="activity-card cat-cultural reveal" data-cat="cultural" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="35" data-name="Ceremonia Pachamama" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🌿</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Cultural</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Ceremonia Pachamama</h3> <p class="card-desc">Participa en el ritual ancestral de ofrenda a la Madre Tierra con un yatiri (sabio andino) a la orilla del lago.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">🌄</span> Al atardecer</span> <span class="meta-item"><span class="meta-icon">🙏</span> Ceremonial</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.35 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Ceremonia Pachamama', 35)">Reservar</button> </div> </div> </div> <!-- 13. Chicha --> <div class="activity-card cat-gastro reveal" data-cat="gastro" data-diff="easy" data-dur="2h" data-price-tier="cheap" data-price="30" data-name="Elaboración de Chicha de Jora" data-age="18"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">🍺</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Gastronómico</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Chicha de Jora Artesanal</h3> <p class="card-desc">Elabora la bebida ceremonial andina con receta de siglos. Maíz, fermentación y tradición viva en manos de la comunidad.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> 2 horas</span> <span class="meta-item"><span class="meta-icon">👤</span> Mín. 18 años</span> <span class="meta-item"><span class="meta-icon">🌽</span> Degustación incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.30 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Chicha de Jora Artesanal', 30)">Reservar</button> </div> </div> </div> <!-- 14. Bote Amanecer --> <div class="activity-card cat-aquatic reveal" data-cat="aquatic" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="55" data-name="Amanecer en Bote al Centro del Lago" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">⛵</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Acuático</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Amanecer en Bote al Centro del Lago</h3> <p class="card-desc">Navega hasta el corazón del Titicaca en barca de totora y vive el amanecer más mágico de tu vida a 3,812 msnm.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">🌅</span> Sale 5:30am</span> <span class="meta-item"><span class="meta-icon">☕</span> Desayuno incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.55 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Amanecer en Bote al Centro del Lago', 55)">Reservar</button> </div> </div> </div> <!-- 15. Fotografía --> <div class="activity-card cat-terrestrial reveal" data-cat="terrestrial" data-diff="easy" data-dur="half" data-price-tier="mid" data-price="45" data-name="Tour de Fotografía de Paisajes" data-age="0"> <div class="card-img"> <div class="card-img-bg"></div> <span class="card-emoji">📸</span> </div> <div class="card-body"> <div class="card-tags"> <span class="tag tag-cat">Terrestre</span> <span class="tag tag-diff-easy">Fácil</span> </div> <h3 class="card-title">Tour de Fotografía de Paisajes</h3> <p class="card-desc">Guía fotógrafo profesional te lleva a los miradores secretos de Capachica para capturas épicas del Titicaca y la cordillera.</p> <div class="card-meta"> <span class="meta-item"><span class="meta-icon">⏱️</span> Medio día</span> <span class="meta-item"><span class="meta-icon">👤</span> Todas las edades</span> <span class="meta-item"><span class="meta-icon">📷</span> Guía prof. incl.</span> </div> <div class="card-footer"> <div> <div class="card-price">S/.45 <span>/persona</span></div> </div> <button class="btn-add" onclick="addToPackage(this)">+ Paquete</button> <button class="btn-reserve" onclick="openModal('Tour de Fotografía de Paisajes', 45)">Reservar</button> </div> </div> </div> </div><!-- /grid --> </section> </main> <!-- BOTTOM SAND WAVE --> <div class="bottom-wave"> <div class="sand-wave"></div> </div> <!-- ARENA FOOTER --> <footer class="arena-footer"> <!-- Campfires (dark mode only) --> <div class="illo-campfire" id="illoCampfire"> <div class="campfire-ground-glow"></div> <div class="illo-flame illo-flame-outer"></div> <div class="illo-flame illo-flame-mid"></div> <div class="illo-flame illo-flame-inner"></div> <div class="illo-flame illo-flame-core"></div> <div class="illo-flame illo-flame-white"></div> <div class="illo-logs"> <div class="illo-log illo-log-left"></div> <div class="illo-log illo-log-right"></div> </div> <div class="illo-ember-container" id="illoEmberContainer"></div> <div class="illo-spark-container" id="illoSparkContainer"></div> <div class="illo-smoke-container" id="illoSmokeContainer"></div> </div> <div class="illo-campfire2" id="illoCampfire2"> <div class="campfire-ground-glow"></div> <div class="illo-flame illo-flame-outer"></div> <div class="illo-flame illo-flame-mid"></div> <div class="illo-flame illo-flame-inner"></div> <div class="illo-flame illo-flame-core"></div> <div class="illo-flame illo-flame-white"></div> <div class="illo-logs"> <div class="illo-log illo-log-left"></div> <div class="illo-log illo-log-right"></div> </div> <div class="illo-ember-container" id="illoEmberContainer2"></div> <div class="illo-spark-container" id="illoSparkContainer2"></div> <div class="illo-smoke-container" id="illoSmokeContainer2"></div> </div> <!-- Beach balls (light mode only) --> <div class="beach-ball-wrap" style="bottom:22px;right:65px;"> <div class="beach-ball" style="width:100px;height:100px;--bb-dur:2.9s;--bb-delay:0s;"></div> <div class="beach-ball-shadow" style="width:100px;height:26px;"></div> </div> <div class="beach-ball-wrap" style="bottom:22px;left:65px;"> <div class="beach-ball" style="width:100px;height:100px;--bb-dur:3.3s;--bb-delay:0.55s;"></div> <div class="beach-ball-shadow" style="width:100px;height:26px;"></div> </div> <!-- Footer content --> <div class="arena-footer-body"> <div class="arena-footer-grid"> <!-- Col 1: Brand + Social --> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,812 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <!-- Col 2: Destinos --> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos/playa-llacho" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos/mirador-amaru" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos/isla-ticonata" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos/comunidad" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos/islas-flotantes" class="arena-link">Islas flotantes</a></li> <li><a href="/destinos" class="arena-link">Ver todos →</a></li> </ul> </div> <!-- Col 3: Experiencias + Info --> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencias" class="arena-link">Vivencias</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/nosotros" class="arena-link">Nosotros</a></li> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <!-- Col 4: Newsletter + Contacto --> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:12px;margin-bottom:0.8rem;line-height:1.55;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:11px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:13px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <!-- Bottom bar --> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:12px;letter-spacing:0.2px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <!-- PACKAGE SIDEBAR --> <div class="pkg-sidebar" id="pkgSidebar"> <div class="pkg-header"> <div class="pkg-title">Mi paquete personalizado</div> <button class="pkg-close" onclick="closePkg()">×</button> </div> <div class="pkg-body" id="pkgBody"> <div class="pkg-empty" id="pkgEmpty"> <div style="font-size:2.5rem;margin-bottom:8px;">🎒</div> <p>Agrega actividades para armar tu paquete ideal</p> </div> <div id="pkgList"></div> </div> <div class="pkg-footer"> <div class="pkg-persons"> <label>Personas</label> <div class="persons-control"> <button class="persons-btn" onclick="changePeople(-1)">−</button> <span class="persons-val" id="personCount">1</span> <button class="persons-btn" onclick="changePeople(1)">+</button> </div> </div> <div class="pkg-total"> <span class="pkg-total-label">Total estimado</span> <span class="pkg-total-val">S/.<span id="pkgTotal">0</span></span> </div> <button class="btn-pkg-reserve" onclick="openModal('Paquete personalizado', 0, true)">
Reservar paquete →
</button> </div> </div> <button class="pkg-fab" id="pkgFab" onclick="togglePkg()" title="Ver mi paquete">
🎒
<span class="pkg-fab-badge" id="pkgBadge">0</span> </button> <!-- MODAL DE RESERVA --> <div class="modal-overlay" id="modalOverlay" onclick="closeModal(event)"> <div class="modal"> <div class="modal-header"> <div> <div class="modal-title">Reservar actividad</div> <div class="modal-subtitle" id="modalSubtitle">Completa los datos para confirmar</div> </div> <button class="modal-close" onclick="closeModal()">×</button> </div> <div class="form-row"> <div class="form-group"> <label>Nombre completo</label> <input type="text" id="mNombre" placeholder="Tu nombre"> </div> <div class="form-group"> <label>Email</label> <input type="email" id="mEmail" placeholder="tu@email.com"> </div> </div> <div class="form-row"> <div class="form-group"> <label>Fecha de visita</label> <input type="date" id="modalDate"> </div> <div class="form-group"> <label>Personas</label> <input type="number" id="mPersonas" min="1" max="30" value="1"> </div> </div> <div class="form-row"> <div class="form-group"> <label>Idioma de atención</label> <select> <option>Español</option> <option>English</option> <option>Français</option> </select> </div> <div class="form-group"> <label>Actividad</label> <input type="text" id="modalActivity" readonly style="color:#2dd4bf;"> </div> </div> <div class="form-group"> <label>Necesidades especiales</label> <textarea rows="2" placeholder="Dieta, accesibilidad, alergias..."></textarea> </div> <div class="cancel-policy">
📋 <strong>Política de cancelación:</strong> Cancelación gratuita hasta 48h antes. Cancelaciones con menos de 24h de anticipación no son reembolsables.
</div> <div style="text-align:right;margin-bottom:1rem;"> <span style="font-family:'Playfair Display',serif;font-size:1.5rem;color:#d4a843;">
S/.<span id="modalPrice">0</span> <span style="font-size:0.8rem;color:rgba(240,237,232,0.5);">/persona</span> </span> </div> <button class="btn-submit" onclick="submitReserva()">Confirmar reserva →</button> </div> </div> <script>
    /* ── STARS ── */
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random() * 0.65,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random(),
      speed: 0.003 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2
    }));

    function drawStars(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = \\\`rgba(255, 255, 240, \\\${alpha})\\\`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    requestAnimationFrame(drawStars);

    /* ── THEME TRANSITION (triggered by Navbar's data-theme change) ── */
    const html = document.documentElement;

    // MutationObserver watches data-theme set by the shared Navbar component
    let lastTheme = html.getAttribute('data-theme') || 'dark';
    new MutationObserver(() => {
      const currentTheme = lastTheme;
      const newTheme = html.getAttribute('data-theme');
      if (newTheme === currentTheme) return;
      lastTheme = newTheme;

      // Organic wash overlay — masks the hard jump of main/footer backgrounds
      const wash = document.createElement('div');
      wash.style.cssText = 'position:fixed;inset:0;z-index:180;pointer-events:none;opacity:0;transition:opacity 0.45s ease;';
      wash.style.background = currentTheme === 'dark'
        ? 'linear-gradient(180deg,rgba(14,72,160,0.18) 0%,rgba(0,100,120,0.26) 50%,rgba(190,170,55,0.18) 100%)'
        : 'linear-gradient(180deg,rgba(4,13,28,0.26) 0%,rgba(4,58,72,0.30) 55%,rgba(26,16,8,0.18) 100%)';
      document.body.appendChild(wash);

      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

      const moon = document.querySelector('.hero-moon');
      const sky  = document.querySelector('.hero-sky');
      const glow = document.getElementById('skyGlow');
      const birds = document.getElementById('heroBirds');
      moon.classList.remove('theme-switching-down', 'theme-switching-up');
      glow.classList.remove('glow-sunrise', 'glow-sunset');
      void moon.offsetWidth;

      if (currentTheme === 'dark') {
        moon.classList.add('theme-switching-down');
        sky.classList.add('sky-transitioning');
        glow.classList.add('glow-sunrise');
        canvas.style.transition = 'opacity 2.4s cubic-bezier(0.33, 0, 0.12, 1)';
        canvas.style.opacity = '0';
        birds.classList.add('birds-fade-in');
        birds.classList.remove('birds-fade-out');
        setTimeout(() => { wash.style.opacity = '1'; }, 1900);
        setTimeout(() => {
          moon.classList.remove('theme-switching-down');
          sky.classList.remove('sky-transitioning');
          glow.classList.remove('glow-sunrise');
          void moon.offsetWidth;
          moon.classList.add('theme-switching-up');
          wash.style.transition = 'opacity 1.1s cubic-bezier(0.33, 0, 0.12, 1)';
          wash.style.opacity = '0';
          setTimeout(() => { moon.classList.remove('theme-switching-up'); wash.remove(); }, 2500);
        }, 2400);
      } else {
        moon.classList.add('theme-switching-down');
        sky.classList.add('sky-transitioning-reverse');
        glow.classList.add('glow-sunset');
        canvas.style.transition = 'opacity 1.2s cubic-bezier(0.33, 0, 0.12, 1)';
        canvas.style.opacity = '1';
        birds.classList.add('birds-fade-out');
        birds.classList.remove('birds-fade-in');
        setTimeout(() => { wash.style.opacity = '1'; }, 1900);
        setTimeout(() => {
          moon.classList.remove('theme-switching-down');
          sky.classList.remove('sky-transitioning-reverse');
          glow.classList.remove('glow-sunset');
          void moon.offsetWidth;
          moon.classList.add('theme-switching-up');
          wash.style.transition = 'opacity 1.1s cubic-bezier(0.33, 0, 0.12, 1)';
          wash.style.opacity = '0';
          setTimeout(() => { moon.classList.remove('theme-switching-up'); wash.remove(); }, 2500);
        }, 2400);
      }
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    /* ── LANG BUTTONS (removed — now in Navbar) ── */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('lang', btn.id.split('-')[1]);
      });
    });
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      const btn = document.getElementById('lang-' + savedLang);
      if (btn) btn.classList.add('active');
    }

    /* ── REVEAL ON SCROLL ── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 40);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => observer.observe(el));

    /* ── FILTERS ── */
    let activeCat = 'all';

    document.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCat = pill.dataset.cat;
        applyFilters();
      });
    });

    document.getElementById('diffFilter').addEventListener('change', applyFilters);
    document.getElementById('durFilter').addEventListener('change', applyFilters);
    document.getElementById('priceFilter').addEventListener('change', applyFilters);

    function applyFilters() {
      const diff = document.getElementById('diffFilter').value;
      const dur  = document.getElementById('durFilter').value;
      const price = document.getElementById('priceFilter').value;
      const cards = document.querySelectorAll('.activity-card');
      let count = 0;
      cards.forEach(card => {
        const catOk  = activeCat === 'all' || card.dataset.cat === activeCat;
        const diffOk = diff === 'all' || card.dataset.diff === diff;
        const durOk  = dur === 'all' || card.dataset.dur === dur;
        const p = parseInt(card.dataset.price);
        const priceOk = price === 'all' ||
          (price === 'cheap' && p <= 40) ||
          (price === 'mid' && p > 40 && p <= 80) ||
          (price === 'premium' && p > 80);
        const show = catOk && diffOk && durOk && priceOk;
        card.classList.toggle('hidden', !show);
        if (show) count++;
      });
      document.getElementById('countNum').textContent = count;
    }

    /* ── PACKAGE ── */
    let pkgItems = [];
    let persons = 1;

    function addToPackage(btn) {
      const card = btn.closest('.activity-card');
      const name  = card.dataset.name;
      const price = parseInt(card.dataset.price);
      if (pkgItems.find(i => i.name === name)) {
        btn.textContent = '✓ Agregado';
        btn.classList.add('added');
        return;
      }
      pkgItems.push({ name, price });
      btn.textContent = '✓ En paquete';
      btn.classList.add('added');
      renderPkg();
      if (pkgItems.length === 1) openPkg();
      updateFabBadge();
    }

    function renderPkg() {
      const list = document.getElementById('pkgList');
      const empty = document.getElementById('pkgEmpty');
      empty.style.display = pkgItems.length ? 'none' : 'block';
      list.innerHTML = pkgItems.map((item, i) => \\\`
        <div class="pkg-item">
          <span class="pkg-item-name">\\\${item.name}</span>
          <span class="pkg-item-price">S/.\\\${item.price}</span>
          <button class="pkg-item-remove" onclick="removePkgItem(\\\${i})">✕</button>
        </div>
      \\\`).join('');
      calcTotal();
    }

    function removePkgItem(i) {
      const name = pkgItems[i].name;
      pkgItems.splice(i, 1);
      // Re-enable button
      document.querySelectorAll('.activity-card').forEach(card => {
        if (card.dataset.name === name) {
          const btn = card.querySelector('.btn-add');
          btn.textContent = '+ Paquete';
          btn.classList.remove('added');
        }
      });
      renderPkg();
      updateFabBadge();
    }

    function calcTotal() {
      const sum = pkgItems.reduce((a, b) => a + b.price, 0);
      document.getElementById('pkgTotal').textContent = sum * persons;
    }

    function changePeople(delta) {
      persons = Math.max(1, Math.min(20, persons + delta));
      document.getElementById('personCount').textContent = persons;
      calcTotal();
    }

    function openPkg() { document.getElementById('pkgSidebar').classList.add('open'); }
    function closePkg() { document.getElementById('pkgSidebar').classList.remove('open'); }
    function togglePkg() { document.getElementById('pkgSidebar').classList.toggle('open'); }

    function updateFabBadge() {
      const badge = document.getElementById('pkgBadge');
      badge.textContent = pkgItems.length;
      badge.style.display = pkgItems.length ? 'flex' : 'none';
    }

    /* ── MODAL ── */
    function openModal(name, price, isPkg = false) {
      const overlay = document.getElementById('modalOverlay');
      document.getElementById('modalActivity').value = name;
      document.getElementById('modalPrice').textContent = isPkg
        ? pkgItems.reduce((a,b) => a+b.price, 0) * persons
        : price;
      document.getElementById('modalSubtitle').textContent = isPkg
        ? \\\`Paquete de \\\${pkgItems.length} actividades · \\\${persons} persona(s)\\\`
        : name;
      const dateInput = document.getElementById('modalDate');
      dateInput.min = new Date().toISOString().split('T')[0];
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(e) {
      if (!e || e.target === document.getElementById('modalOverlay')) {
        document.getElementById('modalOverlay').classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    async function submitReserva() {
      // Usar IDs específicos para evitar selectors frágiles
      const nombreEl   = document.getElementById('mNombre');
      const emailEl    = document.getElementById('mEmail');
      const fechaEl    = document.getElementById('modalDate');
      const personasEl = document.getElementById('mPersonas');
      const actividad  = document.getElementById('modalActivity').value;

      const nombre   = nombreEl  ? nombreEl.value.trim()  : '';
      const email    = emailEl   ? emailEl.value.trim()   : '';
      const fecha    = fechaEl   ? fechaEl.value           : '';
      const personas = personasEl? personasEl.value        : '1';

      // Limpiar errores previos
      [nombreEl, emailEl, fechaEl].forEach(el => el && el.classList.remove('input-error'));

      let valid = true;
      if (!nombre) { nombreEl && nombreEl.classList.add('input-error'); valid = false; }
      if (!email || !email.includes('@')) { emailEl && emailEl.classList.add('input-error'); valid = false; }
      if (!fecha) { fechaEl && fechaEl.classList.add('input-error'); valid = false; }
      if (!valid) {
        showToast('⚠️ Completa los campos requeridos');
        return;
      }

      const btn = document.querySelector('.btn-submit');
      const originalText = btn.textContent;
      btn.textContent = '⏳ Enviando...';
      btn.disabled = true;

      try {
        const precioEl = document.getElementById('modalPrice');
        const precio = precioEl ? parseInt(precioEl.textContent) || 0 : 0;
        const esPaquete = actividad.includes('Paquete') || actividad.includes('paquete');

        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre, email,
            fecha_visita:        fecha,
            personas:            parseInt(personas) || 1,
            actividad,
            precio_total:        precio,
            es_paquete:          esPaquete,
            actividades_paquete: esPaquete ? pkgItems : null,
          }),
        });

        const data = await res.json();

        if (data.success) {
          document.getElementById('modalOverlay').classList.remove('open');
          document.body.style.overflow = '';
          const shortId = data.reserva_id ? data.reserva_id.slice(0,8).toUpperCase() : '—';
          showToast('🎉 ¡Reserva guardada! ID: ' + shortId);
          if (esPaquete) { pkgItems = []; renderPkg(); updateFabBadge(); }
          // Limpiar form
          [nombreEl, emailEl, fechaEl].forEach(el => el && (el.value = ''));
        } else {
          showToast('❌ ' + (data.error || 'Error al guardar'));
        }
      } catch(err) {
        console.error('submitReserva error:', err);
        showToast('❌ Error de conexión. Verifica que el servidor esté activo.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }

    // Toast helper (si no existe ya)
    function showToast(msg) {
      let t = document.getElementById('toast');
      if (!t) {
        t = document.createElement('div');
        t.id = 'toast';
        t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(16px);background:rgba(10,22,40,0.97);border:1px solid rgba(45,212,191,0.35);border-radius:12px;padding:13px 22px;font-size:15px;color:#f0ede8;opacity:0;pointer-events:none;transition:all 0.4s;z-index:600;backdrop-filter:blur(12px);white-space:nowrap;';
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
      clearTimeout(t._timer);
      t._timer = setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateX(-50%) translateY(16px)';
      }, 3800);
    }
        /* ── PARTICLES: EMBERS + SPARKS + SMOKE (ENHANCED) ── */
    (function initParticles() {
      const colors = ['#ff5500', '#ff8800', '#ffbb00', '#ff4400', '#ff7700', '#ffaa00', '#ff3300', '#ffcc00'];

      function fillCampfire(emberId, sparkId, smokeId) {
        const emberContainer = document.getElementById(emberId);
        if (emberContainer) {
          for (let i = 0; i < 18; i++) {
            const ember = document.createElement('div');
            ember.className = 'illo-ember';
            ember.style.setProperty('--ember-color', colors[i % colors.length]);
            ember.style.setProperty('--dur', (2.0 + Math.random() * 3.0) + 's');
            ember.style.setProperty('--delay', (Math.random() * 4.0) + 's');
            ember.style.setProperty('--dx1', (Math.random() * 24 - 12) + 'px');
            ember.style.setProperty('--dx2', (Math.random() * 28 - 14) + 'px');
            ember.style.setProperty('--dx3', (Math.random() * 20 - 10) + 'px');
            ember.style.setProperty('--drift', (Math.random() * 36 - 18) + 'px');
            ember.style.left = (Math.random() * 50 + 10) + '%';
            const size = 2 + Math.floor(Math.random() * 5);
            ember.style.width = size + 'px';
            ember.style.height = size + 'px';
            emberContainer.appendChild(ember);
          }
        }
        const sparkContainer = document.getElementById(sparkId);
        if (sparkContainer) {
          for (let i = 0; i < 14; i++) {
            const spark = document.createElement('div');
            spark.className = 'illo-spark';
            spark.style.setProperty('--sdur', (0.4 + Math.random() * 0.6) + 's');
            spark.style.setProperty('--sdelay', (Math.random() * 3.0) + 's');
            spark.style.setProperty('--sdx1', (Math.random() * 14 - 7) + 'px');
            spark.style.setProperty('--sdx2', (Math.random() * 18 - 9) + 'px');
            spark.style.setProperty('--sdrift', (Math.random() * 26 - 13) + 'px');
            spark.style.left = (Math.random() * 45 + 8) + '%';
            sparkContainer.appendChild(spark);
          }
        }
        const smokeContainer = document.getElementById(smokeId);
        if (smokeContainer) {
          for (let i = 0; i < 8; i++) {
            const wisp = document.createElement('div');
            wisp.className = 'illo-smoke';
            wisp.style.setProperty('--smdur', (4 + Math.random() * 4) + 's');
            wisp.style.setProperty('--smdelay', (Math.random() * 5) + 's');
            wisp.style.setProperty('--smx1', (Math.random() * 16 - 8) + 'px');
            wisp.style.setProperty('--smx2', (Math.random() * 24 - 12) + 'px');
            wisp.style.setProperty('--smdrift', (6 + Math.random() * 28) + 'px');
            wisp.style.left = (Math.random() * 35 + 5) + '%';
            const size = 5 + Math.floor(Math.random() * 12);
            wisp.style.width = size + 'px';
            wisp.style.height = size + 'px';
            smokeContainer.appendChild(wisp);
          }
        }
      }

      fillCampfire('illoEmberContainer',  'illoSparkContainer',  'illoSmokeContainer');
      fillCampfire('illoEmberContainer2', 'illoSparkContainer2', 'illoSmokeContainer2');
    })();

    /* ── NEWSLETTER FORM ── */
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
          setTimeout(() => input.style.borderColor = '', 1200);
          return;
        }
        btn.disabled = true;
        btn.textContent = 'Enviando…';
        try {
          const res = await fetch('http://localhost:3030/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          if (!data.success) { alert(data.message || 'Error al suscribirse'); btn.disabled = false; btn.textContent = 'Suscribirme'; return; }
        } catch { /* backend not available — show success anyway */ }
        form.style.display = 'none';
        msg.style.display = 'block';
      }

      btn.addEventListener('click', subscribe);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') subscribe(); });
    })();

    /* ── FLYING BIRDS ── */
    (function initBirds() {
      const container = document.getElementById('heroBirds');
      if (!container) return;

      const birds = [
        { id: 1, w: 60, stroke: 2.5, flap: 'flapSlow', dur: '1.5s', top: '10%', left: '8%',  float: 'birdFloat1', floatDur: '8s' },
        { id: 2, w: 48, stroke: 2.0, flap: 'flapMed',  dur: '1.1s', top: '16%', left: '72%', float: 'birdFloat2', floatDur: '10s' },
        { id: 3, w: 54, stroke: 2.2, flap: 'flapFast', dur: '0.8s', top: '22%', left: '28%', float: 'birdFloat3', floatDur: '7s' },
        { id: 4, w: 40, stroke: 1.8, flap: 'flapSlow', dur: '1.4s', top: '8%',  left: '88%', float: 'birdFloat4', floatDur: '11s' },
        { id: 5, w: 52, stroke: 2.2, flap: 'flapMed',  dur: '1.2s', top: '28%', left: '50%', float: 'birdFloat5', floatDur: '9s' },
        { id: 6, w: 36, stroke: 1.6, flap: 'flapFast', dur: '0.75s',top: '14%', left: '42%', float: 'birdFloat6', floatDur: '12s' },
        { id: 7, w: 46, stroke: 2.0, flap: 'flapSlow', dur: '1.6s', top: '18%', left: '15%', float: 'birdFloat7', floatDur: '8.5s' },
      ];

      birds.forEach(b => {
        const el = document.createElement('div');
        el.className = 'bird';
        el.style.position = 'absolute';
        el.style.top = b.top;
        el.style.left = b.left;
        el.style.animation = b.float + ' ' + b.floatDur + ' ease-in-out infinite';
        el.style.willChange = 'transform';
        const h = b.w * 0.45;
        const cx = b.w / 2;
        const cy = h * 0.6;
        const wingUp = cy - h * 0.7;
        const wingMid = cy + h * 0.1;

        el.innerHTML = \\\`<svg width="\\\${b.w}" height="\\\${h}" viewBox="0 0 \\\${b.w} \\\${h}" fill="none">
          <path d="M\\\${cx} \\\${cy} Q\\\${cx - b.w*0.3} \\\${wingUp} 2 \\\${wingMid}"
                stroke="currentColor" stroke-width="\\\${b.stroke}" stroke-linecap="round" fill="none"
                style="animation:\\\${b.flap} \\\${b.dur} ease-in-out infinite;transform-origin:\\\${cx}px \\\${cy}px"/>
          <path d="M\\\${cx} \\\${cy} Q\\\${cx + b.w*0.3} \\\${wingUp} \\\${b.w - 2} \\\${wingMid}"
                stroke="currentColor" stroke-width="\\\${b.stroke}" stroke-linecap="round" fill="none"
                style="animation:\\\${b.flap} \\\${b.dur} ease-in-out infinite;transform-origin:\\\${cx}px \\\${cy}px;animation-delay:0.06s"/>
        </svg>\\\`;
        container.appendChild(el);
      });
    })();
  <\/script> </body> </html>`])), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/Navbar", "client:component-export": "default" }));
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/actividades.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/actividades.astro";
const $$url = "/actividades";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Actividades,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
