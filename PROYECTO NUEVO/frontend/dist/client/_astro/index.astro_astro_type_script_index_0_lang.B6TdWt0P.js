const g=(function(){const r=typeof document<"u"&&document.createElement("link").relList;return r&&r.supports&&r.supports("modulepreload")?"modulepreload":"preload"})(),_=function(c){return"/"+c},h={},y=function(r,o,l){let a=Promise.resolve();if(o&&o.length>0){let m=function(n){return Promise.all(n.map(s=>Promise.resolve(s).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};var u=m;document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),t=e?.nonce||e?.getAttribute("nonce");a=m(o.map(n=>{if(n=_(n),n in h)return;h[n]=!0;const s=n.endsWith(".css"),p=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${p}`))return;const i=document.createElement("link");if(i.rel=s?"stylesheet":g,s||(i.as="script"),i.crossOrigin="",i.href=n,t&&i.setAttribute("nonce",t),document.head.appendChild(i),s)return new Promise((f,v)=>{i.addEventListener("load",f),i.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${n}`)))})}))}function d(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return a.then(e=>{for(const t of e||[])t.status==="rejected"&&d(t.reason);return r().catch(d)})},b={angularBaseUrl:"http://localhost:4200",angularLoginUrl:"http://localhost:4200/auth/login",adminPanelUrl:"http://localhost:4200/restaurantes",backendUrl:"http://localhost:3000"};document.addEventListener("filtros-aplicados",async c=>{const r=c.detail,o={};r.tipo_comida&&(o.tipo_comida=r.tipo_comida),r.precio_min&&(o.precio_min=r.precio_min),r.precio_max&&(o.precio_max=r.precio_max);const l=document.getElementById("restaurantes-list");l.innerHTML='<div class="loading-state">Cargando restaurantes...</div>';try{const{obtenerRestaurantes:a}=await y(async()=>{const{obtenerRestaurantes:u}=await import("./restaurante.service.DOlq9b8m.js");return{obtenerRestaurantes:u}},[]),d=await a(o);if(d.length===0)l.innerHTML='<div class="empty-state"><p>No se encontraron restaurantes con esos filtros.</p></div>';else{const u=d.map(e=>{let t=e.fotos&&e.fotos.length>0?e.fotos[0]:null;const m=t?t.startsWith("http")?t:b.backendUrl+t:"/images/placeholder.jpg",n=e.tipo_comida?e.tipo_comida.replace("_"," "):"Variado";return`
                    <article class="restaurante-card">
                        <a href="/gastronomia/${e.id}" class="card-link">
                            <div class="card-image-wrapper">
                                <img src="${m}" alt="${e.nombre}" class="card-image" />
                                <div class="image-overlay"></div>
                                <span class="card-badge">${n}</span>
                            </div>

                            <div class="card-content">
                                <h3 class="card-title">${e.nombre}</h3>

                                <div class="card-location">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span>${e.direccion||"Ubicación no disponible"}</span>
                                </div>

                                <p class="card-desc">${(e.descripcion||"").substring(0,80)}...</p>

                                <div class="card-footer">
                                    <span class="price-label">Precio promedio</span>
                                    <span class="price-value">${e.precio_promedio?"S/ "+e.precio_promedio:"No disponible"}</span>
                                </div>
                            </div>
                        </a>
                    </article>
                `}).join("");l.innerHTML=`<div class="restaurants-grid">${u}</div>`}}catch(a){l.innerHTML=`
                <div class="error-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>Error: ${a.message}</span>
                </div>
            `}});
