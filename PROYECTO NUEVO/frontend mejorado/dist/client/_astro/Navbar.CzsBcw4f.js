import{j as t}from"./jsx-runtime.u17CrQMm.js";import{r}from"./index.saqyeS7l.js";const x=[{label:"Inicio",href:"/"},{label:"Destinos",href:"/destinos"},{label:"Vivencial",href:"/vivencial"},{label:"Actividades",href:"/actividades"},{label:"Gastronomía",href:"/gastronomia"},{label:"Festividades",href:"/festividades"},{label:"Artesanía",href:"/artesania"},{label:"Alojamiento",href:"/alojamiento"},{label:"Cómo Llegar",href:"/como-llegar"}];function j(){const[n,i]=r.useState(!0),[o,f]=r.useState(!1),[m,u]=r.useState(0),[a,s]=r.useState(!1),[l,v]=r.useState("/");r.useEffect(()=>{const e=localStorage.getItem("capachica-theme")||localStorage.getItem("theme"),c=e?e==="dark":!0;i(c),document.documentElement.setAttribute("data-theme",c?"dark":"light"),v(window.location.pathname);const p=()=>{const h=window.scrollY;f(h>24);const g=document.documentElement,b=g.scrollHeight-g.clientHeight;b>0&&u(h/b*100)};return window.addEventListener("scroll",p,{passive:!0}),()=>window.removeEventListener("scroll",p)},[]);const y=()=>{const e=!n;i(e),document.documentElement.setAttribute("data-theme",e?"dark":"light"),localStorage.setItem("capachica-theme",e?"dark":"light"),localStorage.setItem("theme",e?"dark":"light")},d=e=>e==="/"?l==="/":l.startsWith(e);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        @keyframes pulse-glow {
          0%,100%{ box-shadow: 0 0 18px rgba(56,189,248,0.35) }
          50%    { box-shadow: 0 0 32px rgba(56,189,248,0.65) }
        }
        .nav-link {
          padding: 6px 13px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(240,237,232,0.85);
          text-decoration: none;
          transition: all 0.22s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.15); }
        .nav-link.active {
          background: linear-gradient(135deg,#0ea5e9,#0369a1);
          color: #fff !important;
          font-weight: 600;
          box-shadow: 0 2px 14px rgba(56,189,248,0.3);
        }
        .hamburger { display: none !important; }
        @media (max-width: 960px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
        .mobile-menu a {
          display: block; padding: 12px 20px; font-size: 15px; font-weight: 500;
          color: var(--text2); text-decoration: none; border-radius: 14px;
          border-left: 3px solid transparent; transition: all 0.2s; margin-bottom: 2px;
        }
        .mobile-menu a:hover, .mobile-menu a.active {
          color: var(--accent); background: var(--accent-light); border-left-color: var(--accent);
        }
      `}),t.jsx("div",{style:{position:"fixed",top:0,left:0,height:3,width:`${m}%`,zIndex:200,pointerEvents:"none",background:"linear-gradient(90deg, #38bdf8, #0ea5e9, #fbbf24)",borderRadius:"0 2px 2px 0",transition:"width 0.08s linear",boxShadow:"0 0 8px rgba(56,189,248,0.6)"}}),t.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:o||a?n?"rgba(6,15,26,0.75)":"rgba(13,71,161,0.35)":"transparent",backdropFilter:o||a?"blur(24px) saturate(200%)":"none",WebkitBackdropFilter:o||a?"blur(24px) saturate(200%)":"none",borderBottom:o||a?`1px solid rgba(56,189,248,${n?"0.12":"0.2"})`:"1px solid transparent",boxShadow:o||a?"0 4px 24px rgba(0,0,0,0.08)":"none",transition:"all 0.35s ease",padding:"0 1.5rem"},children:[t.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",height:66,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[t.jsxs("a",{href:"/",style:{display:"flex",alignItems:"center",gap:10,textDecoration:"none",flexShrink:0},children:[t.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#0ea5e9,#0369a1)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontFamily:"var(--font-display)",fontWeight:700,fontSize:17,animation:"pulse-glow 3s ease-in-out infinite"},children:"C"}),t.jsxs("div",{children:[t.jsx("div",{style:{fontFamily:"var(--font-display)",fontWeight:700,fontSize:15,color:"rgba(240,237,232,0.95)",lineHeight:1},children:"Capachica"}),t.jsx("div",{style:{fontSize:9,color:"rgba(240,237,232,0.50)",letterSpacing:"0.14em",textTransform:"uppercase"},children:"Turismo Vivencial"})]})]}),t.jsx("div",{className:"nav-desktop",style:{display:"flex",gap:1,flex:1,justifyContent:"center"},children:x.map(e=>t.jsx("a",{href:e.href,className:`nav-link${d(e.href)?" active":""}`,children:e.label},e.href))}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,flexShrink:0},children:[t.jsx("button",{onClick:y,"aria-label":"Toggle theme",style:{width:50,height:28,borderRadius:14,background:n?"rgba(56,189,248,0.1)":"rgba(217,119,6,0.15)",border:"1px solid rgba(56,189,248,0.2)",cursor:"pointer",position:"relative",transition:"all 0.3s"},children:t.jsx("div",{style:{position:"absolute",top:4,left:n?24:4,width:20,height:20,borderRadius:"50%",background:n?"#38bdf8":"#fbbf24",transition:"left 0.3s",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,boxShadow:n?"0 0 10px rgba(56,189,248,0.7)":"0 0 10px rgba(251,191,36,0.7)"},children:n?"🌙":"☀️"})}),t.jsx("button",{className:"hamburger",onClick:()=>s(e=>!e),"aria-label":"Menu",style:{flexDirection:"column",gap:5,background:"transparent",border:"none",cursor:"pointer",padding:4},children:[0,1,2].map(e=>t.jsx("span",{style:{display:"block",width:22,height:2,background:a?"#38bdf8":"var(--text)",borderRadius:2,transition:"all 0.3s",transform:a?e===0?"rotate(45deg) translate(5px,5px)":e===2?"rotate(-45deg) translate(5px,-5px)":"none":"none",opacity:a&&e===1?0:1}},e))})]})]}),a&&t.jsx("div",{className:"mobile-menu",style:{padding:"10px 0 18px",borderTop:"1px solid rgba(56,189,248,0.1)"},children:x.map(e=>t.jsx("a",{href:e.href,className:d(e.href)?"active":"",onClick:()=>s(!1),children:e.label},e.href))})]})]})}export{j as default};
