/**
 * hero3d.js — Capachica Turismo
 * Escena Three.js r128 para el hero de index.html
 * Sin bundler — todo via CDN globals
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') { console.warn('hero3d: THREE no cargado'); return; }

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // ── Renderer ────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // ── Scene ────────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x071510, 0.015);

  // Gradiente cielo andino como fondo de escena
  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 2; skyCanvas.height = 512;
  const skyCtx = skyCanvas.getContext('2d');
  const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 512);
  skyGrad.addColorStop(0.00, '#040c08');
  skyGrad.addColorStop(0.20, '#071510');
  skyGrad.addColorStop(0.50, '#0a1a14');
  skyGrad.addColorStop(0.75, '#0d2a1e');
  skyGrad.addColorStop(1.00, '#0d3830');
  skyCtx.fillStyle = skyGrad;
  skyCtx.fillRect(0, 0, 2, 512);
  scene.background = new THREE.CanvasTexture(skyCanvas);

  // ── Cámara ──────────────────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 10, 18);
  camera.lookAt(0, 0, 0);

  // ── OrbitControls ────────────────────────────────────────────────────────
  var controls = null;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.05;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.35;
    controls.enablePan       = false;
    controls.enableZoom      = true;
    controls.zoomSpeed       = 0.5;
    controls.minDistance     = 10;
    controls.maxDistance     = 42;
    controls.maxPolarAngle   = Math.PI / 2.05;
    controls.minPolarAngle   = 0.20;
  }

  // ── Luces ────────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x1a3a2a, 0.9));

  var sun = new THREE.DirectionalLight(0xfbbf24, 2.0);
  sun.position.set(14, 12, -8);
  sun.castShadow = true;
  sun.shadow.mapSize.width  = 1024;
  sun.shadow.mapSize.height = 1024;
  sun.shadow.camera.left   = -20; sun.shadow.camera.right = 20;
  sun.shadow.camera.top    =  20; sun.shadow.camera.bottom = -20;
  sun.shadow.camera.near   = 0.5; sun.shadow.camera.far   = 60;
  scene.add(sun);

  var rim = new THREE.DirectionalLight(0x5eead4, 0.4);
  rim.position.set(-12, 4, 14);
  scene.add(rim);

  var waterGlow = new THREE.PointLight(0x0d9488, 0.7, 35);
  waterGlow.position.set(0, 0.5, 0);
  scene.add(waterGlow);

  // ── Agua (shader custom) ─────────────────────────────────────────────────
  var waterUniforms = {
    uTime:  { value: 0.0 },
    uDeep:  { value: new THREE.Color(0x073a30) },
    uLight: { value: new THREE.Color(0x0d9488) },
  };

  var waterMat = new THREE.ShaderMaterial({
    uniforms: waterUniforms,
    vertexShader: [
      'uniform float uTime;',
      'varying vec2  vUv;',
      'varying float vElev;',
      'void main(){',
      '  vUv = uv;',
      '  vec3 p = position;',
      '  float w =',
      '    sin(p.x*2.4 + uTime*1.10)*0.14 +',
      '    sin(p.z*2.0 + uTime*0.85)*0.11 +',
      '    sin(p.x*1.3 + p.z*1.9 + uTime*0.65)*0.07 +',
      '    sin(p.x*3.5 + uTime*1.80)*0.03;',
      '  p.y   += w;',
      '  vElev  = w;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);',
      '}',
    ].join('\n'),
    fragmentShader: [
      'uniform float uTime;',
      'uniform vec3  uDeep;',
      'uniform vec3  uLight;',
      'varying vec2  vUv;',
      'varying float vElev;',
      'void main(){',
      '  float t   = clamp((vElev+0.35)/0.70,0.0,1.0);',
      '  vec3  col = mix(uDeep, uLight, t*0.55);',
      '  float crest = smoothstep(0.20,0.35,vElev);',
      '  col += vec3(0.37,0.93,0.83)*crest*0.55;',
      '  float sp = step(0.996, sin(vUv.x*180.0+uTime)*sin(vUv.y*150.0+uTime*1.2));',
      '  col += vec3(0.8,1.0,0.95)*sp*0.8;',
      '  gl_FragColor = vec4(col, 0.92);',
      '}',
    ].join('\n'),
    transparent: true,
    side: THREE.DoubleSide,
  });

  var waterMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80, 100, 100),
    waterMat
  );
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = -0.4;
  scene.add(waterMesh);

  // ── Isla ─────────────────────────────────────────────────────────────────
  function lam(hex) { return new THREE.MeshLambertMaterial({ color: hex }); }
  function sh(m)    { m.castShadow = true; m.receiveShadow = true; return m; }

  var island = (function buildIsland() {
    var g = new THREE.Group();

    // Base tierra
    g.add(sh(new THREE.Mesh(new THREE.CylinderGeometry(5, 5.6, 1.1, 28), lam(0x5c3d1e))));
    var base = g.children[0]; base.position.y = 0.15;

    // Colina verde
    var hill = sh(new THREE.Mesh(
      new THREE.SphereGeometry(5, 28, 28, 0, Math.PI*2, 0, Math.PI*0.44),
      lam(0x1e5c28)
    ));
    hill.position.y = 0.55;
    g.add(hill);

    // Pico central (mirador)
    var mtMat = lam(0x163d20);
    var mt0 = sh(new THREE.Mesh(new THREE.ConeGeometry(1.9, 3.8, 8), mtMat));
    mt0.position.set(0.4, 2.5, -0.6);
    g.add(mt0);

    // Picos secundarios
    var peaks = [[-1.9, 1.5, -1.2, 1.2, 2.4, 7], [1.7, 1.2, 1.4, 0.9, 1.9, 6]];
    peaks.forEach(function(d) {
      var mt = sh(new THREE.Mesh(new THREE.ConeGeometry(d[3], d[4], d[5]), mtMat));
      mt.position.set(d[0], d[1], d[2]);
      mt.rotation.y = Math.random() * 0.8;
      g.add(mt);
    });

    // Árboles
    var trunkMat  = lam(0x4a2f18);
    var treeColrs = [0x2d7a2d, 0x1e6b1e, 0x3a8a3a, 0x256025, 0x1a5a1a];
    var treePos   = [
      [-3.0, 1.6], [-2.6,-2.1], [2.9,-2.0],
      [ 3.2, 0.6], [-1.1, 3.6], [1.6,  3.3],
      [-3.9,-0.4], [0.9, -3.9], [-0.5, 3.9],
      [ 2.5,-3.2],
    ];
    treePos.forEach(function(tp, i) {
      var h = 0.65 + Math.random() * 0.45;
      var trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, h, 5), trunkMat);
      trunk.position.set(tp[0], 0.7 + h/2, tp[1]);
      g.add(trunk);
      var foliage = sh(new THREE.Mesh(
        new THREE.ConeGeometry(0.33 + Math.random()*0.15, 0.85, 5),
        lam(treeColrs[i % treeColrs.length])
      ));
      foliage.position.set(tp[0], 0.7 + h + 0.28, tp[1]);
      g.add(foliage);
    });

    // Casas andinas
    var bodyMat = lam(0xc4a065);
    var roofMat = lam(0x8b3a1a);
    var houses  = [
      {x:-1.6, z:1.9, ry:0.30},
      {x: 1.6, z:1.6, ry:-0.50},
      {x:-2.1, z:-1.6, ry:1.00},
      {x: 2.1, z:-1.9, ry:-0.80},
    ];
    houses.forEach(function(h) {
      var hg   = new THREE.Group();
      var body = sh(new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.60), bodyMat));
      body.position.y = 0.28;
      hg.add(body);
      var roof = sh(new THREE.Mesh(new THREE.ConeGeometry(0.57, 0.38, 4), roofMat));
      roof.position.y = 0.74;
      roof.rotation.y = Math.PI / 4;
      hg.add(roof);
      hg.position.set(h.x, 0.70, h.z);
      hg.rotation.y = h.ry;
      g.add(hg);
    });

    // Muelle de totora
    var dockMat = lam(0x8b6914);
    var pier = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 1.8), dockMat);
    pier.position.set(4.2, 0.1, 0.2);
    pier.rotation.y = 0.15;
    g.add(pier);

    // Barca de totora
    var boat = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.38), lam(0xd4a832));
    boat.position.set(5.1, -0.05, 0.4);
    boat.rotation.y = 0.6;
    g.add(boat);
    var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.7, 5), lam(0xa87232));
    mast.position.set(5.1, 0.35, 0.4);
    g.add(mast);

    return g;
  })();

  scene.add(island);

  // ── Estrellas ────────────────────────────────────────────────────────────
  (function makeStars() {
    var N   = 1800;
    var pos = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) {
      var theta = Math.random() * Math.PI * 2;
      var phi   = Math.acos(2 * Math.random() - 1);
      var r     = 90 + Math.random() * 20;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.cos(phi);
      pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.25, sizeAttenuation: true,
      transparent: true, opacity: 0.7,
    })));
  })();

  // ── Niebla del lago ──────────────────────────────────────────────────────
  var mistMesh = (function makeMist() {
    var N      = 250;
    var pos    = new Float32Array(N * 3);
    var phases = new Float32Array(N);
    for (var i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 52;
      pos[i*3+1] = Math.random() * 1.2;
      pos[i*3+2] = (Math.random() - 0.5) * 52;
      phases[i]  = Math.random() * Math.PI * 2;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({
      color: 0x5eead4, size: 0.13, sizeAttenuation: true,
      transparent: true, opacity: 0.35,
    });
    var pts = new THREE.Points(geo, mat);
    pts.userData.phases = phases;
    return pts;
  })();
  scene.add(mistMesh);

  // ── Resize ───────────────────────────────────────────────────────────────
  function resize() {
    var parent = canvas.parentElement || document.body;
    var w = parent.offsetWidth  || window.innerWidth;
    var h = parent.offsetHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // ── Hint "arrastra" ──────────────────────────────────────────────────────
  var hint = document.getElementById('hero-3d-hint');
  if (hint) {
    renderer.domElement.addEventListener('pointerdown', function() {
      hint.style.opacity = '0';
    }, { once: true });
  }

  // ── Loop ─────────────────────────────────────────────────────────────────
  var clock   = new THREE.Clock();
  var running = true;

  function tick() {
    if (!running) return;
    requestAnimationFrame(tick);

    var t = clock.getElapsedTime();

    // Agua
    waterUniforms.uTime.value = t;

    // Isla flota suavemente
    island.position.y = Math.sin(t * 0.25) * 0.06;

    // Niebla animada
    var mistPos = mistMesh.geometry.attributes.position;
    var phases  = mistMesh.userData.phases;
    for (var i = 0; i < 250; i++) {
      mistPos.setY(i, Math.sin(t * 0.35 + phases[i]) * 0.3 + 0.5);
    }
    mistPos.needsUpdate = true;

    // Pulso de luz del agua
    waterGlow.intensity = 0.5 + Math.sin(t * 0.55) * 0.18;

    if (controls) controls.update();
    renderer.render(scene, camera);
  }

  tick();

  window.addEventListener('beforeunload', function() {
    running = false;
    renderer.dispose();
  });

})();
