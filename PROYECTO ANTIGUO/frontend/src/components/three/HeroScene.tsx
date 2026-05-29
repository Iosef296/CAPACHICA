import React, { useRef, useMemo, useEffect, useLayoutEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Stars } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import * as THREE from "three"

// ─────────────────────────────────────────────────────────────────────────────
// Water — custom shader via <shaderMaterial>
// ─────────────────────────────────────────────────────────────────────────────
const WATER_VERT = `
  uniform float uTime;
  varying vec2  vUv;
  varying vec3  vWorldPos;
  varying vec3  vNormal;

  float wave(vec2 pos, vec2 dir, float amp, float freq, float spd, float ph){
    return amp * sin(freq * dot(dir, pos) - spd * uTime + ph);
  }

  void main(){
    vUv  = uv;
    vec3 p = position;
    p.y += wave(p.xz, normalize(vec2(1.0, 0.6)),  0.13, 1.4, 0.8, 0.0);
    p.y += wave(p.xz, normalize(vec2(-0.7,1.0)), 0.08, 2.2, 1.1, 1.5);
    p.y += wave(p.xz, normalize(vec2(0.4,-0.8)), 0.04, 3.5, 1.7, 3.0);
    vWorldPos   = (modelMatrix * vec4(p, 1.0)).xyz;
    vNormal     = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const WATER_FRAG = `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2  vUv;
  varying vec3  vWorldPos;
  varying vec3  vNormal;

  void main(){
    vec3 deep    = vec3(0.025, 0.14, 0.10);
    vec3 shallow = vec3(0.05,  0.50, 0.44);
    vec3 col     = mix(deep, shallow, vUv.y * 0.65);

    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
    col = mix(col, vec3(0.37, 0.93, 0.83), fresnel * 0.28);

    vec3  L    = normalize(vec3(2.0, 5.0, -4.0));
    float spec = pow(max(dot(reflect(-L, vNormal), viewDir), 0.0), 48.0);
    col += vec3(0.5, 1.0, 0.9) * spec * 0.9;

    vec2  rp  = vUv - (uMouse * 0.5 + 0.5);
    float rd  = length(rp) * 9.0;
    col += vec3(0.2, 0.9, 0.8) * sin(rd - uTime*3.0) * exp(-rd*0.5) * 0.07;

    float sp = step(0.997, sin(vUv.x*340.0+uTime) * sin(vUv.y*280.0+uTime*0.8));
    col += 0.6 * sp;

    gl_FragColor = vec4(col, 0.92);
  }
`

function Water() {
  const matRef   = useRef<THREE.ShaderMaterial>(null)
  const mouseTgt = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  useEffect(() => {
    const fn = (e: MouseEvent) =>
      mouseTgt.current.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
       -(e.clientY / window.innerHeight) * 2 + 1,
      )
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    matRef.current.uniforms.uMouse.value.lerp(mouseTgt.current, 0.06)
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[120, 120, 80, 80]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={WATER_VERT}
        fragmentShader={WATER_FRAG}
        transparent
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mountains — ShapeGeometry en capas
// ─────────────────────────────────────────────────────────────────────────────
function createShape(peaks: number[], W: number) {
  const shape = new THREE.Shape()
  const step  = W / (peaks.length - 1)
  shape.moveTo(-W / 2, 0)
  peaks.forEach((h, i) => shape.lineTo(-W / 2 + i * step, h))
  shape.lineTo(W / 2, 0)
  shape.closePath()
  return shape
}

function Mountains() {
  const layers = useMemo(() => [
    { peaks: [0,2,3,1,4,1.5,6,2,3.5,1.5,5,2,0], W: 90, z: -38, col: "#040c08" },
    { peaks: [0,3,1.5,5,2,7,1,5,2,4,1.5,6,0],   W: 75, z: -27, col: "#071510" },
    { peaks: [0,2,4,2.5,7,1.5,5,3,8,2,4,0],      W: 60, z: -18, col: "#091a14" },
  ], [])

  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} position={[0, -1.5, l.z]}>
          <shapeGeometry args={[createShape(l.peaks, l.W)]} />
          <meshStandardMaterial color={l.col} roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Particles — huyen del cursor
// ─────────────────────────────────────────────────────────────────────────────
const N = 160

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const geomRef = useRef<THREE.BufferGeometry>(null)

  const pos  = useMemo(() => new Float32Array(N * 3), [])
  const vel  = useMemo(() => new Float32Array(N * 3), [])
  const home = useMemo(() => new Float32Array(N * 3), [])

  // Init positions
  useLayoutEffect(() => {
    for (let i = 0; i < N; i++) {
      const x = (Math.random() - 0.5) * 36
      const y = Math.random() * 10 - 0.5
      const z = (Math.random() - 0.5) * 26
      pos[i*3]=x;  pos[i*3+1]=y;  pos[i*3+2]=z
      home[i*3]=x; home[i*3+1]=y; home[i*3+2]=z
    }
    if (geomRef.current) {
      geomRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(pos, 3)
      )
    }
  }, [])

  const mouse2D = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse2D.current.x = (e.clientX / window.innerWidth  - 0.5) * 36
      mouse2D.current.y = (-(e.clientY / window.innerHeight) + 0.5) * 20
    }
    window.addEventListener("mousemove", fn, { passive: true })
    return () => window.removeEventListener("mousemove", fn)
  }, [])

  useFrame(({ clock }) => {
    const geom = geomRef.current
    if (!geom) return
    const attr = geom.attributes.position as THREE.BufferAttribute
    if (!attr) return
    const t = clock.getElapsedTime()
    const mx = mouse2D.current.x, my = mouse2D.current.y

    for (let i = 0; i < N; i++) {
      const ix=i*3, iy=i*3+1, iz=i*3+2
      const px=attr.getX(i), py=attr.getY(i), pz=attr.getZ(i)

      const dx=px-mx, dy=py-my
      const d2=dx*dx+dy*dy, R=6.0

      if (d2 < R*R){
        const d = Math.sqrt(d2)+0.001
        const f = ((R-d)/R)*0.11
        vel[ix]+=dx/d*f; vel[iy]+=dy/d*f
      }

      vel[ix]+=(home[ix]-px)*0.018
      vel[iy]+=(home[iy]-py)*0.018
      vel[iz]+=(home[iz]-pz)*0.018
      vel[iy]+=Math.sin(t*0.6+i*0.31)*0.0007
      vel[ix]*=0.91; vel[iy]*=0.91; vel[iz]*=0.91

      attr.setXYZ(i, px+vel[ix], py+vel[iy], pz+vel[iz])
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        color="#5eead4"
        size={0.13}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Camera rig — paralaje + zoom scroll
// ─────────────────────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const tgt = useRef({ x: 0, y: 1.5, z: 10 })
  const cur = useRef({ x: 0, y: 1.5, z: 10 })
  const m   = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move  = (e: MouseEvent) => {
      m.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      m.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const wheel = (e: WheelEvent) => {
      tgt.current.z = THREE.MathUtils.clamp(tgt.current.z + e.deltaY*0.007, 6, 16)
    }
    const touch = (e: TouchEvent) => {
      if (!e.touches[0]) return
      m.current.x = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2
      m.current.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", move,  { passive: true })
    window.addEventListener("wheel",     wheel, { passive: true })
    window.addEventListener("touchmove", touch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("wheel",     wheel)
      window.removeEventListener("touchmove", touch)
    }
  }, [])

  useFrame(() => {
    const D = 0.045
    tgt.current.x =  m.current.x * 2.5
    tgt.current.y = -m.current.y * 1.0 + 1.5
    cur.current.x += (tgt.current.x - cur.current.x) * D
    cur.current.y += (tgt.current.y - cur.current.y) * D
    cur.current.z += (tgt.current.z - cur.current.z) * D
    camera.position.set(cur.current.x, cur.current.y, cur.current.z)
    camera.lookAt(cur.current.x * 0.25, 0, 0)
  })

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <Sky sunPosition={[10,1.5,-25]} turbidity={11} rayleigh={0.65} mieCoefficient={0.007} mieDirectionalG={0.88} />
      <Stars radius={120} depth={60} count={2800} factor={3} fade speed={0.5} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[10,8,-20]} intensity={1.4} color="#fbbf24" />
      <pointLight position={[0,3,0]}   intensity={1.2} color="#0d9488" distance={30} />
      <pointLight position={[-8,2,-4]} intensity={0.5} color="#5eead4" distance={20} />
      <fog attach="fog" args={["#071510", 28, 80]} />
      <Water />
      <Mountains />
      <Particles />
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.18} luminanceSmoothing={0.85} />
        <Vignette eskil={false} offset={0.3} darkness={0.75} />
      </EffectComposer>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 10], fov: 60, near: 0.1, far: 200 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
