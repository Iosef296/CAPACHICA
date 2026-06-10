import{j as e}from"./jsx-runtime.u17CrQMm.js";import{r as n}from"./index.saqyeS7l.js";const d=[{id:"tierra",icon:"🚌",titulo:"Por Tierra desde Puno",distancia:"55 km",tiempo:"1.5 - 2h",opciones:[{nombre:"Minibús",detalle:"Terminal Zonal Puno",precio:"S/. 10-15",horario:"5am - 6pm",tiempo:"1.5-2h",icon:"🚐"},{nombre:"Taxi privado",detalle:"Directo a Capachica",precio:"S/. 80-120",horario:"Cualquier hora",tiempo:"1h",icon:"🚕"},{nombre:"Mototaxi",detalle:"Dentro de Capachica",precio:"S/. 3-8",horario:"Todo el día",tiempo:"15min",icon:"🛺"}]},{id:"aire",icon:"✈️",titulo:"Por Aire hasta Juliaca",distancia:"JUL → 30km a Puno",tiempo:"1h 20min desde Lima",opciones:[{nombre:"Desde Lima",detalle:"LATAM, Sky Airlines",precio:"Desde $60",horario:"Diario",tiempo:"1h 20min",icon:"✈️"},{nombre:"Desde Cusco",detalle:"Vuelo directo",precio:"Desde $45",horario:"Diario",tiempo:"40min",icon:"✈️"},{nombre:"Taxi Aeropuerto",detalle:"JUL → Puno",precio:"S/. 30",horario:"Todo el día",tiempo:"30min",icon:"🚕"}]},{id:"bus",icon:"🚌",titulo:"Bus Interprovincial",distancia:"Varias ciudades",tiempo:"5-6h desde Cusco",opciones:[{nombre:"Desde Cusco",detalle:"Buses nocturnos disponibles",precio:"S/. 30-50",horario:"Nocturno",tiempo:"5-6h",icon:"🚌"},{nombre:"Desde Arequipa",detalle:"Directo a Puno",precio:"S/. 25-40",horario:"Diario",tiempo:"5-6h",icon:"🚌"},{nombre:"Desde La Paz",detalle:"Cruzando Copacabana",precio:"S/. 20-35",horario:"Diario",tiempo:"3h",icon:"🚌"}]},{id:"lago",icon:"⛵",titulo:"Por el Lago Titicaca",distancia:"Muelle de Puno",tiempo:"2-3h en bote",opciones:[{nombre:"Bote desde Puno",detalle:"Travesía espectacular",precio:"S/. 40-60",horario:"Mañanas",tiempo:"2-3h",icon:"⛵"}]}],p=[{icon:"🌿",titulo:"Soroche (mal de altura)",desc:"Toma mate de coca al llegar. Descansa el primer día. Evita alcohol las primeras horas."},{icon:"💊",titulo:"Medicación",desc:"Consulta a tu médico sobre Acetazolamida (Diamox) si eres sensible a la altitud."},{icon:"💧",titulo:"Hidratación",desc:"Bebe mínimo 2 litros de agua al día. Capachica está a 3,810 m.s.n.m."},{icon:"🧥",titulo:"Ropa",desc:"Trae ropa abrigadora. Las noches son frías aunque el día sea cálido."},{icon:"📱",titulo:"Conectividad",desc:"Movistar y Claro tienen señal. Descarga mapas offline de la zona antes de viajar."},{icon:"💰",titulo:"Efectivo",desc:"Lleva soles en efectivo. No hay cajeros en Capachica, el más cercano está en Puno."}],m=[{nombre:"Transportes Capachica",telefono:"+51 951 234 567",servicio:"Minibús Puno-Capachica"},{nombre:"Taxi Don Carlos",telefono:"+51 962 345 678",servicio:"Taxi privado, recogida en aeropuerto"},{nombre:"Botes del Lago",telefono:"+51 973 456 789",servicio:"Travesía en bote desde Puno"}];function x(){const[s,o]=n.useState("tierra"),[t,c]=n.useState(""),i=d.find(a=>a.id===s),l=()=>{if(!t)return;const a=t.toLowerCase();a.includes("lima")?o("aire"):a.includes("cusco")||a.includes("arequipa")||a.includes("paz")?o("bus"):(a.includes("puno"),o("tierra"))};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .llegar-hero {
          padding: 100px 0 60px;
          background: rgba(7,24,38,0.8);
          text-align: center;
        }
        [data-theme="light"] .llegar-hero { background: rgba(168,212,238,0.35); }

        .llegar-section { padding: 80px 0; }
        .llegar-bg { background: rgba(7,24,38,0.5); }
        [data-theme="light"] .llegar-bg { background: rgba(168,212,238,0.2); }
        .llegar-bg2 { background: rgba(11,34,53,0.7); }
        [data-theme="light"] .llegar-bg2 { background: rgba(200,228,245,0.4); }

        .ruta-tab {
          padding: 12px 20px; border-radius: 16px;
          border: 1px solid rgba(120,200,255,0.2);
          background: transparent; color: #7f95aa;
          font-family: var(--font-body); font-size: 14px;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .ruta-tab:hover, .ruta-tab.active {
          background: linear-gradient(135deg,#1ba6d9,#0b6ea8);
          color: #fff; border-color: transparent;
          box-shadow: 0 0 20px rgba(83,211,255,0.25);
        }
        [data-theme="light"] .ruta-tab { color: #5a7a93; border-color: rgba(11,122,181,0.2); }

        .opcion-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px 24px; transition: transform 0.2s, box-shadow 0.2s;
        }
        [data-theme="light"] .opcion-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }
        .opcion-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(83,211,255,0.1);
        }

        .consejo-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px;
        }
        [data-theme="light"] .consejo-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }

        .consejos-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        @media (max-width: 900px) { .consejos-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .consejos-grid { grid-template-columns: 1fr; } }

        .rutas-tabs {
          display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px;
        }

        .sec-title { color: #f4f7fb; font-family: var(--font-display); }
        [data-theme="light"] .sec-title { color: #071826; }
        .sec-text { color: #b9c8d6; }
        [data-theme="light"] .sec-text { color: #2a4a63; }
        .sec-muted { color: #7f95aa; }
        [data-theme="light"] .sec-muted { color: #5a7a93; }
        .cyan { color: #53d3ff; }
        [data-theme="light"] .cyan { color: #0b7ab5; }
        .gold { color: #f5b32f; }
        [data-theme="light"] .gold { color: #c47d00; }

        .calculadora {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 20px;
          padding: 32px; margin-bottom: 40px;
        }
        [data-theme="light"] .calculadora {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }

        .transportista-card {
          background: rgba(18,47,76,0.78); backdrop-filter: blur(10px);
          border: 1px solid rgba(120,200,255,0.15); border-radius: 16px;
          padding: 20px 24px;
        }
        [data-theme="light"] .transportista-card {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(11,122,181,0.18);
        }
        .transportistas-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        @media (max-width: 768px) { .transportistas-grid { grid-template-columns: 1fr; } }
      `}),e.jsx("section",{className:"llegar-hero",children:e.jsxs("div",{className:"container",children:[e.jsx("span",{className:"badge badge-cyan",style:{marginBottom:20,display:"inline-block"},children:"CÓMO LLEGAR · CAPACHICA"}),e.jsxs("h1",{style:{fontFamily:"var(--font-display)",lineHeight:.95},children:[e.jsx("span",{className:"sec-title",style:{display:"block",fontSize:"clamp(42px,7vw,80px)",fontWeight:700},children:"Planifica tu"}),e.jsx("span",{className:"gold",style:{display:"block",fontSize:"clamp(38px,6.5vw,72px)",fontStyle:"italic",fontWeight:400},children:"Viaje"})]}),e.jsx("p",{className:"sec-text",style:{marginTop:20,fontSize:16,maxWidth:500,margin:"20px auto 0",lineHeight:1.7},children:"Cuentanos tu sueño y lo hacemos realidad. Respondemos en 24 horas."})]})}),e.jsx("section",{className:"llegar-section llegar-bg",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"calculadora",children:[e.jsx("h2",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:"clamp(22px,3vw,32px)",fontWeight:700,marginBottom:8},children:"🗺️ Calculadora de Ruta"}),e.jsx("p",{className:"sec-muted",style:{fontSize:14,marginBottom:24},children:"Ingresa tu ciudad de origen y te mostramos la mejor ruta"}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsx("input",{value:t,onChange:a=>c(a.target.value),placeholder:"¿Desde dónde viajas? Ej: Lima, Cusco, Arequipa...",onKeyDown:a=>a.key==="Enter"&&l(),style:{flex:1,minWidth:200,padding:"12px 16px",background:"rgba(11,60,96,0.5)",border:"1px solid rgba(120,200,255,0.2)",borderRadius:12,color:"#f4f7fb",fontFamily:"var(--font-body)",fontSize:14,outline:"none"}}),e.jsx("button",{onClick:l,className:"btn-primary",children:"Ver ruta →"})]})]}),e.jsx("div",{className:"rutas-tabs",children:d.map(a=>e.jsxs("button",{className:`ruta-tab ${s===a.id?"active":""}`,onClick:()=>o(a.id),children:[e.jsx("span",{children:a.icon}),e.jsx("span",{children:a.titulo})]},a.id))}),i&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:24,flexWrap:"wrap"},children:[e.jsxs("h3",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:24,fontWeight:700},children:[i.icon," ",i.titulo]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("span",{className:"badge badge-cyan",children:i.distancia}),e.jsx("span",{className:"badge badge-gold",children:i.tiempo})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",gap:20},children:i.opciones.map((a,r)=>e.jsxs("div",{className:"opcion-card",children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:a.icon}),e.jsx("h4",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:18,fontWeight:700,marginBottom:4},children:a.nombre}),e.jsx("p",{className:"sec-muted",style:{fontSize:13,marginBottom:12},children:a.detalle}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8},children:[e.jsxs("div",{style:{background:"rgba(83,211,255,0.08)",borderRadius:10,padding:"8px 12px"},children:[e.jsx("div",{className:"sec-muted",style:{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"},children:"Precio"}),e.jsx("div",{className:"cyan",style:{fontSize:15,fontWeight:700,marginTop:2},children:a.precio})]}),e.jsxs("div",{style:{background:"rgba(245,179,47,0.08)",borderRadius:10,padding:"8px 12px"},children:[e.jsx("div",{className:"sec-muted",style:{fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"},children:"Tiempo"}),e.jsx("div",{className:"gold",style:{fontSize:15,fontWeight:700,marginTop:2},children:a.tiempo})]})]}),e.jsxs("p",{className:"sec-muted",style:{fontSize:12,marginTop:10},children:["🕐 ",a.horario]})]},r))})]})]})}),e.jsx("section",{className:"llegar-section llegar-bg2",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("span",{className:"badge badge-cyan",style:{marginBottom:16,display:"inline-block"},children:"— UBICACIÓN"}),e.jsx("h2",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:"clamp(26px,4vw,44px)",fontWeight:700,marginTop:8},children:"Encuéntranos en el mapa"})]}),e.jsx("div",{style:{borderRadius:20,overflow:"hidden",border:"1px solid rgba(120,200,255,0.2)",boxShadow:"0 10px 40px rgba(0,0,0,0.4)"},children:e.jsx("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30587.94!2d-69.8!3d-15.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915d6b5e9a4c1e1f%3A0x1234567890abcdef!2sCapachica%2C%20Puno%2C%20Peru!5e0!3m2!1ses!2spe!4v1234567890",width:"100%",height:"420",style:{border:0,display:"block"},allowFullScreen:!0,loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})}),e.jsxs("div",{style:{display:"flex",gap:12,marginTop:16,flexWrap:"wrap"},children:[e.jsx("a",{href:"https://maps.google.com/?q=Capachica,Puno,Peru",target:"_blank",rel:"noopener noreferrer",className:"btn-primary",style:{fontSize:13},children:"📍 Abrir en Google Maps"}),e.jsx("a",{href:"https://maps.google.com/?q=Capachica,Puno,Peru&travelmode=driving",target:"_blank",rel:"noopener noreferrer",className:"btn-outline",style:{fontSize:13},children:"🗺️ Cómo llegar en coche"})]})]})}),e.jsx("section",{className:"llegar-section llegar-bg",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("span",{className:"badge badge-gold",style:{marginBottom:16,display:"inline-block"},children:"— CONTACTOS"}),e.jsx("h2",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:"clamp(26px,4vw,44px)",fontWeight:700,marginTop:8},children:"Transportistas de Confianza"})]}),e.jsx("div",{className:"transportistas-grid",children:m.map((a,r)=>e.jsxs("div",{className:"transportista-card",children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:"📞"}),e.jsx("h4",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:17,fontWeight:700,marginBottom:4},children:a.nombre}),e.jsx("p",{className:"sec-muted",style:{fontSize:13,marginBottom:12},children:a.servicio}),e.jsxs("a",{href:`https://wa.me/${a.telefono.replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",className:"btn-primary",style:{padding:"10px 20px",fontSize:13,display:"inline-flex"},children:["💬 ",a.telefono]})]},r))})]})}),e.jsx("section",{className:"llegar-section llegar-bg2",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:40},children:[e.jsx("span",{className:"badge badge-cyan",style:{marginBottom:16,display:"inline-block"},children:"— TIPS"}),e.jsx("h2",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:"clamp(26px,4vw,44px)",fontWeight:700,marginTop:8},children:"Consejos para tu viaje"})]}),e.jsx("div",{className:"consejos-grid",children:p.map((a,r)=>e.jsxs("div",{className:"consejo-card",children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:a.icon}),e.jsx("h4",{className:"sec-title",style:{fontFamily:"var(--font-display)",fontSize:16,fontWeight:700,marginBottom:8},children:a.titulo}),e.jsx("p",{className:"sec-muted",style:{fontSize:13,lineHeight:1.7},children:a.desc})]},r))})]})})]})}export{x as default};
