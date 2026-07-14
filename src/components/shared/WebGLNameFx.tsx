import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL FX layer rendered behind/around the name text.
 * The HTML text stays on top for crisp typography + a11y.
 * `effect` cycles 0..5 to produce visually distinct passes.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress; // 0..1 over the active window
  uniform int uEffect;     // 0..5
  uniform vec3  uColorA;
  uniform vec3  uColorB;

  // hash / noise
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

  // envelope: ease in/out across uProgress
  float env(){ return smoothstep(0.0, 0.2, uProgress) * (1.0 - smoothstep(0.8, 1.0, uProgress)); }

  vec3 aurora(vec2 uv){
    float t = uTime * 0.4;
    float n = noise(uv * vec2(3.0, 6.0) + vec2(t, -t*0.5));
    float band = smoothstep(0.35, 0.5, n) - smoothstep(0.55, 0.7, n);
    vec3 col = mix(uColorA, uColorB, uv.x + 0.3*sin(t + uv.y*4.0));
    return col * band * 1.6;
  }

  vec3 particles(vec2 uv){
    vec3 col = vec3(0.0);
    for (int i = 0; i < 18; i++){
      float fi = float(i);
      vec2 seed = vec2(hash(vec2(fi, 1.0)), hash(vec2(fi, 2.0)));
      vec2 p = vec2(seed.x, fract(seed.y + uTime * (0.15 + seed.x*0.4)));
      float d = distance(uv, p);
      float r = 0.012 + 0.02 * hash(vec2(fi, 3.0));
      float g = smoothstep(r, 0.0, d);
      col += mix(uColorA, uColorB, seed.x) * g;
    }
    return col;
  }

  vec3 shimmer(vec2 uv){
    float t = uTime * 1.2;
    float band = smoothstep(0.0, 0.05, abs(fract(uv.x - t*0.5) - 0.5) - 0.45);
    vec3 col = mix(uColorA, uColorB, uv.x);
    return col * (1.0 - band) * 1.4;
  }

  vec3 ripple(vec2 uv){
    vec2 c = uv - 0.5;
    float d = length(c);
    float w = sin(d * 30.0 - uTime * 6.0) * 0.5 + 0.5;
    float mask = smoothstep(0.5, 0.0, d);
    return mix(uColorA, uColorB, w) * w * mask * 1.4;
  }

  vec3 glow(vec2 uv){
    float d = length(uv - 0.5);
    float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
    float g = smoothstep(0.55, 0.0, d) * (0.6 + 0.4 * pulse);
    return mix(uColorA, uColorB, pulse) * g * 1.6;
  }

  vec3 prism(vec2 uv){
    float t = uTime * 0.6;
    vec3 col = vec3(0.0);
    col.r = noise(uv * 5.0 + vec2(t, 0.0));
    col.g = noise(uv * 5.0 + vec2(0.0, t));
    col.b = noise(uv * 5.0 + vec2(-t, t));
    return col * mix(uColorA, uColorB, 0.5) * 1.2;
  }

  void main(){
    vec3 col = vec3(0.0);
    if (uEffect == 0) col = aurora(vUv);
    else if (uEffect == 1) col = particles(vUv);
    else if (uEffect == 2) col = shimmer(vUv);
    else if (uEffect == 3) col = ripple(vUv);
    else if (uEffect == 4) col = glow(vUv);
    else col = prism(vUv);

    float a = clamp(max(max(col.r, col.g), col.b), 0.0, 1.0) * env();
    gl_FragColor = vec4(col, a);
  }
`;

const FxPlane: React.FC<{ effect: number }> = ({ effect }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const startRef = useRef<number>(performance.now());

  // Reset progress each time effect changes
  React.useEffect(() => {
    startRef.current = performance.now();
  }, [effect]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uEffect: { value: effect },
      uColorA: { value: new THREE.Color("#3b82f6") },
      uColorB: { value: new THREE.Color("#22d3ee") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u: any = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uEffect.value = effect;
    const elapsed = (performance.now() - startRef.current) / 1000;
    u.uProgress.value = Math.min(elapsed / 2.5, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

interface Props {
  effect: number;
  active: boolean;
}

const WebGLNameFx: React.FC<Props> = ({ effect, active }) => {
  if (!active) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -mx-3 -my-1"
      style={{ mixBlendMode: "screen" }}
    >
      <Canvas
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: "transparent" }}
      >
        <FxPlane effect={effect} />
      </Canvas>
    </div>
  );
};

export default WebGLNameFx;
