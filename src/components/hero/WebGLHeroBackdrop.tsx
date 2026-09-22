import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Ambient WebGL backdrop for hero sections.
 * Subtle aurora drift, always-on, low intensity. Sits behind hero content.
 * Lazy-loaded by consumers; respects prefers-reduced-motion (parent gates).
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;

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

  void main(){
    float t = uTime * 0.05;
    vec2 uv = vUv;
    float n1 = fbm(uv * 2.2 + vec2(t, -t*0.6));
    float n2 = fbm(uv * 3.4 + vec2(-t*0.4, t*0.8));
    vec3 col = mix(uColorA, uColorB, smoothstep(0.2, 0.8, n1));
    col = mix(col, uColorC, smoothstep(0.3, 0.9, n2) * 0.6);
    float vignette = smoothstep(1.1, 0.3, length(uv - 0.5));
    float alpha = 0.28 * vignette;
    gl_FragColor = vec4(col, alpha);
  }
`;

const BackdropPlane: React.FC = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#3b82f6") },
      uColorB: { value: new THREE.Color("#22d3ee") },
      uColorC: { value: new THREE.Color("#8b5cf6") },
    }),
    []
  );
  useFrame(({ clock }) => {
    if (matRef.current) (matRef.current.uniforms as any).uTime.value = clock.elapsedTime;
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

const WebGLHeroBackdrop: React.FC = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  if (reduced) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ mixBlendMode: "screen", zIndex: 0 }}
    >
      <Canvas
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: "transparent" }}
      >
        <BackdropPlane />
      </Canvas>
    </div>
  );
};

export default WebGLHeroBackdrop;
