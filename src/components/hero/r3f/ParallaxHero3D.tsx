import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HeroContent from "../HeroContent";

/**
 * ParallaxHero3D — full React Three Fiber rebuild of the "3d" hero theme.
 * Replaces CSS/SVG/PNG parallax with a single <Canvas> rendering:
 *   sky dome · stars · sun/moon · clouds · scene (mountains|city|ocean) · weather
 * HeroContent stays as DOM overlay for crisp text / a11y / SEO.
 */

type SceneId = "mountains" | "city" | "ocean";
type Weather = "clear" | "rain" | "snow";
const SCENES: SceneId[] = ["mountains", "city", "ocean"];

// ---------- shared GLSL helpers ----------
const GLSL_NOISE = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0 - 2.0*f);
    return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
`;

// =================== SKY DOME ===================
const SkyDome: React.FC<{ dayRef: React.MutableRefObject<number> }> = ({ dayRef }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uMix: { value: 0 },
      uNightTop: { value: new THREE.Color("#050617") },
      uNightHorizon: { value: new THREE.Color("#1a1a3a") },
      uDayTop: { value: new THREE.Color("#3b82f6") },
      uDayHorizon: { value: new THREE.Color("#cfe6f7") },
    }),
    []
  );
  useFrame(() => {
    if (matRef.current) (matRef.current.uniforms as any).uMix.value = dayRef.current;
  });
  return (
    <mesh>
      <sphereGeometry args={[200, 32, 16]} />
      <shaderMaterial
        ref={matRef}
        side={THREE.BackSide}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vPos;
          void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `}
        fragmentShader={`
          varying vec3 vPos;
          uniform float uMix;
          uniform vec3 uNightTop, uNightHorizon, uDayTop, uDayHorizon;
          void main(){
            float h = clamp(vPos.y / 200.0 * 0.5 + 0.5, 0.0, 1.0);
            vec3 night = mix(uNightHorizon, uNightTop, smoothstep(0.4, 1.0, h));
            vec3 day   = mix(uDayHorizon,   uDayTop,   smoothstep(0.4, 1.0, h));
            gl_FragColor = vec4(mix(night, day, uMix), 1.0);
          }
        `}
      />
    </mesh>
  );
};

// =================== STARS ===================
const Stars: React.FC<{ dayRef: React.MutableRefObject<number> }> = ({ dayRef }) => {
  const ptsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 220 : 450;

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // upper hemisphere only
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.8 + 0.1);
      const r = 140;
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(r * Math.cos(phi));
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      seeds[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMix: { value: 0 } }),
    []
  );

  useFrame(({ clock }) => {
    if (matRef.current) {
      (matRef.current.uniforms as any).uTime.value = clock.elapsedTime;
      (matRef.current.uniforms as any).uMix.value = dayRef.current;
    }
  });

  return (
    <points ref={ptsRef} geometry={geom}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          attribute float aSeed;
          uniform float uTime;
          varying float vTwinkle;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = 1.5 + 1.5 * aSeed;
            vTwinkle = 0.5 + 0.5 * sin(uTime * (1.0 + aSeed * 3.0) + aSeed * 6.28);
          }
        `}
        fragmentShader={`
          uniform float uMix;
          varying float vTwinkle;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float a = smoothstep(0.5, 0.0, d) * vTwinkle * (1.0 - uMix);
            gl_FragColor = vec4(1.0, 1.0, 1.0, a);
          }
        `}
      />
    </points>
  );
};

// =================== SUN / MOON ===================
const Celestial: React.FC<{
  dayRef: React.MutableRefObject<number>;
  type: "sun" | "moon";
}> = ({ dayRef, type }) => {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uMix: { value: 0 },
      uColor:
        type === "sun"
          ? { value: new THREE.Color("#ffd27a") }
          : { value: new THREE.Color("#e8eef8") },
      uIsSun: { value: type === "sun" ? 1 : 0 },
    }),
    [type]
  );

  useFrame(() => {
    const m = dayRef.current; // 0 night → 1 day
    if (matRef.current) (matRef.current.uniforms as any).uMix.value = m;
    if (ref.current) {
      // sun arcs across when day, moon when night
      const t = type === "sun" ? m : 1 - m;
      const angle = (t - 0.5) * Math.PI * 0.9; // -.45π .. +.45π
      const r = 80;
      ref.current.position.x = Math.sin(angle) * r * 0.9;
      ref.current.position.y = Math.cos(angle) * r * 0.55 + 10;
      ref.current.position.z = -90;
      ref.current.lookAt(0, ref.current.position.y, 0);
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[18, 18]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uMix;
          uniform int uIsSun;
          void main(){
            vec2 c = vUv - 0.5;
            float d = length(c);
            float core = smoothstep(0.32, 0.0, d);
            float halo = smoothstep(0.5, 0.05, d) * 0.5;
            float a = (core + halo);
            // sun visible by day, moon by night
            float vis = (uIsSun == 1) ? uMix : (1.0 - uMix);
            gl_FragColor = vec4(uColor, a * vis);
          }
        `}
      />
    </mesh>
  );
};

// =================== CLOUDS ===================
const Clouds: React.FC<{
  dayRef: React.MutableRefObject<number>;
  density: number; // 0..1
}> = ({ dayRef, density }) => {
  const groupRef = useRef<THREE.Group>(null);
  const count = Math.max(0, Math.round(14 * density));
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 120,
        y: 18 + Math.random() * 12,
        z: -40 - Math.random() * 30,
        s: 8 + Math.random() * 14,
        speed: 0.4 + Math.random() * 0.6,
        offset: Math.random() * 100,
        seed: i,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const s = seeds[i];
      const x = ((s.x + s.offset + t * s.speed) % 140) - 70;
      child.position.x = x;
    });
  });

  return (
    <group ref={groupRef}>
      {seeds.map((s) => (
        <mesh key={s.seed} position={[s.x, s.y, s.z]}>
          <planeGeometry args={[s.s, s.s * 0.55]} />
          <CloudMat dayRef={dayRef} />
        </mesh>
      ))}
    </group>
  );
};

const CloudMat: React.FC<{ dayRef: React.MutableRefObject<number> }> = ({ dayRef }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uMix: { value: 0 }, uSeed: { value: Math.random() * 100 } }),
    []
  );
  useFrame(() => {
    if (matRef.current) (matRef.current.uniforms as any).uMix.value = dayRef.current;
  });
  return (
    <shaderMaterial
      ref={matRef}
      uniforms={uniforms}
      transparent
      depthWrite={false}
      vertexShader={`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `}
      fragmentShader={`
        varying vec2 vUv;
        uniform float uMix;
        uniform float uSeed;
        ${GLSL_NOISE}
        void main(){
          vec2 c = vUv - 0.5;
          float radial = smoothstep(0.5, 0.1, length(c));
          float n = fbm(vUv * 4.0 + uSeed);
          float a = radial * smoothstep(0.35, 0.75, n) * 0.7;
          vec3 day = vec3(1.0);
          vec3 night = vec3(0.55, 0.6, 0.75);
          gl_FragColor = vec4(mix(night, day, uMix), a * (0.5 + 0.5 * uMix));
        }
      `}
    />
  );
};

// =================== MOUNTAINS SCENE ===================
const MountainsScene: React.FC<{ dayRef: React.MutableRefObject<number>; visibleRef: React.MutableRefObject<number> }> = ({ dayRef, visibleRef }) => {
  return (
    <group>
      <MountainRidge z={-35} height={14} seed={1.0} blur color="#1a1f3a" colorDay="#7a90b8" dayRef={dayRef} visibleRef={visibleRef} />
      <MountainRidge z={-20} height={18} seed={2.7} color="#0b0f24" colorDay="#4a5a82" dayRef={dayRef} visibleRef={visibleRef} />
    </group>
  );
};

const MountainRidge: React.FC<{
  z: number; height: number; seed: number; blur?: boolean; color: string; colorDay: string;
  dayRef: React.MutableRefObject<number>; visibleRef: React.MutableRefObject<number>;
}> = ({ z, height, seed, blur, color, colorDay, dayRef, visibleRef }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uMix: { value: 0 },
      uVisible: { value: 0 },
      uSeed: { value: seed },
      uHeight: { value: height },
      uBlur: { value: blur ? 1 : 0 },
      uColor: { value: new THREE.Color(color) },
      uColorDay: { value: new THREE.Color(colorDay) },
    }),
    [seed, height, blur, color, colorDay]
  );

  useFrame(() => {
    if (matRef.current) {
      (matRef.current.uniforms as any).uMix.value = dayRef.current;
      (matRef.current.uniforms as any).uVisible.value = visibleRef.current;
    }
  });

  return (
    <mesh position={[0, -8, z]}>
      <planeGeometry args={[160, 40, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uMix, uVisible, uSeed, uHeight, uBlur;
          uniform vec3 uColor, uColorDay;
          ${GLSL_NOISE}
          void main(){
            // ridge silhouette: a noisy 1D profile
            float x = vUv.x * 3.0 + uSeed;
            float ridge = fbm(vec2(x, uSeed * 0.5)) * 0.55 + fbm(vec2(x * 2.0, uSeed)) * 0.25;
            float top = 0.35 + ridge * (uHeight / 30.0);
            float edge = top - vUv.y;
            float aa = uBlur > 0.5 ? 0.04 : 0.012;
            float mask = smoothstep(0.0, aa, edge);
            vec3 col = mix(uColor, uColorDay, uMix);
            // subtle vertical shading
            col *= 0.7 + 0.3 * vUv.y;
            gl_FragColor = vec4(col, mask * uVisible * (uBlur > 0.5 ? 0.7 : 1.0));
          }
        `}
      />
    </mesh>
  );
};

// =================== CITY SCENE ===================
const CityScene: React.FC<{ dayRef: React.MutableRefObject<number>; visibleRef: React.MutableRefObject<number> }> = ({ dayRef, visibleRef }) => {
  return (
    <group>
      <BuildingRow z={-32} count={28} maxH={14} color="#1a2138" colorDay="#7a90b8" dayRef={dayRef} visibleRef={visibleRef} />
      <BuildingRow z={-18} count={36} maxH={22} color="#080d1e" colorDay="#3a4a72" dayRef={dayRef} visibleRef={visibleRef} />
    </group>
  );
};

const BuildingRow: React.FC<{
  z: number; count: number; maxH: number; color: string; colorDay: string;
  dayRef: React.MutableRefObject<number>; visibleRef: React.MutableRefObject<number>;
}> = ({ z, count, maxH, color, colorDay, dayRef, visibleRef }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const buildings = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const w = 2 + Math.random() * 3;
        const h = 4 + Math.random() * maxH;
        const span = 140;
        const x = -span / 2 + (span / count) * i + (Math.random() - 0.5) * 1.5;
        return { x, w, h };
      }),
    [count, maxH]
  );

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    buildings.forEach((b, i) => {
      dummy.position.set(b.x, -8 + b.h / 2, 0);
      dummy.scale.set(b.w, b.h, b.w);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [buildings]);

  const uniforms = useMemo(
    () => ({
      uMix: { value: 0 },
      uVisible: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uColorDay: { value: new THREE.Color(colorDay) },
      uWindow: { value: new THREE.Color("#ffd27a") },
    }),
    [color, colorDay]
  );

  useFrame(() => {
    if (matRef.current) {
      (matRef.current.uniforms as any).uMix.value = dayRef.current;
      (matRef.current.uniforms as any).uVisible.value = visibleRef.current;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]} position={[0, 0, z]}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          void main(){
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float uMix, uVisible;
          uniform vec3 uColor, uColorDay, uWindow;
          void main(){
            vec3 base = mix(uColor, uColorDay, uMix);
            // windows: grid of squares
            vec2 g = fract(vUv * vec2(6.0, 12.0));
            float window = step(0.25, g.x) * step(g.x, 0.75) * step(0.25, g.y) * step(g.y, 0.75);
            // pseudo-random on/off
            float r = fract(sin(dot(floor(vUv * vec2(6.0, 12.0)), vec2(12.9898, 78.233))) * 43758.5453);
            float lit = step(0.45, r) * window;
            float nightWindows = lit * (1.0 - uMix);
            vec3 col = mix(base, uWindow, nightWindows * 0.8);
            // simple normal-based shade
            float shade = 0.55 + 0.45 * max(dot(vNormal, normalize(vec3(0.3, 0.8, 0.5))), 0.0);
            col *= shade;
            gl_FragColor = vec4(col, uVisible);
          }
        `}
      />
    </instancedMesh>
  );
};

// =================== OCEAN SCENE ===================
const OceanScene: React.FC<{ dayRef: React.MutableRefObject<number>; visibleRef: React.MutableRefObject<number> }> = ({ dayRef, visibleRef }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMix: { value: 0 },
      uVisible: { value: 0 },
      uNight: { value: new THREE.Color("#0a1430") },
      uDay: { value: new THREE.Color("#4a90c2") },
    }),
    []
  );
  useFrame(({ clock }) => {
    if (matRef.current) {
      const u: any = matRef.current.uniforms;
      u.uTime.value = clock.elapsedTime;
      u.uMix.value = dayRef.current;
      u.uVisible.value = visibleRef.current;
    }
  });
  return (
    <mesh rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -10, -25]}>
      <planeGeometry args={[200, 80, 80, 80]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          uniform float uTime;
          varying float vH;
          varying vec2 vUv;
          void main(){
            vUv = uv;
            vec3 p = position;
            float w = sin(p.x * 0.4 + uTime * 1.2) * 0.4
                    + sin(p.y * 0.3 + uTime * 0.8) * 0.3
                    + sin((p.x + p.y) * 0.6 + uTime * 1.6) * 0.2;
            p.z += w;
            vH = w;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `}
        fragmentShader={`
          varying float vH;
          varying vec2 vUv;
          uniform float uMix, uVisible;
          uniform vec3 uNight, uDay;
          void main(){
            vec3 base = mix(uNight, uDay, uMix);
            float shimmer = 0.5 + 0.5 * vH;
            vec3 col = base + vec3(0.08, 0.12, 0.18) * shimmer;
            float depth = smoothstep(0.0, 1.0, vUv.y);
            gl_FragColor = vec4(col, uVisible * (0.6 + 0.4 * depth));
          }
        `}
      />
    </mesh>
  );
};

// =================== WEATHER (rain/snow) ===================
const WeatherFX3D: React.FC<{ mode: Weather }> = ({ mode }) => {
  const count = mode === "rain" ? 500 : mode === "snow" ? 260 : 0;
  const ptsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(Math.max(count, 1) * 3);
    const seeds = new Float32Array(Math.max(count, 1));
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = Math.random() * 50 - 5;
      positions[i * 3 + 2] = -5 - Math.random() * 25;
      seeds[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMode: { value: mode === "snow" ? 1 : 0 } }),
    [mode]
  );

  useFrame(({ clock }) => {
    if (matRef.current) (matRef.current.uniforms as any).uTime.value = clock.elapsedTime;
  });

  if (count === 0) return null;
  return (
    <points ref={ptsRef} geometry={geom}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={`
          attribute float aSeed;
          uniform float uTime;
          uniform float uMode;
          varying float vSeed;
          void main(){
            vec3 p = position;
            float speed = uMode > 0.5 ? 2.5 : 18.0;
            float sway = uMode > 0.5 ? sin(uTime + aSeed * 6.28) * 2.0 : 0.0;
            float y = p.y - mod(uTime * speed + aSeed * 50.0, 60.0);
            p.y = y;
            p.x += sway;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uMode > 0.5 ? 3.0 + aSeed * 2.0 : 1.5;
            vSeed = aSeed;
          }
        `}
        fragmentShader={`
          uniform float uMode;
          varying float vSeed;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            float a = smoothstep(0.5, 0.0, d) * (uMode > 0.5 ? 0.9 : 0.5);
            vec3 col = uMode > 0.5 ? vec3(1.0) : vec3(0.7, 0.85, 1.0);
            gl_FragColor = vec4(col, a);
          }
        `}
      />
    </points>
  );
};

// =================== PARALLAX CAMERA ===================
const ParallaxCamera: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.tx = nx * 1.2;
      mouse.current.ty = -ny * 0.6;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useFrame(() => {
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    camera.position.x = mouse.current.x;
    camera.position.y = 2 + mouse.current.y + scrollY * 0.01;
    camera.lookAt(0, 0, -30);
  });
  return null;
};

// =================== SCENE GROUP w/ crossfade ===================
const SceneGroup: React.FC<{
  active: SceneId;
  dayRef: React.MutableRefObject<number>;
}> = ({ active, dayRef }) => {
  const mountainsVis = useRef(active === "mountains" ? 1 : 0);
  const cityVis = useRef(active === "city" ? 1 : 0);
  const oceanVis = useRef(active === "ocean" ? 1 : 0);

  useFrame((_, dt) => {
    const lerp = (cur: React.MutableRefObject<number>, target: number) => {
      cur.current += (target - cur.current) * Math.min(1, dt * 0.8);
    };
    lerp(mountainsVis, active === "mountains" ? 1 : 0);
    lerp(cityVis, active === "city" ? 1 : 0);
    lerp(oceanVis, active === "ocean" ? 1 : 0);
  });

  return (
    <>
      <MountainsScene dayRef={dayRef} visibleRef={mountainsVis} />
      <CityScene dayRef={dayRef} visibleRef={cityVis} />
      <OceanScene dayRef={dayRef} visibleRef={oceanVis} />
    </>
  );
};

// =================== DAY/NIGHT LERPER ===================
const DayNightLerper: React.FC<{ isDay: boolean; dayRef: React.MutableRefObject<number> }> = ({ isDay, dayRef }) => {
  useFrame((_, dt) => {
    const target = isDay ? 1 : 0;
    dayRef.current += (target - dayRef.current) * Math.min(1, dt * 0.5);
  });
  return null;
};

// =================== TOP-LEVEL ===================
const ParallaxHero3D: React.FC = () => {
  const [isDay, setIsDay] = useState(false);
  const [sceneId, setSceneId] = useState<SceneId>("mountains");
  const [weather, setWeather] = useState<Weather>("clear");
  const [density] = useState(() => 0.3 + Math.random() * 0.5);
  const [reduced, setReduced] = useState(false);
  const dayRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  // 12s day/night
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setIsDay((d) => !d), 12000);
    return () => clearTimeout(t);
  }, [isDay, reduced]);

  // 18s scene rotation
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      setSceneId((p) => {
        const i = SCENES.indexOf(p);
        return SCENES[(i + 1) % SCENES.length];
      });
    }, 18000);
    return () => clearTimeout(t);
  }, [sceneId, reduced]);

  // weather cycle: clear ↔ rain/snow
  useEffect(() => {
    if (reduced) return;
    let active = true;
    const cycle = () => {
      if (!active) return;
      const idle = 8000 + Math.random() * 6000;
      setTimeout(() => {
        if (!active) return;
        setWeather(Math.random() > 0.5 ? "rain" : "snow");
        const dur = 12000 + Math.random() * 6000;
        setTimeout(() => {
          if (!active) return;
          setWeather("clear");
          cycle();
        }, dur);
      }, idle);
    };
    cycle();
    return () => { active = false; };
  }, [reduced]);

  // sync isDay → body for footer/text consumers
  useEffect(() => {
    document.body.dataset.daytime = isDay ? "day" : "night";
  }, [isDay]);

  const textMode = isDay ? "dark" : "light";

  return (
    <section
      className={`parallax-hero relative ${isDay ? "is-day" : ""}`}
      data-text-mode={textMode}
      aria-label="Hiram Barsky portfolio hero"
    >
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Canvas
          dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 2]}
          camera={{ position: [0, 2, 30], fov: 55, near: 0.1, far: 300 }}
          gl={{ antialias: true, alpha: false }}
        >
          <DayNightLerper isDay={isDay} dayRef={dayRef} />
          <ParallaxCamera reduced={reduced} />
          <SkyDome dayRef={dayRef} />
          <Stars dayRef={dayRef} />
          <Celestial type="sun" dayRef={dayRef} />
          <Celestial type="moon" dayRef={dayRef} />
          <Clouds dayRef={dayRef} density={density} />
          <SceneGroup active={sceneId} dayRef={dayRef} />
          <WeatherFX3D mode={weather} />
        </Canvas>
      </div>
      <div className="parallax-content relative" style={{ zIndex: 2 }}>
        <HeroContent />
      </div>
    </section>
  );
};

export default ParallaxHero3D;
