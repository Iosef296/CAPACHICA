/**
 * destinos3d.js — Capachica Turismo
 * Marcadores 3D flotantes en los cards de destinos.html
 * Three.js r128 via CDN
 */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;

  // Configuración por card (orden en el DOM)
  var CARDS = [
    { geo: 'torus',    color: 0x0d9488, emissive: 0x065f5a, speed: 0.8,  label: 'Llachón'    },
    { geo: 'tetra',    color: 0xfbbf24, emissive: 0xd97706, speed: 0.6,  label: 'Amaru'      },
    { geo: 'octa',     color: 0x5eead4, emissive: 0x0d9488, speed: 1.0,  label: 'Ticonata'   },
    { geo: 'dodeca',   color: 0xc4a065, emissive: 0x8b6914, speed: 0.7,  label: 'Capachica'  },
    { geo: 'icosa',    color: 0xd97706, emissive: 0x7c3d00, speed: 0.9,  label: 'Atardeceres'},
    { geo: 'box',      color: 0x9ca3af, emissive: 0x374151, speed: 0.5,  label: 'Chullpas'   },
  ];

  function buildGeo(type) {
    switch (type) {
      case 'torus':  return new THREE.TorusGeometry(0.5, 0.22, 12, 28);
      case 'tetra':  return new THREE.TetrahedronGeometry(0.7, 0);
      case 'octa':   return new THREE.OctahedronGeometry(0.65, 0);
      case 'dodeca': return new THREE.DodecahedronGeometry(0.6, 0);
      case 'icosa':  return new THREE.IcosahedronGeometry(0.65, 0);
      case 'box':    return new THREE.BoxGeometry(0.7, 0.7, 0.7);
      default:       return new THREE.SphereGeometry(0.55, 14, 14);
    }
  }

  // Escenas individuales por card
  var instances = [];

  var cardImgs = document.querySelectorAll('.card-img');
  cardImgs.forEach(function (cardImg, idx) {
    var cfg = CARDS[idx] || CARDS[CARDS.length - 1];

    // Canvas sobre la card-img
    var cvs = document.createElement('canvas');
    cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
    // Asegurar que card-img sea relative
    if (getComputedStyle(cardImg).position === 'static') {
      cardImg.style.position = 'relative';
    }
    cardImg.appendChild(cvs);

    // Renderer pequeño
    var r = new THREE.WebGLRenderer({ canvas: cvs, alpha: true, antialias: true });
    r.setClearColor(0x000000, 0);
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var w = cardImg.offsetWidth  || 300;
    var h = cardImg.offsetHeight || 200;
    r.setSize(w, h, false);

    // Escena mínima
    var sc  = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    cam.position.set(0, 0, 3);

    sc.add(new THREE.AmbientLight(0xffffff, 0.5));
    var dLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dLight.position.set(3, 4, 3);
    sc.add(dLight);
    var pLight = new THREE.PointLight(cfg.color, 1.5, 8);
    pLight.position.set(-1, 1, 2);
    sc.add(pLight);

    // Mesh
    var mat = new THREE.MeshStandardMaterial({
      color:          cfg.color,
      emissive:       cfg.emissive,
      emissiveIntensity: 0.35,
      metalness: 0.3,
      roughness: 0.4,
    });
    var mesh = new THREE.Mesh(buildGeo(cfg.geo), mat);
    sc.add(mesh);

    // Partículas pequeñas alrededor
    var pCount = 30;
    var pPos   = new Float32Array(pCount * 3);
    var pPhase = new Float32Array(pCount);
    for (var i = 0; i < pCount; i++) {
      var angle = Math.random() * Math.PI * 2;
      var rad   = 0.8 + Math.random() * 0.5;
      pPos[i*3]   = Math.cos(angle) * rad;
      pPos[i*3+1] = (Math.random() - 0.5) * 1.4;
      pPos[i*3+2] = Math.sin(angle) * rad;
      pPhase[i]   = Math.random() * Math.PI * 2;
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var pMat = new THREE.PointsMaterial({
      color: cfg.color, size: 0.04, sizeAttenuation: true,
      transparent: true, opacity: 0.8,
    });
    var particles = new THREE.Points(pGeo, pMat);
    sc.add(particles);

    instances.push({ r, sc, cam, mesh, particles, pPos, pPhase, cfg, cvs, cardImg });

    // Resize por card
    function resizeCard() {
      var nw = cardImg.offsetWidth  || 300;
      var nh = cardImg.offsetHeight || 200;
      r.setSize(nw, nh, false);
      cam.aspect = nw / nh;
      cam.updateProjectionMatrix();
    }
    window.addEventListener('resize', resizeCard, { passive: true });
  });

  if (!instances.length) return;

  // ── Loop único compartido ─────────────────────────────────────────────
  var clock   = new THREE.Clock();
  var running = true;

  function tick() {
    if (!running) return;
    requestAnimationFrame(tick);
    var t = clock.getElapsedTime();

    instances.forEach(function (inst) {
      var cfg = inst.cfg;
      // Rotación principal
      inst.mesh.rotation.x = t * cfg.speed * 0.45;
      inst.mesh.rotation.y = t * cfg.speed * 0.70;

      // Float vertical
      inst.mesh.position.y = Math.sin(t * cfg.speed * 0.6) * 0.12;

      // Escala pulso suave
      var pulse = 1.0 + Math.sin(t * cfg.speed * 1.2) * 0.04;
      inst.mesh.scale.setScalar(pulse);

      // Animar partículas
      var pp = inst.particles.geometry.attributes.position;
      for (var i = 0; i < inst.pPhase.length; i++) {
        var py = inst.pPos[i*3+1] + Math.sin(t * 0.8 + inst.pPhase[i]) * 0.2;
        pp.setY(i, py);
      }
      pp.needsUpdate = true;
      inst.particles.rotation.y = t * 0.15;

      inst.r.render(inst.sc, inst.cam);
    });
  }

  tick();

  window.addEventListener('beforeunload', function () {
    running = false;
    instances.forEach(function (inst) { inst.r.dispose(); });
  });

})();
