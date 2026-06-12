import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Decorative WebGL ripple that plays on hover / pointer-down over its parent.
 * Sits absolutely inside a `relative` wrapper, pointer-events:none, aria-hidden.
 * Navigation is NOT delayed — this is intent feedback only.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;   // 0..1 hover envelope
  uniform float uClick;   // 0..1 click pulse (decays fast)
  uniform vec2  uOrigin;  // last pointer position in uv
  uniform vec3  uColor;

  void main(){
    vec2 p = vUv - uOrigin;
    float d = length(p);

    // Expanding ring on click
    float ringT = (1.0 - uClick);
    float ring = smoothstep(0.02, 0.0, abs(d - ringT * 0.9));
    ring *= uClick;

    // Soft hover halo following the cursor
    float halo = exp(-d * 6.0) * uHover * 0.55;

    // Subtle shimmer band
    float shimmer = sin((d * 18.0) - uTime * 3.5) * 0.5 + 0.5;
    shimmer *= exp(-d * 4.0) * uHover * 0.25;

    float a = clamp(ring + halo + shimmer, 0.0, 1.0);
    gl_FragColor = vec4(uColor, a);
  }
`;

interface Props {
  hover: number;
  click: number;
  origin: { x: number; y: number };
  color?: string;
}

const Plane: React.FC<Props> = ({ hover, click, origin, color = "#22d3ee" }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uClick: { value: 0 },
      uOrigin: { value: new THREE.Vector2(0.5, 0.5) },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  );

  useFrame((_, delta) => {
    const u: any = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    // damp toward targets
    u.uHover.value += (hover - u.uHover.value) * Math.min(1, delta * 8);
    u.uClick.value += (click - u.uClick.value) * Math.min(1, delta * 6);
    u.uOrigin.value.x += (origin.x - u.uOrigin.value.x) * Math.min(1, delta * 12);
    u.uOrigin.value.y += (origin.y - u.uOrigin.value.y) * Math.min(1, delta * 12);
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

const WebGLIntentRipple: React.FC<Props> = (props) => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      style={{ mixBlendMode: "screen", zIndex: 1 }}
    >
      <Canvas
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: "transparent" }}
      >
        <Plane {...props} />
      </Canvas>
    </div>
  );
};

export default WebGLIntentRipple;
