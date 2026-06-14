import { c as createComponent } from './astro-component_BX9BhZ5c.mjs';
import { h as renderTemplate, o as renderComponent, p as renderHead } from './server_DrLwvc76.mjs';
import { N as Navbar } from './Navbar_R42--hHp.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { H as HomeSections } from './HomeSections_BSltI7X0.mjs';

const stats = [
  { value: 8, suffix: "+", label: "Comunidades", icon: "🏘️" },
  { value: 3820, suffix: "", label: "metros sobre el mar", icon: "🏔️" },
  { value: 500, suffix: "+", label: "años de historia", icon: "📜" },
  { value: 12, suffix: "", label: "islas cercanas", icon: "🏝️" }
];
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    count.toLocaleString("es"),
    suffix
  ] });
}
function HomeStats() {
  return /* @__PURE__ */ jsxs("section", { style: {
    padding: "64px 0",
    background: "linear-gradient(90deg, rgba(7,13,26,0.98), rgba(10,22,40,0.4), rgba(7,13,26,0.98))",
    borderTop: "1px solid var(--border)",
    borderBottom: "1px solid var(--border)"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "2rem"
    }, children: stats.map((s, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "reveal",
        style: {
          textAlign: "center",
          padding: "1.5rem 1rem",
          borderRadius: "var(--radius)",
          background: "rgba(45,212,191,0.04)",
          border: "1px solid var(--border)",
          transition: "all 0.3s",
          transitionDelay: `${i * 0.1}s`
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.background = "rgba(45,212,191,0.08)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "rgba(45,212,191,0.04)";
        },
        children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "2rem", marginBottom: "0.5rem" }, children: s.icon }),
          /* @__PURE__ */ jsx("div", { style: {
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem,3vw,2.6rem)",
            fontWeight: 800,
            color: "var(--accent)",
            lineHeight: 1
          }, children: /* @__PURE__ */ jsx(Counter, { target: s.value, suffix: s.suffix }) }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: "0.82rem", color: "var(--text3)", marginTop: "0.5rem", letterSpacing: "0.04em" }, children: s.label })
        ]
      },
      i
    )) }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      ` })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Capachica Turismo — La joya del Lago Titicaca [8-BIT]</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- ═══════════ HERO (mismo contenido, fondo canvas 8-bit) ═══════════ --> <section class="hero"> <canvas id="cHero"></canvas> <div class="hero-content"> <div class="hero-badge">Vivencial · Capachica · 3,820 msnm</div> <h1 class="hero-title">\nTurismo\n<em>Vivencial</em> </h1> <p class="hero-desc">\nMás que turismo: una inmersión real en la vida andina de las familias\n      de la península de Capachica, a orillas del Titicaca.\n</p> <div class="hero-ctas"> <a href="/vivencial" class="btn-primary">Ver familias →</a> <a href="/actividades" class="btn-outline">Reservar ahora</a> </div> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">8+</div> <div class="stat-label">Comunidades</div> </div> <div class="stat-item"> <div class="stat-val">3,820</div> <div class="stat-label">msnm</div> </div> <div class="stat-item"> <div class="stat-val">500+</div> <div class="stat-label">Años historia</div> </div> <div class="stat-item"> <div class="stat-val">12</div> <div class="stat-label">Islas cercanas</div> </div> </div> </div> </section> <!-- ═══════════ MAIN — mismos componentes React del homepage ═══════════ --> <main> ', " ", ` </main> <!-- ═══════════ BOTTOM WAVE (idéntico) ═══════════ --> <div class="bottom-wave"> <div class="sand-wave"></div> </div> <!-- ═══════════ ARENA FOOTER (idéntico al homepage) ═══════════ --> <footer class="arena-footer"> <div class="illo-campfire"> <img src="/campfire.gif" alt="" aria-hidden="true"> </div> <div class="illo-campfire2"> <img src="/campfire.gif" alt="" aria-hidden="true"> </div> <div class="arena-footer-body"> <div class="arena-footer-grid"> <!-- Brand --> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,820 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <!-- Destinos --> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos" class="arena-link">Ver todos →</a></li> </ul> </div> <!-- Experiencias + Info --> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencial" class="arena-link">Vivencial</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <!-- Newsletter --> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:7px;margin-bottom:0.8rem;line-height:2;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:7px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:7px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <!-- Bottom bar --> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:7px;letter-spacing:0.2px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <script>
/* ─── helper ─── */
function px(ctx,c,x,y,w,h){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w)||1,Math.round(h)||1);}

/* ══ HERO CANVAS — cielo nocturno andino ══ */
(function heroCanvas(){
  const C=document.getElementById('cHero');
  if(!C)return;
  const ctx=C.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  const W=480,H=270;
  C.width=W;C.height=H;

  const SKY=['#06091a','#08091f','#090b25','#0b0e2e','#0d1238','#101842','#131f4e','#162658','#192e62','#1c366c'];
  const LAKE_BASE='#06102a';
  const SAND=['#0e0a04','#140e06','#1a1208','#201808'];
  const MOON={x:240,y:32,r:20};
  const AUR=['rgba(45,212,191,0.04)','rgba(45,212,191,0.03)','rgba(100,80,200,0.03)'];
  const rand=(s)=>{let x=s;return()=>{x=Math.sin(x)*43758.5453|0;return Math.abs(Math.sin(x));};};
  const r=rand(99);
  const STARS=Array.from({length:140},()=>({x:r()*W,y:r()*(H*0.70)+2,sz:r()>0.88?2:1,ph:r()*Math.PI*2,sp:0.015+r()*0.04}));
  const mr=rand(55);
  const MNTS=[];
  for(let mx=-10;mx<W+10;mx+=8)MNTS.push({x:mx,h:14+mr()*48});
  const FX=240,FY=H-24;
  const FF=[[[-6,24,11],[-1,34,8],[5,26,7],[11,18,6]],[[-5,28,10],[0,38,7],[6,28,6],[12,16,5]],[[-7,22,12],[-2,30,9],[4,24,8],[10,20,6]],[[-5,30,10],[1,40,7],[7,26,6],[13,14,5]]];
  const FC=['#ff4400','#ff7700','#ffaa00','#ffdd44','#ffff99'];
  const FX2=380,FY2=H-20;
  const F2=[[[-3,14,6],[0,20,5],[4,15,4]],[[-3,16,5],[1,22,4],[4,13,3]],[[-4,12,7],[-1,18,6],[3,16,4]],[[-2,18,5],[2,24,4],[5,12,3]]];
  let t=0,wOff=0,ff=0,ft=0;

  function drawSky(){for(let y=0;y<H*0.72;y++){const ci=Math.min(Math.floor(y/(H*0.72)*SKY.length),SKY.length-1);px(ctx,SKY[ci],0,y,W,1);}}
  function drawAurora(t){AUR.forEach((c,i)=>{const yb=22+i*18,wave=Math.sin(t*0.25+i*2.1)*6;ctx.fillStyle=c;ctx.fillRect(0,yb+wave,W,12);ctx.fillRect(0,yb+wave+10,W,7);});}
  function drawStars(t){STARS.forEach(s=>{const a=0.4+Math.sin(t*s.sp+s.ph)*0.6,b=Math.floor(a*255);ctx.fillStyle=\`rgb(\${b},\${b},\${Math.min(255,b+30)})\`;ctx.fillRect(s.x,s.y,s.sz,s.sz);});}
  function drawMoon(){const{x,y,r}=MOON;ctx.fillStyle='rgba(220,200,150,0.04)';ctx.fillRect(x-r-14,y-r-14,(r+14)*2,(r+14)*2);ctx.fillStyle='rgba(220,200,150,0.07)';ctx.fillRect(x-r-7,y-r-7,(r+7)*2,(r+7)*2);px(ctx,'#ddd4b4',x-r,y-r,r*2,r*2);px(ctx,'#c8bea0',x-r+3,y-r+3,r*2-6,r*2-6);px(ctx,'#e8e0c8',x-r+6,y-r+5,8,8);px(ctx,'#cdc090',x+r-8,y+r-8,6,6);px(ctx,'rgba(0,0,20,0.3)',x+r-8,y-r,8,r*2);}
  function drawMountains(){ctx.fillStyle='#0d1840';MNTS.forEach((m,i)=>{if(i%2===0){const h2=m.h*0.55;ctx.fillRect(m.x,H*0.72-h2,10,h2);}});ctx.fillStyle='#0a1230';MNTS.forEach(m=>ctx.fillRect(m.x,H*0.72-m.h,8,m.h));MNTS.forEach(m=>{if(m.h>38){px(ctx,'rgba(220,230,255,0.65)',m.x+2,H*0.72-m.h,4,4);px(ctx,'rgba(220,230,255,0.4)',m.x+1,H*0.72-m.h+3,7,3);}});}
  function drawLake(wOff){const LT=Math.floor(H*0.72),LB=Math.floor(H*0.84);px(ctx,LAKE_BASE,0,LT,W,LB-LT);ctx.fillStyle='rgba(220,200,130,0.1)';ctx.fillRect(MOON.x-25,LT+2,50,LB-LT-4);for(let row=0;row<5;row++){const wy=LT+4+row*5;ctx.fillStyle=row<2?'#0a1848':'#0c1e58';for(let wx=0;wx<W;wx+=10){const p=Math.floor((wx+wOff+row*4)/10)%2;if(p===0)ctx.fillRect(wx,wy,7,1);}}ctx.fillStyle='#1a3060';for(let wx=0;wx<W;wx+=16){if(((wx+wOff*1.2)%16)<5)ctx.fillRect(wx,LB-4,4,1);}ctx.fillStyle='rgba(100,150,220,0.3)';for(let wx=4;wx<W;wx+=22){if(((wx+wOff)%22)<5)ctx.fillRect(wx,LB-2,3,1);}}
  function drawSand(){const SHORE=Math.floor(H*0.84);for(let i=0;i<SAND.length;i++){const sy=SHORE+i*Math.floor((H-SHORE)/SAND.length);px(ctx,SAND[i],0,sy,W,Math.floor((H-SHORE)/SAND.length)+1);}for(let i=0;i<50;i++)px(ctx,'rgba(255,160,60,0.07)',(i*71+9)%W,SHORE+4+(i*43)%(H-SHORE-6),3,1);}
  function drawFire(fx,fy,frames,frame,scale){scale=scale||1;ctx.fillStyle='rgba(255,90,0,0.15)';ctx.fillRect(fx-28*scale,fy+2,56*scale,10);ctx.fillStyle='rgba(255,60,0,0.07)';ctx.fillRect(fx-42*scale,fy+3,84*scale,14);px(ctx,'#5a3015',fx-18*scale,fy+5,24*scale,5);px(ctx,'#4a2810',fx-8*scale,fy+5,24*scale,5);frames[frame].forEach(([ox,fh,fw],i)=>px(ctx,FC[Math.min(i,FC.length-1)],fx+ox*scale,fy-fh*scale+5,fw*scale,fh*scale));px(ctx,'#ffffaa',fx-2*scale,fy-18*scale,4*scale,15*scale);}
  function drawPerson(){const bx=FX-46,by=FY-2,S='#140a04';px(ctx,S,bx,by-14,8,8);px(ctx,S,bx-3,by-16,14,3);px(ctx,S,bx+1,by-6,6,10);px(ctx,S,bx+6,by-4,14,3);px(ctx,S,bx-2,by+4,6,5);px(ctx,S,bx+4,by+4,5,5);ctx.fillStyle='rgba(255,100,10,0.11)';ctx.fillRect(bx-2,by-16,20,28);}
  function drawDog(){const dx=FX+38,dy=FY,D='#b08840';px(ctx,D,dx,dy,20,7);px(ctx,D,dx+14,dy-6,10,8);px(ctx,D,dx+20,dy-8,5,5);px(ctx,D,dx+21,dy-2,6,4);px(ctx,'#200800',dx+25,dy-2,3,3);px(ctx,D,dx-4,dy-3,6,4);px(ctx,D,dx-6,dy-7,5,5);ctx.fillStyle='rgba(255,100,10,0.09)';ctx.fillRect(dx,dy-8,30,20);}

  function frame(){
    ctx.clearRect(0,0,W,H);
    drawSky();drawAurora(t);drawStars(t);drawMoon();drawMountains();drawLake(wOff);drawSand();
    drawFire(FX,FY,FF,ff,1);drawFire(FX2,FY2,F2,ff,0.65);
    drawPerson();drawDog();
    wOff=(wOff+0.25)%40;t+=0.04;ft++;
    if(ft>7){ft=0;ff=(ff+1)%FF.length;}
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ══ NEWSLETTER ══ */
(function(){
  const btn=document.getElementById('arenaSubscribeBtn');
  if(!btn)return;
  btn.addEventListener('click',function(){
    const inp=document.getElementById('arenaEmailInput');
    if(!inp||!inp.value.includes('@'))return;
    document.getElementById('arenaNewsletterForm').style.display='none';
    document.getElementById('arenaSubscribedMsg').style.display='block';
  });
})();
<\/script> </body> </html>`], ['<html lang="es" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Capachica Turismo — La joya del Lago Titicaca [8-BIT]</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">', "</head> <body> ", ' <!-- ═══════════ HERO (mismo contenido, fondo canvas 8-bit) ═══════════ --> <section class="hero"> <canvas id="cHero"></canvas> <div class="hero-content"> <div class="hero-badge">Vivencial · Capachica · 3,820 msnm</div> <h1 class="hero-title">\nTurismo\n<em>Vivencial</em> </h1> <p class="hero-desc">\nMás que turismo: una inmersión real en la vida andina de las familias\n      de la península de Capachica, a orillas del Titicaca.\n</p> <div class="hero-ctas"> <a href="/vivencial" class="btn-primary">Ver familias →</a> <a href="/actividades" class="btn-outline">Reservar ahora</a> </div> <div class="hero-stats"> <div class="stat-item"> <div class="stat-val">8+</div> <div class="stat-label">Comunidades</div> </div> <div class="stat-item"> <div class="stat-val">3,820</div> <div class="stat-label">msnm</div> </div> <div class="stat-item"> <div class="stat-val">500+</div> <div class="stat-label">Años historia</div> </div> <div class="stat-item"> <div class="stat-val">12</div> <div class="stat-label">Islas cercanas</div> </div> </div> </div> </section> <!-- ═══════════ MAIN — mismos componentes React del homepage ═══════════ --> <main> ', " ", ` </main> <!-- ═══════════ BOTTOM WAVE (idéntico) ═══════════ --> <div class="bottom-wave"> <div class="sand-wave"></div> </div> <!-- ═══════════ ARENA FOOTER (idéntico al homepage) ═══════════ --> <footer class="arena-footer"> <div class="illo-campfire"> <img src="/campfire.gif" alt="" aria-hidden="true"> </div> <div class="illo-campfire2"> <img src="/campfire.gif" alt="" aria-hidden="true"> </div> <div class="arena-footer-body"> <div class="arena-footer-grid"> <!-- Brand --> <div class="arena-brand-col"> <div class="arena-brand-logo"> <div class="arena-logo-circle">C</div> <div> <div class="arena-brand-name">Capachica</div> <div class="arena-brand-tagline">TURISMO VIVENCIAL</div> </div> </div> <p class="arena-text arena-brand-desc">La joya escondida del lago Titicaca. Turismo comunitario auténtico a 3,820 msnm.</p> <div class="arena-social-row"> <a href="https://instagram.com/capachicaturismo" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Instagram"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> </a> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="Facebook"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a> <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="YouTube"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1008"></polygon></svg> </a> <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="arena-social-btn" aria-label="TikTok"> <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"></path></svg> </a> </div> </div> <!-- Destinos --> <div> <div class="arena-heading">Destinos</div> <ul class="arena-link-list"> <li><a href="/destinos" class="arena-link">Playa Llachón</a></li> <li><a href="/destinos" class="arena-link">Mirador del Amaru</a></li> <li><a href="/destinos" class="arena-link">Isla Ticonata</a></li> <li><a href="/destinos" class="arena-link">Comunidad Capachica</a></li> <li><a href="/destinos" class="arena-link">Ver todos →</a></li> </ul> </div> <!-- Experiencias + Info --> <div> <div class="arena-heading">Experiencias</div> <ul class="arena-link-list"> <li><a href="/vivencial" class="arena-link">Vivencial</a></li> <li><a href="/actividades" class="arena-link">Actividades</a></li> <li><a href="/gastronomia" class="arena-link">Gastronomía</a></li> <li><a href="/festividades" class="arena-link">Festividades</a></li> <li><a href="/artesania" class="arena-link">Artesanía</a></li> </ul> <div class="arena-heading" style="margin-top:1.25rem;">Info</div> <ul class="arena-link-list"> <li><a href="/alojamiento" class="arena-link">Alojamiento</a></li> <li><a href="/como-llegar" class="arena-link">Cómo llegar</a></li> <li><a href="/contacto" class="arena-link">Contacto</a></li> </ul> </div> <!-- Newsletter --> <div> <div class="arena-heading">Newsletter</div> <p class="arena-text" style="font-size:7px;margin-bottom:0.8rem;line-height:2;">Novedades y ofertas exclusivas · 1 email/semana</p> <div class="arena-newsletter-form" id="arenaNewsletterForm"> <input type="email" id="arenaEmailInput" class="arena-newsletter-input" placeholder="tu@email.com" autocomplete="email"> <button class="arena-subscribe-btn" id="arenaSubscribeBtn" type="button">Suscribirme</button> <span class="arena-text" style="font-size:7px;opacity:0.7;">Sin spam, prometido</span> </div> <p id="arenaSubscribedMsg" style="display:none;font-size:7px;color:rgba(212,168,67,0.9);">¡Gracias! Te escribiremos pronto 🌊</p> <div class="arena-contact-row"> <a href="https://wa.me/51955949404" target="_blank" rel="noopener noreferrer" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.1 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 18z"></path></svg> <span>+51 955 949 404</span> </a> <a href="mailto:torresdeissy56@gmail.com" class="arena-contact-item"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <span>torresdeissy56@gmail.com</span> </a> </div> </div> </div> <!-- Bottom bar --> <div class="arena-bottom-bar"> <p class="arena-text" style="font-size:7px;letter-spacing:0.2px;">© 2026 Capachica Turismo · <span style="color:rgba(212,168,67,0.75);">Hecho con ❤️ a las orillas del lago Titicaca</span></p> <div class="arena-legal-links"> <a href="/privacidad" class="arena-link">Privacidad</a> <a href="/terminos" class="arena-link">Términos</a> <a href="/cookies" class="arena-link">Cookies</a> <a href="/cancelaciones" class="arena-link">Cancelaciones</a> </div> </div> </div> </footer> <script>
/* ─── helper ─── */
function px(ctx,c,x,y,w,h){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w)||1,Math.round(h)||1);}

/* ══ HERO CANVAS — cielo nocturno andino ══ */
(function heroCanvas(){
  const C=document.getElementById('cHero');
  if(!C)return;
  const ctx=C.getContext('2d');
  ctx.imageSmoothingEnabled=false;
  const W=480,H=270;
  C.width=W;C.height=H;

  const SKY=['#06091a','#08091f','#090b25','#0b0e2e','#0d1238','#101842','#131f4e','#162658','#192e62','#1c366c'];
  const LAKE_BASE='#06102a';
  const SAND=['#0e0a04','#140e06','#1a1208','#201808'];
  const MOON={x:240,y:32,r:20};
  const AUR=['rgba(45,212,191,0.04)','rgba(45,212,191,0.03)','rgba(100,80,200,0.03)'];
  const rand=(s)=>{let x=s;return()=>{x=Math.sin(x)*43758.5453|0;return Math.abs(Math.sin(x));};};
  const r=rand(99);
  const STARS=Array.from({length:140},()=>({x:r()*W,y:r()*(H*0.70)+2,sz:r()>0.88?2:1,ph:r()*Math.PI*2,sp:0.015+r()*0.04}));
  const mr=rand(55);
  const MNTS=[];
  for(let mx=-10;mx<W+10;mx+=8)MNTS.push({x:mx,h:14+mr()*48});
  const FX=240,FY=H-24;
  const FF=[[[-6,24,11],[-1,34,8],[5,26,7],[11,18,6]],[[-5,28,10],[0,38,7],[6,28,6],[12,16,5]],[[-7,22,12],[-2,30,9],[4,24,8],[10,20,6]],[[-5,30,10],[1,40,7],[7,26,6],[13,14,5]]];
  const FC=['#ff4400','#ff7700','#ffaa00','#ffdd44','#ffff99'];
  const FX2=380,FY2=H-20;
  const F2=[[[-3,14,6],[0,20,5],[4,15,4]],[[-3,16,5],[1,22,4],[4,13,3]],[[-4,12,7],[-1,18,6],[3,16,4]],[[-2,18,5],[2,24,4],[5,12,3]]];
  let t=0,wOff=0,ff=0,ft=0;

  function drawSky(){for(let y=0;y<H*0.72;y++){const ci=Math.min(Math.floor(y/(H*0.72)*SKY.length),SKY.length-1);px(ctx,SKY[ci],0,y,W,1);}}
  function drawAurora(t){AUR.forEach((c,i)=>{const yb=22+i*18,wave=Math.sin(t*0.25+i*2.1)*6;ctx.fillStyle=c;ctx.fillRect(0,yb+wave,W,12);ctx.fillRect(0,yb+wave+10,W,7);});}
  function drawStars(t){STARS.forEach(s=>{const a=0.4+Math.sin(t*s.sp+s.ph)*0.6,b=Math.floor(a*255);ctx.fillStyle=\\\`rgb(\\\${b},\\\${b},\\\${Math.min(255,b+30)})\\\`;ctx.fillRect(s.x,s.y,s.sz,s.sz);});}
  function drawMoon(){const{x,y,r}=MOON;ctx.fillStyle='rgba(220,200,150,0.04)';ctx.fillRect(x-r-14,y-r-14,(r+14)*2,(r+14)*2);ctx.fillStyle='rgba(220,200,150,0.07)';ctx.fillRect(x-r-7,y-r-7,(r+7)*2,(r+7)*2);px(ctx,'#ddd4b4',x-r,y-r,r*2,r*2);px(ctx,'#c8bea0',x-r+3,y-r+3,r*2-6,r*2-6);px(ctx,'#e8e0c8',x-r+6,y-r+5,8,8);px(ctx,'#cdc090',x+r-8,y+r-8,6,6);px(ctx,'rgba(0,0,20,0.3)',x+r-8,y-r,8,r*2);}
  function drawMountains(){ctx.fillStyle='#0d1840';MNTS.forEach((m,i)=>{if(i%2===0){const h2=m.h*0.55;ctx.fillRect(m.x,H*0.72-h2,10,h2);}});ctx.fillStyle='#0a1230';MNTS.forEach(m=>ctx.fillRect(m.x,H*0.72-m.h,8,m.h));MNTS.forEach(m=>{if(m.h>38){px(ctx,'rgba(220,230,255,0.65)',m.x+2,H*0.72-m.h,4,4);px(ctx,'rgba(220,230,255,0.4)',m.x+1,H*0.72-m.h+3,7,3);}});}
  function drawLake(wOff){const LT=Math.floor(H*0.72),LB=Math.floor(H*0.84);px(ctx,LAKE_BASE,0,LT,W,LB-LT);ctx.fillStyle='rgba(220,200,130,0.1)';ctx.fillRect(MOON.x-25,LT+2,50,LB-LT-4);for(let row=0;row<5;row++){const wy=LT+4+row*5;ctx.fillStyle=row<2?'#0a1848':'#0c1e58';for(let wx=0;wx<W;wx+=10){const p=Math.floor((wx+wOff+row*4)/10)%2;if(p===0)ctx.fillRect(wx,wy,7,1);}}ctx.fillStyle='#1a3060';for(let wx=0;wx<W;wx+=16){if(((wx+wOff*1.2)%16)<5)ctx.fillRect(wx,LB-4,4,1);}ctx.fillStyle='rgba(100,150,220,0.3)';for(let wx=4;wx<W;wx+=22){if(((wx+wOff)%22)<5)ctx.fillRect(wx,LB-2,3,1);}}
  function drawSand(){const SHORE=Math.floor(H*0.84);for(let i=0;i<SAND.length;i++){const sy=SHORE+i*Math.floor((H-SHORE)/SAND.length);px(ctx,SAND[i],0,sy,W,Math.floor((H-SHORE)/SAND.length)+1);}for(let i=0;i<50;i++)px(ctx,'rgba(255,160,60,0.07)',(i*71+9)%W,SHORE+4+(i*43)%(H-SHORE-6),3,1);}
  function drawFire(fx,fy,frames,frame,scale){scale=scale||1;ctx.fillStyle='rgba(255,90,0,0.15)';ctx.fillRect(fx-28*scale,fy+2,56*scale,10);ctx.fillStyle='rgba(255,60,0,0.07)';ctx.fillRect(fx-42*scale,fy+3,84*scale,14);px(ctx,'#5a3015',fx-18*scale,fy+5,24*scale,5);px(ctx,'#4a2810',fx-8*scale,fy+5,24*scale,5);frames[frame].forEach(([ox,fh,fw],i)=>px(ctx,FC[Math.min(i,FC.length-1)],fx+ox*scale,fy-fh*scale+5,fw*scale,fh*scale));px(ctx,'#ffffaa',fx-2*scale,fy-18*scale,4*scale,15*scale);}
  function drawPerson(){const bx=FX-46,by=FY-2,S='#140a04';px(ctx,S,bx,by-14,8,8);px(ctx,S,bx-3,by-16,14,3);px(ctx,S,bx+1,by-6,6,10);px(ctx,S,bx+6,by-4,14,3);px(ctx,S,bx-2,by+4,6,5);px(ctx,S,bx+4,by+4,5,5);ctx.fillStyle='rgba(255,100,10,0.11)';ctx.fillRect(bx-2,by-16,20,28);}
  function drawDog(){const dx=FX+38,dy=FY,D='#b08840';px(ctx,D,dx,dy,20,7);px(ctx,D,dx+14,dy-6,10,8);px(ctx,D,dx+20,dy-8,5,5);px(ctx,D,dx+21,dy-2,6,4);px(ctx,'#200800',dx+25,dy-2,3,3);px(ctx,D,dx-4,dy-3,6,4);px(ctx,D,dx-6,dy-7,5,5);ctx.fillStyle='rgba(255,100,10,0.09)';ctx.fillRect(dx,dy-8,30,20);}

  function frame(){
    ctx.clearRect(0,0,W,H);
    drawSky();drawAurora(t);drawStars(t);drawMoon();drawMountains();drawLake(wOff);drawSand();
    drawFire(FX,FY,FF,ff,1);drawFire(FX2,FY2,F2,ff,0.65);
    drawPerson();drawDog();
    wOff=(wOff+0.25)%40;t+=0.04;ft++;
    if(ft>7){ft=0;ff=(ff+1)%FF.length;}
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ══ NEWSLETTER ══ */
(function(){
  const btn=document.getElementById('arenaSubscribeBtn');
  if(!btn)return;
  btn.addEventListener('click',function(){
    const inp=document.getElementById('arenaEmailInput');
    if(!inp||!inp.value.includes('@'))return;
    document.getElementById('arenaNewsletterForm').style.display='none';
    document.getElementById('arenaSubscribedMsg').style.display='block';
  });
})();
<\/script> </body> </html>`])), renderHead(), renderComponent($$result, "Navbar", Navbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/Navbar", "client:component-export": "default" }), renderComponent($$result, "HomeStats", HomeStats, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/HomeStats", "client:component-export": "default" }), renderComponent($$result, "HomeSections", HomeSections, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/components/HomeSections", "client:component-export": "default" }));
}, "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/test.astro", void 0);

const $$file = "F:/SISTEMAS/CAPACHICA/PROYECTO NUEVO/frontend mejorado/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
